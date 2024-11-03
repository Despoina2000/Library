import { Component } from '@angular/core';
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import { Book } from '../../../../interfaces/api/books-api';
import { BookService } from '../../../../services/book/book.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ListOfBooksComponent } from '../../list-of-books/list-of-books.component';
import { error } from 'console';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SearchBookPopUpComponent} from '../../search-book-pop-up/search-book-pop-up.component';
import {SearchBookFilter} from '../../../../interfaces/search-filter/search-book-filter';
import {ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, DatePipe, ListOfBooksComponent, MatIconModule, KeyValuePipe, NgForOf, ReactiveFormsModule,NgIf],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: Array<Book>= [];
  filteredBooks: Array<Book> = [];
  categories: Array<string> = [];
  searchResults: SearchBookFilter = {};
  searchFilterFlag: boolean= false;
  constructor(private bookService:BookService,private router: Router, private activeRoute: ActivatedRoute,private dialog: MatDialog){
    this.loadBooks();


  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data ? data : [];
        this.filteredBooks = [...this.books];
        this.categories = [...new Set(data?.map((item) => item.type))];
      },
      (error) => {
        console.log(error);
        this.books = [];
      }
    );
  }

  resetBooks(){
    this.searchFilterFlag = false;
    this.loadBooks();
  }

  searchFilter() {
    const dialogRef = this.dialog.open(SearchBookPopUpComponent);

    dialogRef.afterClosed().subscribe((results) => {
      if (results) {
        this.searchFilterFlag=true;
        this.searchResults = results;
        if (this.searchResults.name) {
          // If a name is specified, use getBookByName to fetch matching books
          this.bookService.getBookByName(this.searchResults.name).subscribe(
            (books) => {
              this.filteredBooks = books ? books : [];
              this.applyAdditionalFilters(); // Apply other filters to the results
            },
            (error) => {
              console.error("Error fetching books by name:", error);
              this.filteredBooks = [];
            }
          );
        } else {
          // If no name specified, filter directly on the locally loaded books
          this.applyAdditionalFilters();
        }
      }
    });
  }

  applyAdditionalFilters() {
    this.filteredBooks = this.filteredBooks.filter((book) => {

      const matchesYear = this.searchResults.year
        ? book.year === this.searchResults.year
        : true;

      const matchesAuthor = this.searchResults.author
        ? book.author.toLowerCase().includes(this.searchResults.author.toLowerCase())
        : true;

      const createdFromDate = this.searchResults.createdFrom
        ? new Date(this.searchResults.createdFrom)
        : null;
      const createdToDate = this.searchResults.createdTo
        ? new Date(this.searchResults.createdTo)
        : null;
      const bookCreatedDate = new Date(book.createdOn);

      const matchesDate =
        (!createdFromDate || bookCreatedDate >= createdFromDate) &&
        (!createdToDate || bookCreatedDate <= createdToDate);

      return matchesYear && matchesAuthor && matchesDate;
    });
  }



  addBook(){
    this.router.navigate(['books/add']);
  }
}
