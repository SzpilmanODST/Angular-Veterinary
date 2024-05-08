import { Component, inject } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Doctor } from '../../model/doctor.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
export default class DoctorFormComponent {

  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form?: FormGroup;

  doctor?: Doctor;

  errors: string[] = [];

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.doctorService.findById(parseInt(id))
        .subscribe(doctor => {
          this.doctor = doctor;

          this.form = this.fb.group({
            name: [doctor.name, []],
            lastName: [doctor.lastName, []],
            cellphone: [doctor.cellphone, []],
            professionalId: [doctor.professionalId, []]
          })
        })

    } else {

      this.form = this.fb.group({
        name: ['', []],
        lastName: ['', []],
        cellphone: ['', []],
        professionalId: ['', []]
      })
    }
  }

  save() {

    if(this.form?.invalid) {
      return;
    }

    const doctorForm = this.form!.value;
    let request: Observable<Doctor>;

    if(this.doctor) {
      request = this.doctorService.updateDoctor(this.doctor.id, doctorForm);

    } else {
      request = this.doctorService.saveDoctor(doctorForm);
      
    }

    request
      .subscribe({
        next: () => {
          this.errors = [];
          this.router.navigate(['/doctorList']);
        },
        error: response => {
          this.errors = response.error;
        }
      })
  }
}
