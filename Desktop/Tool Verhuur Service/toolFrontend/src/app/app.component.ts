import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ProductService]
})
export class AppComponent {
  title = 'toolFrontend';

  // Define a users property to hold our user data
 products: Array<any>;

 // Create an instance of the DataService through dependency injection
 constructor(private _productService: ProductService) {

   // Access the Data Service's getUsers() method we defined
   this._productService.getProducts()
       .subscribe(res => this.products = res);
 }

}
