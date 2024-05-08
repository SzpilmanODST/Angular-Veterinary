import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prescription } from '../model/prescription.interface';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Prescription[]>('http://localhost:8080/api/prescription/findAll')
  }

  findById(id: number) {
    return this.http.get<Prescription>(`http://localhost:8080/api/prescription/find/${id}`)
  }

  updatePrescription(id:number, prescription: Prescription) {
    return this.http.put<Prescription>(`http://localhost:8080/api/prescription/update/${id}`, prescription)
  }
}
