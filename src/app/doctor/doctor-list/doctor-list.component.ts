import { Component, inject } from '@angular/core';
import { Doctor } from '../../model/doctor.interface';
import { DoctorService } from '../../services/doctor.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export default class DoctorListComponent {

  private doctorService = inject(DoctorService);

  doctors: Doctor[];

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll() {
    this.doctorService.findAll()
      .subscribe(doctors => {
        this.doctors = doctors;
      })
  }

  deleteDoctor(doctor: Doctor) {
    this.doctorService.deleteById(doctor.id)
      .subscribe(() => {
        this.loadAll();
      });
  }

}
