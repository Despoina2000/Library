import { Component,signal } from '@angular/core';
import { Book } from '../../../interfaces/books-api';
import { BookService } from '../../../services/book/book.service';
import { ListOfBooksComponent } from '../list-of-books/list-of-books.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListOfBooksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: Array<Book>|null= [];
  categories: Array<string>=[];

  constructor(private bookServise:BookService){
    try{
      this.bookServise.getAllBooks().subscribe((data)=>{
        data?.forEach(element => {
          if(element.available==true){
            this.books?.push(element);
          }
          
        });
        this.categories=[...new Set(data?.map(item => item.type))];
     });
    }
    catch( HttpErrorResponse){
      this.books=null;
    }
  }

  ngOnChange(){
    
  }

  
}
