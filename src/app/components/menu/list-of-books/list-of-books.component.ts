import { Component, Input, signal } from '@angular/core';
import {  DatePipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Book } from '../../../interfaces/books-api';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DatePipe,MatButtonToggleModule],
  templateUrl: './list-of-books.component.html',
  styleUrl: './list-of-books.component.css'
})
export class ListOfBooksComponent {
  hideMultipleSelectionIndicator = signal(false);
  @Input() categories: Array<string>=[];
  @Input() books: Array<Book>|null=[];
  @Input() isRentable: boolean= false;

//  constructor(){
//     this.categories=[...new Set(this.books?.map(item => item.type))];
//   }

  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update(value => !value);
  }

}
