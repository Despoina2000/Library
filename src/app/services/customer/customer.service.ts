import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../interfaces/customers-api';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  endpoint: string='https://book-api-bx2r.onrender.com/customers';
  

  getAllCustomers(): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.endpoint);
  }
}
