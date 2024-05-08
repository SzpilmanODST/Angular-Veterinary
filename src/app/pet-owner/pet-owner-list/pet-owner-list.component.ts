import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PetOwnerService } from '../../services/pet-owner.service';
import { PetOwner } from '../../model/petOwner.interface';


@Component({
  selector: 'app-pet-owner-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pet-owner-list.component.html',
  styleUrl: './pet-owner-list.component.css'
})
export default class PetOwnerListComponent {

  private petOwnerService = inject(PetOwnerService);

  petOwners: PetOwner[];
  
  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.petOwnerService.findAll()
      .subscribe(petOwners => {
        this.petOwners = petOwners;
      })   
  }

  

  deletePetOwner(petOwner: PetOwner) {
    this.petOwnerService.deleteById(petOwner.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
