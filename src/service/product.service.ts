import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs';
import axios from 'axios';

import { Product, TYPEPRODUCT } from '../Intefaces/product';
import { PRODUCTS } from '../Intefaces/mock-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

    private storageKey = 'products';
    productUpdated = new EventEmitter<Product[]>();

    product: Product | undefined;

    storedProducts = localStorage.getItem(this.storageKey)
    products =  this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS
    baseUrl = "http://localhost:3008/bicykle"

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> 
    {
        this.storedProducts = localStorage.getItem(this.storageKey);
        this.products = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
        return this.http.get<Product[]>("http://localhost:3008/bicykle");
    }

    ngOnDestroy() 
    {
        this.productUpdated;
    }

    addProduct(type: TYPEPRODUCT, nameProduct: string, markUp: string, 
      price: number, img: string, discount: number) 
    {
      axios.post<Product>("http://localhost:3008/module-add", { type, nameProduct, markUp, price, img, discount })
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        if (error.response && error.response.status === 400) 
        {
          const errorMessage = 'Error: Produck s rovnakym menom existuje.';
          const userAcknowledged = window.confirm(errorMessage);
        } else 
        {
          const errorMessage = 'Error: Unable to add the product.';
          const userAcknowledged = window.confirm(errorMessage);
          console.error(error); 
        }
    });
    }
      uploadProduct(_id: number, type: TYPEPRODUCT, nameProduct: string, markUp: string, price: number, img: string, discount: number) {
        console.log(_id, nameProduct);
        axios.post("http://localhost:3008/module-upload", { _id, type, nameProduct, markUp, price, img, discount });
      }

      deleteProduct(nameProduct: string): void {
        console.log(nameProduct);
        axios.post("http://localhost:3008/module-delete", { nameProduct });
        //window.location.reload();
      }

      
}
