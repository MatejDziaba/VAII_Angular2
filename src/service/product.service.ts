import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
        return of(this.products);
        //return this.http.get<Product[]>("http://localhost:3008/bicykle");
    }

    ngOnDestroy() 
    {
        this.productUpdated;
    }

    addProduct(type: TYPEPRODUCT, nameProduct: string, markUp: string, 
               price: number,     img: string,         discount: number)
    {
        this.storedProducts = localStorage.getItem(this.storageKey);
        this.products = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
        //this.products = this.getProducts();

        let newIndex = 1;
        if (this.products.length > 0) 
        {
            newIndex = this.products[this.products.length - 1].id + 1;
        }

        this.products.push({ id: newIndex, type, nameProduct, markUp, price, img, discount });

        localStorage.setItem(this.storageKey, JSON.stringify(this.products));

        this.productUpdated.emit(this.products);

        //const newProduct = { type, nameProduct, markUp, price, img, discount };
        //const url = "http://localhost:3008/bicykle/add";
        //this.http.post<any>(url, newProduct);
    }

    uploadProduct(id: number, type: TYPEPRODUCT, nameProduct: string, markUp: string, price: number, img: string, discount: number) {
        this.storedProducts = localStorage.getItem(this.storageKey);
        let products: Product[] = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
      
        products.forEach((product, index) => {
          if (product.id === id) 
          {
            products[index] = { id, type, nameProduct, markUp, price, img, discount};
            localStorage.setItem(this.storageKey, JSON.stringify(products));
            this.productUpdated.emit(products);
          }
        });
      }

      deleteProduct(nameProduct: string): void {
        this.storedProducts = localStorage.getItem(this.storageKey);
      
        if (this.storedProducts) {
          let products: Product[] = JSON.parse(this.storedProducts);
          const index = products.findIndex(product => product.nameProduct === nameProduct);
      
          if (index != -1) {
            products.splice(index, 1);
            localStorage.setItem(this.storageKey, JSON.stringify(products));
            this.productUpdated.emit(products);
          }
        } 
      }
}
