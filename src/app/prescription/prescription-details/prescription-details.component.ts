import { Component, inject } from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { Prescription } from '../../model/prescription.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PetOwner } from '../../model/petOwner.interface';

@Component({
  selector: 'app-prescription-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './prescription-details.component.html',
  styleUrl: './prescription-details.component.css'
})
export default class PrescriptionDetailsComponent {

  private prescriptionService = inject(PrescriptionService);
  private route = inject(ActivatedRoute);

  prescription?: Prescription;

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.prescriptionService.findById(parseInt(id))
      .subscribe(prescription => {
        this.prescription = prescription
      })

    }
    
  }
}
