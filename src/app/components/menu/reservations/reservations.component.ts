import { Component } from '@angular/core';
import { Reservation } from '../../../interfaces/reservations-api';
import { ReservationService } from '../../../services/reservation/reservation.service';
import {MatTableModule} from '@angular/material/table';
import {  DatePipe} from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  displayedColumns: string[] = [ 'book_name', 'customer_name', 'status','phone', 'reseved_on', 'return_by'];
  reservations: Array<Reservation>=[];

  constructor(private reservationService: ReservationService){
    try{
      this.reservationService.getAllReservations().subscribe((data)=>{
        this.reservations=data;
     });
    }
    catch( HttpErrorResponse){
      this.reservations=[];
    }
    
  }


}
