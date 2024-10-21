import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../interfaces/reservations-api';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  endpoint: string='https://book-api-bx2r.onrender.com/reservations';
  

  getAllCustomers(): Observable<Array<Reservation>>{
    return this.http.get<Array<Reservation>>(this.endpoint);
  }
}
