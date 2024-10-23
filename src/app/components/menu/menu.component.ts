import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, MatTabsModule,
    MatToolbarModule, NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  links=[
    { path: '/', label: 'Home' },
    { path: '/books', label: 'Books' },
    { path: '/customers', label: 'Customers' },
    { path: '/reservations', label: 'Reservations' }
  ];
}
