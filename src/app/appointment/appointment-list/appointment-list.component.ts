import { Component, OnInit, inject } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Appointment } from '../../model/appointment.interface';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export default class AppointmentListComponent implements OnInit {

  private appointmentService = inject(AppointmentService);

  // Se llena con el findAll() que está dentro del loadAll()
  appointments: Appointment[];

  // Se inicializa el loadAll()
  ngOnInit(): void {
    this.loadAll();
  }

  // Es el endpoint findAll()
  loadAll() {
    this.appointmentService.findAll()
      .subscribe(appointments => {
        this.appointments = appointments;
      })
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteById(appointment.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
