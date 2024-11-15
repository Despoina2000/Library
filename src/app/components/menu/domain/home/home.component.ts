import { Component,signal } from '@angular/core';
import { Book } from '../../../../interfaces/api/books-api';
import { BookService } from '../../../../services/book/book.service';
import { ListOfBooksComponent } from '../../list-of-books/list-of-books.component';
import { error } from 'console';
import {MatButton} from "@angular/material/button";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatIcon} from "@angular/material/icon";
import {SearchBookFilter} from '../../../../interfaces/search-filter/search-book-filter';
import {SearchBookPopUpComponent} from '../../search-book-pop-up/search-book-pop-up.component';
import {MatDialog} from '@angular/material/dialog';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
    imports: [ListOfBooksComponent, MatButton, MatIcon, NgIf, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../../css/button.css','../../../../css/alert.css']
})
export class HomeComponent {
  books: Array<Book>= [];
  filteredBooks: Array<Book> = [];
  categories: Array<string> = [];
  searchResults: SearchBookFilter = {};
  searchFilterFlag: boolean= false;
  constructor(private bookService:BookService,private dialog: MatDialog){
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe((data)=>{
         this.books = data?.filter(book => book.available) || [];
         this.filteredBooks = [...this.books];
         this.categories=[...new Set(data?.map(item => item.type))];
      },(error)=>{
       console.log(error);
       this.books=[];
      });
  }

  resetBooks(){
    this.searchFilterFlag = false;
    this.loadBooks();
  }

  searchFilter() {
    const dialogRef = this.dialog.open(SearchBookPopUpComponent,{data: { existingFilters: this.searchResults  }});

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
      else{
        this.searchFilterFlag = false;
        this.searchResults = {};
        this.loadBooks();
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

      return matchesYear && matchesAuthor && matchesDate&& book.available;
    });
  }


}
