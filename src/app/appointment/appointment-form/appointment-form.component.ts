import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { PetOwnerService } from '../../services/pet-owner.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { PetOwner } from '../../model/petOwner.interface';
import { Appointment } from '../../model/appointment.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgSelectModule, FormsModule],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export default class AppointmentFormComponent implements OnInit {

  private petOwnerService = inject(PetOwnerService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private appointmentService = inject(AppointmentService);

  // Servirá para el endpoint findAll()
  petOwners: PetOwner[] = [];

  // Los datos del formulario para el POST y PUT
  form?: FormGroup;

  // Se inicializa en el findById() de abajo y está en el If del h2
  appointment?: Appointment;

  // Aqui se guardarán los errores del backend
  errors: string[] = [];

  ngOnInit(): void {

    // Se usa el endpoint findAll()
    this.petOwnerService.findAll()
      .subscribe((petOwner: any) => {
        this.petOwners = petOwner;
      })
    
    // Esto es para el update, obtener los datos del Appointment
    const id = this.route.snapshot.paramMap.get('id');

    // Con el id de arriba vemos si el form se inicializará como PUT o como POST
    if(id) {
      this.appointmentService.findById(parseInt(id))
        .subscribe(appointment => {
          this.appointment = appointment;
          
          this.form = this.fb.group({
            dayAndHour: [appointment.dayAndHour, []],
            petOwner: [appointment.petOwner.id, []]
          })
        })
    } else {

      this.form = this.fb.group({
        dayAndHour: ['', []],
        petOwner: ['', []],
        prescription: null
      })
    }
  }

  

  // Lo que ocurre al hacer el POST
  save() {

    // Aqui se ve si se cumple o no la validacion
    if(this.form?.invalid) {
      return;
    }

    const appointmentForm = this.form!.value;     // El ! es para decirle que si vendrá con informacion
    let request: Observable<Appointment>;

    // Del valor de petOwner lo convertimos en un Objeto de petOwner id
    const transformedAppointment: Appointment = {
      ...appointmentForm,
      petOwner: { id: appointmentForm.petOwner }
    };

    if(this.appointment) {

      // Se usa el endpoint update
      request = this.appointmentService.updateAppointment(this.appointment.id, transformedAppointment);

    } else {
      
      // Se usa el endpoint save
      request = this.appointmentService.saveAppointment(transformedAppointment);
    }


    request
      .subscribe({
        next: () => {
          this.errors = [];
          this.router.navigate(['/']);
        },
        error: response => {
          this.errors = response.error;
        }
      })
  }
}
