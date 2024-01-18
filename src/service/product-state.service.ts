import { Injectable } from '@angular/core';
import { Product } from '../Intefaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private readonly storageKey = 'selectedProduct';

  selectedProduct: Product | undefined;

  constructor() {
    const storedProduct = localStorage.getItem(this.storageKey);
    this.selectedProduct = storedProduct ? JSON.parse(storedProduct) : undefined;
  }

  setSelectedProduct(product: Product): void {
    if (product) {
      this.selectedProduct = product;
      localStorage.setItem(this.storageKey, JSON.stringify(product));
      console.log("Product is not null");
    } else {
      console.error('Invalid product object!');
    }
  }

  getSelectedProduct(): Product | undefined {
    return this.selectedProduct;
  }

  clearSelectedProduct(): void {
    this.selectedProduct = undefined;
    localStorage.removeItem(this.storageKey);
  }
}
