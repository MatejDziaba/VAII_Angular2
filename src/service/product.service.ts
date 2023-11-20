import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Product } from '../product';
import { PRODUCTS } from '../mock-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

    constructor() {}

    getProducts(): Observable<Product[]> 
    {
        const products = of(PRODUCTS);
        return products;
    }

    addProduct(type: string, nameProduct: string, markUp: string, price: number, img: string, discount: number): Observable<Product[]>
    {
        const newIndex = PRODUCTS[PRODUCTS.length - 1].id + 1;
        const newProduct: Product = { id: newIndex, type, nameProduct, markUp, price, img, discount};
        PRODUCTS.push(newProduct);
        return of(PRODUCTS); // Vrátí aktualizovaný seznam hrdinů
    }
}
