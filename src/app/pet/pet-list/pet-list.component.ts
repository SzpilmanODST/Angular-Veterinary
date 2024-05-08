import { Component, inject } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../model/pet.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export default class PetListComponent {

  private petService = inject(PetService);

  pets: Pet[];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.petService.findAll()
      .subscribe(pets => {
        this.pets = pets;
      });
  }

  deletePet(pet: Pet) {
    this.petService.deleteById(pet.id)
      .subscribe(() => {
        this.loadAll();
      });
  };
}
