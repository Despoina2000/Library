import { Component, Input, signal, SimpleChanges } from '@angular/core';
import {  DatePipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Book } from '../../../interfaces/books-api';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DatePipe,MatButtonToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './list-of-books.component.html',
  styleUrl: './list-of-books.component.css'
})
export class ListOfBooksComponent {
  hideMultipleSelectionIndicator = signal(false);
  @Input() categories: Array<string>=[];
  @Input() books: Array<Book>=[];
  @Input() isRentable: boolean= false;
  categoryControl = new FormControl('all');
  filteredBooks: Book[] = [];

  ngOnInit(): void {
    // Listen for changes in categoryControl to apply filter dynamically
    this.categoryControl.valueChanges.subscribe((selectedCategory) => {
      this.filterBooks(selectedCategory || 'all');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['books'] && this.books) {
      // Apply filter initially when books input is received
      this.filterBooks(this.categoryControl.value || 'all');
    }
  }

  filterBooks(category: string): void {
    this.filteredBooks = category === 'all' ? this.books : this.books.filter(book => book.type === category);
  }


  toggleMultipleSelectionIndicator() {
    this.hideMultipleSelectionIndicator.update(value => !value);
  }

}
