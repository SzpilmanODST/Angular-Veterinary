import { Component, inject } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../model/doctor.interface';
import { Prescription } from '../../model/prescription.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { Pet } from '../../model/pet.interface';
import { PetOwner } from '../../model/petOwner.interface';
import { PetOwnerService } from '../../services/pet-owner.service';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgSelectModule, FormsModule],
  templateUrl: './prescription-form.component.html',
  styleUrl: './prescription-form.component.css'
})
export default class PrescriptionFormComponent {

  private prescriptionService = inject(PrescriptionService);
  private doctorService = inject(DoctorService);
  private petOwnerService = inject(PetOwnerService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  doctors: Doctor[];

  petOwner: PetOwner;

  prescription?: Prescription;

  form?: FormGroup;

  ngOnInit(): void {

    this.doctorService.findAll()
      .subscribe(doctors => {
        this.doctors = doctors;
    })

    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.prescriptionService.findById(parseInt(id))
        .subscribe(prescription => {
          this.prescription = prescription;

          this.form = this.fb.group({
            ailment: ['', [Validators.required]],
            pet: ['', [Validators.required]],
            doctor: ['', [Validators.required]]
          })
        })
    }
  }

  findPetsByPetOwner() {
    this.petOwnerService.findById(this.prescription!.petOwner.id)
      .subscribe(petOwner => {
        this.petOwner = petOwner;
        console.log(this.petOwner)
      })
  }
  

  save() {
    if(this.form?.invalid) {
      return;
    }

    const prescriptionForm = this.form!.value;

    const transformedPrescription: Prescription = {
      ...prescriptionForm,
      pet: { id: prescriptionForm.pet },
      doctor: { id: prescriptionForm.doctor }
    }

    console.log(transformedPrescription);

    if(this.prescription) {
      
      this.prescriptionService.updatePrescription(this.prescription.id, transformedPrescription)
        .subscribe(() => {
          this.router.navigate(['/prescriptionList'])
        })
    }
  }

}
