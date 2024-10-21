import { Book } from "./books-api";
import { Customer } from "./customers-api";

export interface Reservation{
    //book name, customer name, status, reserved On,  return By
    book: Book;//Book interface 
    customer: Customer;//Customer interface
    status: string;
    phoneNumber:number;
    reservedOn: Date;
    reserveBy: Date;
   
   
}