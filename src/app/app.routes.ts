import { Routes } from '@angular/router';
import { HomeComponent } from './components/menu/home/home.component';
import { BooksComponent } from './components/menu/books/books.component';
import { CustomersComponent } from './components/menu/customers/customers.component';
import { ReservationsComponent } from './components/menu/reservations/reservations.component';


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
