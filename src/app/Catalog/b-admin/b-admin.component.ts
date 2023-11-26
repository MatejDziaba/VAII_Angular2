import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../product';
import { ProductService } from '../../../service/product.service';
import { ProductStateService } from '../../product-state.service';

@Component({
  selector: 'app-b-admin',
  templateUrl: './b-admin.component.html',
  styleUrl: './b-admin.component.css'
})
export class BAdminComponent {
  isIconHidden: boolean = false;
  colorIntensity: number = 100;
  
  selectedProduct?: Product;
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.productService.productUpdated.subscribe(updatedProducts => {
      this.products = updatedProducts;
    })

    console.log(this.products);
  } 

  setProduct(selectedProduct: Product): void 
  {
    this.selectedProduct = selectedProduct;
    this.productStateService.setSelectedProduct(this.selectedProduct);
  }
  
}

