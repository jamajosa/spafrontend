import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';
import { MessageService } from './message.service';

@Injectable()
export class ProductService {
  result:any;
  readonly url = 'https://spatoolbackend.herokuapp.com/api/products';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getProducts (): Observable<Product[]> {
   return this.http.get<Product[]>(this.url)
     .pipe(
       tap(products => this.log('fetched products')),
       catchError(this.handleError('getproducts', []))
     );
 }

 private handleError<T> (operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {

       // TODO: send the error to remote logging infrastructure
       console.error(error); // log to console instead

       // TODO: better job of transforming error for user consumption
       this.log(`${operation} failed: ${error.message}`);

       // Let the app keep running by returning an empty result.
       return of(result as T);
     };
   }

 private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
}
