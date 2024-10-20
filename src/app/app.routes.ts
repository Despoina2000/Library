import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

export const routes: Routes = [
    {
        path:'', component:HomeComponent
    },
    {
        path:'books', component:BooksComponent
    },
    {
        path:'customers', component:CustomersComponent
    },
    {
        path:'reservations', component:ReservationsComponent
    },

];
