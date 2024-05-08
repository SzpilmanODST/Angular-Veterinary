import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Appointment } from '../model/appointment.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Appointment[]>('http://localhost:8080/api/appointment/findAll')
  }

  findById(id: number) {
    return this.http.get<Appointment>(`http://localhost:8080/api/appointment/find/${id}`)
  }

  saveAppointment(appointment: Appointment) {
    return this.http.post<Appointment>(`http://localhost:8080/api/appointment/save`, appointment)
  }

  updateAppointment(id: number, appointment: Appointment) {
    return this.http.put<Appointment>(`http://localhost:8080/api/appointment/update/${id}`, appointment)
  }

  deleteById(id: number) {
    return this.http.delete(`http://localhost:8080/api/appointment/delete/${id}`)
  }

}
