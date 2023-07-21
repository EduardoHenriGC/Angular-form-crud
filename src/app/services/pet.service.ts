import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/animal';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private _http: HttpClient) {}
  getPetList(): Observable<any> {
    return this._http.get('http://localhost:22248/api/Pets');
  }

  addPet(data: any): Observable<any> {
    return this._http.post('http://localhost:22248/api/Pets', data);
  }

  updatePet(petId: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:22248/api/Pets/${petId}`, data);
  }

  deletePet(petId: number): Observable<any> {
    return this._http.delete(`http://localhost:22248/api/Pets/${petId}`);
  }
}
