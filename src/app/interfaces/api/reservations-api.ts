import { Book } from "./books-api";
import { Customer } from "./customers-api";

export interface Reservation{
    _id:string;
    book: Book;//Book interface 
    customer: Customer;//Customer interface
    status: string;
    phoneNumber:number;
    reservedOn: Date;
    returnBy: Date;
   
   
}