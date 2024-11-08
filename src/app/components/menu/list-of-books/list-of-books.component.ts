import { Component, Input, signal, SimpleChanges } from '@angular/core';
import {  DatePipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Book } from '../../../interfaces/api/books-api';
import { FormControl,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeletePopUpComponent } from '../../pop-up components/delete-pop-up/delete-pop-up.component';
import { BookService } from '../../../services/book/book.service';

@Component({
  selector: 'app-list-of-books',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,DatePipe,MatButtonToggleModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './list-of-books.component.html',
  styleUrls: ['./list-of-books.component.css','../../../css/button.css','../../../css/alert.css']
})
export class ListOfBooksComponent {
  hideMultipleSelectionIndicator = signal(false);
  @Input() categories: Array<string>=[];
  @Input() books: Array<Book>=[];
  @Input() isRentable: boolean= false;
  categoryControl = new FormControl('all');
  filteredBooks: Book[] = [];
constructor(private bookService:BookService,private dialog: MatDialog,private router: Router){

}
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
  confirmDelete(bookId:string): void {
    const dialogRef = this.dialog.open(DeletePopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(bookId);
      }
    });
  }

  // Delete book function
  deleteBook(bookId:string): void {
    if (bookId) {
      this.bookService.deleteBook(bookId)?.subscribe(
        () => {
          console.log('Book deleted successfully');
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting book', error);
        }
      );
    }
  }



  editBook(bookId:string){
    this.router.navigate(['books/edit/'+bookId]);
  }

  reserveBook(bookId: string) {
    // Navigate to `reservation/add` with the book ID as a query parameter
    this.router.navigate(['reservations/add'], { queryParams: { bookId } });
  }

}
