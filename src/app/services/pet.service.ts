import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Pet } from '../model/pet.interface';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private http = inject(HttpClient);

  findAll() {
    return this.http.get<Pet[]>('http://localhost:8080/api/pet/findAll')
  }

  findById(id: number) {
    return this.http.get<Pet>(`http://localhost:8080/api/pet/find/${id}`)
  }

  savePet(pet: Pet) {
    return this.http.post<Pet>('http://localhost:8080/api/pet/save', pet)
  }

  updatePet(id: number, pet: Pet) {
    return this.http.put<Pet>(`http://localhost:8080/api/pet/update/${id}`, pet)
  }

  deleteById(id: number) {
    return this.http.delete(`http://localhost:8080/api/pet/delete/${id}`)
  }
}
