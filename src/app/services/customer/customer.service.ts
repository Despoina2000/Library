import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getCustomer(customerId: string): Observable<Customer|null> {
    return this.getAllCustomers().pipe(
      map((customers) => {
        // Find the customer with the matching ID, or return null if not found
        return customers.find(customer => customer._id === customerId) || null;
      })
    );
  }

  addCustomer(customerData: Customer): Observable<Customer> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Customer>(this.endpoint, customerData, { headers });
  }

  updateCustomer(customerData: Customer): Observable<Customer>|null {
   if(this.getCustomer(customerData._id)){
      return this.http.put<Customer>(`${this.endpoint}/${customerData._id}`, customerData);
    }
    return null;
  }

  deleteCustomer(customerId: string): Observable<void>|null {
    if(this.getCustomer(customerId)){
      return this.http.delete<void>(`${this.endpoint}/${customerId}`);
    }
    return null;
  }
  
}
