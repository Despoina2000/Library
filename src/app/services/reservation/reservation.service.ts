import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../../interfaces/api/reservations-api';
import { ReservationData } from '../../interfaces/api/reservation-data-api';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }
  endpoint: string='https://book-api-bx2r.onrender.com/reservations';


  getAllReservations(): Observable<Array<Reservation>>{
    return this.http.get<Array<Reservation>>(this.endpoint);
  }

  addReservation(reservationData: ReservationData):  Observable<ReservationData>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ReservationData>(this.endpoint, reservationData, { headers });
  }

  completeReservation(reservationId:string):Observable<void>|null{

      return this.http.post<any>(`${this.endpoint}/${reservationId}/complete`,null);
  }
}
