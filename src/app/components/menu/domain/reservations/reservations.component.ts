import { Component } from '@angular/core';
import { Reservation } from '../../../../interfaces/reservations-api';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {  DatePipe} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatIconModule, MatButtonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  displayedColumns: string[] = [ 'book_name', 'customer_name', 'status','phone', 'reseved_on', 'return_by'];
  reservations: Array<Reservation>=[];

  constructor(private reservationService: ReservationService,private router: Router){
    try{
      this.reservationService.getAllReservations().subscribe((data)=>{
        this.reservations=data;
     });
    }
    catch( HttpErrorResponse){
      this.reservations=[];
    }

  }

  addReservation(){
    this.router.navigate(['reservations/add']);
  }

  completeReservaiton(id:string){
    if (id) {
      this.reservationService.completeReservation(id)?.subscribe(
        () => {
          console.log('Reservation completed successfully');
          this.router.navigate(['/reservations']);
        },
        (error: any) => {
          console.error('Error completing reservation', error);
        }
      );
    }
  }


}
