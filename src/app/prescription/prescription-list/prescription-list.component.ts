import { Component, inject } from '@angular/core';
import { Prescription } from '../../model/prescription.interface';
import { PrescriptionService } from '../../services/prescription.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prescription-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './prescription-list.component.html',
  styleUrl: './prescription-list.component.css'
})
export default class PrescriptionListComponent {

  private prescriptionService = inject(PrescriptionService);

  prescriptions: Prescription[];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.prescriptionService.findAll()
      .subscribe(prescriptions => {
        this.prescriptions = prescriptions;
      })
  }
}
