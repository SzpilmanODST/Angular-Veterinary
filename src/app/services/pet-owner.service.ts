import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { PetOwner } from '../model/petOwner.interface';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<PetOwner[]>('http://localhost:8080/api/petOwner/findAll')
  }

  findById(id: number) {
    return this.http.get<PetOwner>(`http://localhost:8080/api/petOwner/find/${id}`)
  }

  savePetOwner(petOwner: PetOwner) {
    return this.http.post<PetOwner>(`http://localhost:8080/api/petOwner/save`, petOwner)
  }

  updatePetOwner(id: number, petOwner: PetOwner) {
    return this.http.put<PetOwner>(`http://localhost:8080/api/petOwner/update/${id}`, petOwner)
  }

  deleteById(id: number) {
    return this.http.delete(`http://localhost:8080/api/petOwner/delete/${id}`)
  }
}
