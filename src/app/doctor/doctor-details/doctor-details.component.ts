import { Component, inject } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../model/doctor.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export default class DoctorDetailsComponent {

  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute)

  doctor?: Doctor;

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      this.doctorService.findById(parseInt(id))
        .subscribe(doctor => {
          this.doctor = doctor
        })
    }
  }
}
