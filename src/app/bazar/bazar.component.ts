import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { ProductStateService } from '../../service/product-state.service';
import { BazarProduct } from '../../Intefaces/bazar-product';

@Component({
  selector: 'app-bazar',
  templateUrl: './bazar.component.html',
  styleUrl: './bazar.component.css'
})
export class BazarComponent {
  selectedProduct?: BazarProduct;
  products: BazarProduct[] = [];
  popisVyberuZoradenia: string = "Výberte si";
  
  maxItems_To_See: number = 6;
  actualIndex_To_See: number = 1;
  actualIndex_To_See_page: number = 1;
  actualIndex: number = 0;
  products_To_See: BazarProduct[] = [];

  pageCount: number = 0;
  pages: number[] = [];

  private productsSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/bazar') {
          window.location.reload();
        }
      }
    });
    this.productsSubscription = this.productService.getBazarProducts().subscribe(products => {
      this.products = products;
      this.setProductsToSee();
      this.setPageCount();
    });

    this.productService.productUpdated_bazar.subscribe(updatedProducts => {
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

  sortProductsByPrice(str: string)
  {
    if (str === "Od najlacnejších") {
      this.products_To_See.sort((a, b) => a.price - b.price);
      this.popisVyberuZoradenia = "Od najlacnejších";
    } else if (str === "Od najdrahších") {
      this.products_To_See.sort((a, b) => b.price - a.price);
      this.popisVyberuZoradenia = "Od najdrahších";
    }
  }

  sortProductsByName(str: string) {
    if (str === 'Podľa názvu A-Z') {
      this.products_To_See.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
      this.popisVyberuZoradenia = 'Podľa názvu A-Z';
    } else if (str === 'Podľa názvu Z-A') {
      this.products_To_See.sort((a, b) => b.nameProduct.localeCompare(a.nameProduct));
      this.popisVyberuZoradenia = 'Podľa názvu Z-A';
    }
  }

  setProduct(selectedProduct: BazarProduct): void 
  {
    this.selectedProduct = selectedProduct;
    this.productStateService.setSelectedBazarProduct(this.selectedProduct);
  }
}