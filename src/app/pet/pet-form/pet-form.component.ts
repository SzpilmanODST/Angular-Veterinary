import { Component, inject } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { PetOwnerService } from '../../services/pet-owner.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PetOwner } from '../../model/petOwner.interface';
import { Pet } from '../../model/pet.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgSelectModule, FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export default class PetFormComponent {
  
  private petService = inject(PetService);
  private petOwnerService = inject(PetOwnerService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  petOwners: PetOwner[];

  form?: FormGroup;

  pet?: Pet;

  errors: string[] = [];

  ngOnInit(): void {

    this.petOwnerService.findAll()
      .subscribe(petOwners => {
        this.petOwners = petOwners;
      });

    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.petService.findById(parseInt(id))
        .subscribe(pet => {
          this.pet = pet;

          this.form = this.fb.group({
            name: [pet.name, []],
            gender: [pet.gender, []],
            species: [pet.species, []],
            breed: [pet.breed, []],
            age: [pet.age, []],
            weight: [pet.weight, []],
            petOwner: [pet.petOwner.id, []]
          })
        })

    } else {

      this.form = this.fb.group({
        name: ['', []],
        gender: ['', []],
        species: ['', []],
        breed: ['', []],
        age: ['', []],
        weight: ['', []],
        petOwner: ['', []]
      })
    }
  }

  save() {

    if(this.form?.invalid) {
      return;
    }

    const petForm = this.form?.value;
    let request: Observable<Pet>;

    const transformedPet: Pet = {
      ...petForm,
      petOwner: { id: petForm.petOwner} 
    };

    if(this.pet) {
      request = this.petService.updatePet(this.pet.id, transformedPet);
        
    } else {
      request = this.petService.savePet(transformedPet);
        
    }

    request
      .subscribe({
        next: () => {
          this.router.navigate(['petList'])
        },
        error: response => {
          this.errors = response.error;
        }
      })
  }
}
