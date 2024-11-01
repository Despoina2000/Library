import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../../interfaces/books-api';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  endpoint: string='https://book-api-bx2r.onrender.com/books';
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Array<Book>|null>{
    return this.http.get<Array<Book>|null>(this.endpoint);
  }
  

  getBook(bookId: string): Observable<Book|null> {
    return this.getAllBooks().pipe(
      map((books) => {
        // Find the book with the matching ID, or return null if not found
        return books?.find(book => book._id === bookId) || null;
      })
    );
  }

  addBook(bookData: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Book>(this.endpoint, bookData, { headers });
  }

  updateBook(bookData: Book): Observable<Book>|null {
    if(bookData._id){
      if(this.getBook(bookData._id)){
        return this.http.put<Book>(`${this.endpoint}/${bookData._id}`, bookData);
      }
    }
   
    return null;
  }

  deleteBook(bookId: string): Observable<void>|null {
    if(this.getBook(bookId)){
      return this.http.delete<void>(`${this.endpoint}/${bookId}`);
    }
    return null;
  }
}
