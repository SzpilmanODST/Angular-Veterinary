import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Doctor } from '../model/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Doctor[]>('http://localhost:8080/api/doctor/findAll');
  }

  findById(id: number) {
    return this.http.get<Doctor>(`http://localhost:8080/api/doctor/find/${id}`)
  }

  saveDoctor(doctor: Doctor) {
    return this.http.post<Doctor>('http://localhost:8080/api/doctor/save', doctor)
  }

  updateDoctor(id: number, doctor: Doctor) {
    return this.http.put<Doctor>(`http://localhost:8080/api/doctor/update/${id}`, doctor)
  }

  deleteById(id: number) {
    return this.http.delete(`http://localhost:8080/api/doctor/delete/${id}`)
  }
  
}
