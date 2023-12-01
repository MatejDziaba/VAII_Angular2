import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../../../Intefaces/product';
import { ProductService } from '../../../../service/product.service';
import { ProductStateService } from '../../../../service/product-state.service';

@Component({
  selector: 'app-bicykle',
  templateUrl: './bicykle.component.html',
  styleUrl: './bicykle.component.css'
})
export class BicykleComponent 
{
  selectedProduct?: Product;
  products: Product[] = [];

  private productsSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.productsSubscription = this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.productService.productUpdated.subscribe(updatedProducts => {
      this.products = updatedProducts;
    })

    console.log(this.products);
  } 

  ngOnDestroy(): void {
    // Zrušenie odberu v ngDestroy
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  setProduct(selectedProduct: Product): void 
  {
    this.selectedProduct = selectedProduct;
    this.productStateService.setSelectedProduct(this.selectedProduct);
  }
}
