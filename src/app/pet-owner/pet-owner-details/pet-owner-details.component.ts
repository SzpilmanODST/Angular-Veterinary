import { Component, OnInit, inject } from '@angular/core';
import { PetOwnerService } from '../../services/pet-owner.service';
import { PetOwner } from '../../model/petOwner.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-owner-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pet-owner-details.component.html',
  styleUrl: './pet-owner-details.component.css'
})
export default class PetOwnerDetailsComponent implements OnInit {

  private petOwnerService = inject(PetOwnerService);
  private route = inject(ActivatedRoute);
  
  detailsPetOwner: string;

  petOwner?: PetOwner;


  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');


    if(id) {
      this.petOwnerService.findById(parseInt(id))
        .subscribe(petOwner => {
          this.petOwner = petOwner;
        })
    }


    const detailsPetOwnerURL = this.route.snapshot.url[1].path;

    this.detailsPetOwner = detailsPetOwnerURL;

  }

}
