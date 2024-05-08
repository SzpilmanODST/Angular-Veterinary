import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetOwnerService } from '../../services/pet-owner.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetOwner } from '../../model/petOwner.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-owner-form',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pet-owner-form.component.html',
  styleUrl: './pet-owner-form.component.css'
})
export default class PetOwnerFormComponent implements OnInit{

  private petOwnerService = inject(PetOwnerService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form?: FormGroup;

  petOwner?: PetOwner;

  errors: string[] = [];

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.petOwnerService.findById(parseInt(id))
        .subscribe(petOwner => {
          this.petOwner = petOwner;

          this.form = this.fb.group({
            name: [petOwner.name, [Validators.required]],
            lastName: [petOwner.lastName, [Validators.required]],
            cellphone: [petOwner.cellphone, [Validators.required]],
            email: [petOwner.email, [Validators.required]]
          });
        });

    } else {

      this.form = this.fb.group({
        name: ['', []],
        lastName: ['', []],
        cellphone: ['', []],
        email: ['', []]
      });
    }
  }

  save() {

    if(this.form?.invalid) {
      return;
    }

    const petOwnerForm = this.form!.value;
    let request: Observable<PetOwner>;

    if(this.petOwner) {
      request = this.petOwnerService.updatePetOwner(this.petOwner.id, petOwnerForm);

    } else {
      request = this.petOwnerService.savePetOwner(petOwnerForm);
      
    }

    request
      .subscribe({
      next: () => {
        this.errors = [];
        this.router.navigate(['/petOwnerList'])
      },
      error: response => {
        this.errors = response.error;
      }
    })
  }
}
