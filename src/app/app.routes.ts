import { Routes } from '@angular/router';
import { HomeComponent } from './components/menu/home/home.component';
import { BooksComponent } from './components/menu/books/books.component';
import { CustomersComponent } from './components/menu/customers/customers.component';
import { ReservationsComponent } from './components/menu/reservations/reservations.component';
import { CustomerPlatformComponent } from './components/menu/customers/customer-platform/customer-platform.component';
import { BookPlatformComponent } from './components/menu/books/book-platform/book-platform.component';


export const routes: Routes = [
    {
        path:'', component:HomeComponent
    },
    {
        path:'books', component:BooksComponent
    },
    {
        path:'books/add', component:BookPlatformComponent
    },
    {
        path:'books/edit/:id', component:BookPlatformComponent
    },
    {
        path:'books/delete/:id', component:BooksComponent
    },
    {
        path:'customers', component:CustomersComponent
    },
    {
        path:'customers/add', component:CustomerPlatformComponent
    },
    {
        path:'customers/edit/:id', component:CustomerPlatformComponent
    },
    {
        path:'customers/view/:id', component:CustomerPlatformComponent
    },
    {
        path:'reservations', component:ReservationsComponent
    },
    { 
        path: '', redirectTo: '/', pathMatch: 'full'
     } // Default route

];
