import { Component, inject } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../model/pet.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export default class PetDetailsComponent {

  private petService = inject(PetService);
  private route = inject(ActivatedRoute);

  pet?: Pet;

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.petService.findById(parseInt(id))
        .subscribe(pet => {
          this.pet = pet;
        })
    }

  }
}
