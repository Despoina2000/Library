import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../interfaces/books-api';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  endpoint: string='https://book-api-bx2r.onrender.com/books';
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Array<Book>>{
    return this.http.get<Array<Book>>(this.endpoint);
  }
}
