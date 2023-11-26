import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Product, TYPEPRODUCT } from '../product';
import { PRODUCTS } from '../mock-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

    private storageKey = 'products';
    productUpdated = new EventEmitter<Product[]>();

    product: Product | undefined;

    storedProducts = localStorage.getItem(this.storageKey)
    products =  this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS

    constructor() {}

    getProducts(): Observable<Product[]> 
    {
        this.storedProducts = localStorage.getItem(this.storageKey);
        this.products = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
        return of(this.products);
    }

    addProduct(type: TYPEPRODUCT, nameProduct: string, markUp: string, price: number, img: string, discount: number): Observable<Product[]>
    {
        this.storedProducts = localStorage.getItem(this.storageKey);
        this.products = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;

        const newIndex = this.products[this.products.length - 1].id + 1;
        const newProduct: Product = { id: newIndex, type, nameProduct, markUp, price, img, discount};

        this.products.push(newProduct);

        localStorage.setItem(this.storageKey, JSON.stringify(this.products));

        this.productUpdated.emit(this.products);

        return of(this.products); // Vrátí aktualizovaný seznam hrdinů
    }

    uploadProduct(id: number, type: TYPEPRODUCT, nameProduct: string, markUp: string, price: number, img: string, discount: number) {
        this.storedProducts = localStorage.getItem(this.storageKey);
        let products: Product[] = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
      
        console.log("POMOC");
        products.forEach((product, index) => {
            console.log(index);
          if (product.id === id) {
            // Nájdeme hrdinu podľa mena a priezviska
            // Upravíme hodnoty atribútov
            products[index] = { id, type, nameProduct, markUp, price, img, discount};

            console.log("upraveny Produkt:", products[index]);
      
            // Uložíme aktualizovaný zoznam hrdinov do localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(products));
      
            // Emitujeme udalosť s aktualizovaným zoznamom hrdinov
            this.productUpdated.emit(products);
          }
        });
      }

}
