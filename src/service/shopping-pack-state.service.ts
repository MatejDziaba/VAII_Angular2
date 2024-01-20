import { Injectable } from '@angular/core';
import { Product } from '../Intefaces/product';
import { BazarProduct } from '../Intefaces/bazar-product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingPackStateService {
  private readonly storageKey = 'selectedProductInShoppingPack';

  selectedProduct: (Product | BazarProduct) | undefined;

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

  getSelectedProduct(): (Product | BazarProduct) | undefined {
    return this.selectedProduct;
  }

  clearSelectedProduct(): void {
    this.selectedProduct = undefined;
    localStorage.removeItem(this.storageKey);
  }
}
