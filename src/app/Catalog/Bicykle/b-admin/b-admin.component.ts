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
  popisVyberuZoradenia: string = "Výberte si";

  maxItems_To_See: number = 6;
  actualIndex_To_See: number = 1;
  actualIndex_To_See_page: number = 1;
  actualIndex: number = 0;
  products_To_See: Product[] = [];

  pageCount: number = 0;
  pages: number[] = [];

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
      this.setProductsToSee();
      this.setPageCount();
    });

    this.productService.productUpdated.subscribe(updatedProducts => {
      this.products = updatedProducts;
    })

    console.log(this.products);
  } 

  setProductsToSee() 
  {
    let wasBreak = false;
    if (this.products_To_See.length < this.products.length) 
    {
      for (let i = this.actualIndex; i < (this.actualIndex_To_See*this.maxItems_To_See); i++) 
      {
        if (i < this.products.length) 
        {
          this.products_To_See.push(this.products[i]);
        } else 
        {
          wasBreak = true;
          break;
        }
      }
    }
    

    if (wasBreak)
      this.actualIndex = this.products_To_See.length - 1;
    else
      this.actualIndex = this.maxItems_To_See;
    
  }

  increaseItemsToSee()
  {
    this.actualIndex_To_See++;
    this.setProductsToSee();
    console.log(this.products_To_See);
    this.sortProductsByName(this.popisVyberuZoradenia);
    this.sortProductsByPrice(this.popisVyberuZoradenia);
  }

  setProductsToSee_Page(page: number) 
  {
    this.products_To_See = [];
    this.actualIndex_To_See = 1;
    let startIndex = (page - 1) * this.maxItems_To_See;
    for (let i = startIndex; i < ((page) * this.maxItems_To_See ); i++) 
    {
      if (i < this.products.length) 
      {
        if (this.products_To_See.length < this.products.length) 
        {
          this.products_To_See.push(this.products[i]);
        }
      } else 
      {
        break;
      }
    }
  }

  setPageCount() 
  {
    this.pageCount = this.products.length % this.maxItems_To_See;
    for (let i = 0; i < this.pageCount; i++) 
    {
      this.pages.push(i + 1);
    }
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

  sortProductsByPrice(str: String)
  {
    if (str === 'lowToHigh') {
      this.products_To_See.sort((a, b) => a.price - b.price);
      this.popisVyberuZoradenia = "Od najlacnejších";
    } else if (str === 'highToLow') {
      this.products_To_See.sort((a, b) => b.price - a.price);
      this.popisVyberuZoradenia = "Od najdrahších";
    }
  }

  sortProductsByName(str: string) {
    if (str === 'A-Z') {
      this.products_To_See.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
      this.popisVyberuZoradenia = 'názov A-Z';
    } else if (str === 'Z-A') {
      this.products_To_See.sort((a, b) => b.nameProduct.localeCompare(a.nameProduct));
      this.popisVyberuZoradenia = 'názov Z-A';
    }
  }
  
}

