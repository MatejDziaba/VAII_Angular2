import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../../../Intefaces/product';
import { ProductService } from '../../../../service/product.service';
import { ProductStateService } from '../../../../service/product-state.service';

@Component({
  selector: 'app-b-admin',
  templateUrl: './b-admin.component.html',
  styleUrl: './b-admin.component.css'
})
export class BAdminComponent 
{
  selectedProduct?: Product;
  products: Product[] = [];

  private productsSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/b-admin') {
          window.location.reload();
        }
      }
    });
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

