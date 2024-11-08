import { Component } from '@angular/core';
import { Reservation } from '../../../../interfaces/api/reservations-api';
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
  styleUrls: ['./reservations.component.css','../../../../css/button.css','../../../../css/alert.css','../../../../css/table.css']
})
export class ReservationsComponent {
  displayedColumns: string[] = [ 'book_name', 'customer_name', 'status','phone', 'reseved_on', 'return_by','complete'];
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
          window.location.reload();
        },
        (error: any) => {
          console.error('Error completing reservation', error);
        }
      );
    }
  }


}
