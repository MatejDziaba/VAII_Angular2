import { Injectable } from '@angular/core';
import { Product } from '../product';

@Injectable({
    providedIn: 'root',
  })
  export class ProductStateService 
  {
    selectedProduct: Product | undefined;

    setSelectedProduct(product: Product): void 
    {
        if (product) 
        {
            this.selectedProduct = product;
            console.log("Produkt nie je null");
            console.log(product);
        } else {
            // Objekt nie je platný, môžete vyhodiť chybu alebo spracovať inak.
            console.error('Neplatný objekt produkt !!!!!!!!!!!!!!!!!!!');
        }
    }
  }