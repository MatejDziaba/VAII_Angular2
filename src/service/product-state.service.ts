import { Injectable } from '@angular/core';
import { Product } from '../Intefaces/product';
import { BazarProduct } from '../Intefaces/bazar-product';

@Injectable({
  providedIn: 'root',
})
export class ProductStateService {
  private readonly storageKey = 'selectedProduct';

  selectedProduct: Product | undefined;
  selectedProduct_bazar: BazarProduct | undefined;

  constructor() {
    const storedProduct = localStorage.getItem(this.storageKey);
    this.selectedProduct = storedProduct ? JSON.parse(storedProduct) : undefined;
  }

  setSelectedProduct(product: BazarProduct): void {
    if (product) {
      this.selectedProduct = product;
      localStorage.setItem(this.storageKey, JSON.stringify(product));
      console.log("Product is not null");
    } else {
      console.error('Invalid product object!');
    }
  }

  setSelectedBazarProduct(product: BazarProduct): void {
    if (product) {
      this.selectedProduct_bazar = product;
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
