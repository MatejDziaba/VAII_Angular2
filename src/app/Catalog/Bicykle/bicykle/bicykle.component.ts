import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from '../../../../Intefaces/product';
import { ProductService } from '../../../../service/product.service';
import { ProductStateService } from '../../../../service/product-state.service';
import { ShoppingPackService } from '../../../../service/shoping-pack.service';
import { BazarProduct } from '../../../../Intefaces/bazar-product';

@Component({
  selector: 'app-bicykle',
  templateUrl: './bicykle.component.html',
  styleUrl: './bicykle.component.css'
})
export class BicykleComponent 
{
  selectedProduct?: Product;
  products: Product[] = [];
  popisVyberuZoradenia: string = "Výberte si";

  MAX_ITEMS_TO_SEE: number = 6;
  actualIndex_To_See: number = 1;
  actualIndex_To_See_page: number = 1;
  actualIndex: number = 0;
  products_To_See: Product[] = [];

  pageCount: number = 0;
  pages: number[] = [];

  private productsSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService, private shoppingPackService: ShoppingPackService) {}

  ngOnInit(): void 
  {
    window.scrollTo(0, 650);
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
      for (let i = this.actualIndex; i < (this.actualIndex_To_See*this.MAX_ITEMS_TO_SEE); i++) 
      {
        if (i < this.products.length) 
        {
          if (!this.products_To_See.find(product => product.nameProduct === this.products[i].nameProduct)) 
          {
            this.products_To_See.push(this.products[i]);
          } 
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
      this.actualIndex = this.MAX_ITEMS_TO_SEE;
  }

  increaseItemsToSee()
  {
    if (this.products_To_See.length < this.products.length && this.actualIndex_To_See < (this.products.length / this.MAX_ITEMS_TO_SEE)) 
    {
      this.actualIndex_To_See++;
      this.setProductsToSee();
      this.sortProductsByName(this.popisVyberuZoradenia);
      this.sortProductsByPrice(this.popisVyberuZoradenia);
    }
    console.log(this.actualIndex_To_See);
  }

  setProductsToSee_Page(page: number) 
  {
    this.products_To_See = [];
    this.actualIndex_To_See = page;
    let startIndex = (page - 1) * this.MAX_ITEMS_TO_SEE;
    for (let i = startIndex; i < ((page) * this.MAX_ITEMS_TO_SEE ); i++) 
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
    if (this.MAX_ITEMS_TO_SEE != 0) 
    {
      let pomNumberCount = this.products.length / this.MAX_ITEMS_TO_SEE;
      if (Number.isInteger(pomNumberCount))
      {
        this.pageCount = pomNumberCount;
      }
      else if (!Number.isInteger(pomNumberCount) && this.products.length > this.MAX_ITEMS_TO_SEE) 
      {
        this.pageCount = pomNumberCount;
      } else if (!Number.isInteger(pomNumberCount) && this.products.length <= this.MAX_ITEMS_TO_SEE)
      {
        this.pageCount = 1;
      }
    }
    else if (this.MAX_ITEMS_TO_SEE == 0)
      this.pageCount = 0;
    
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
    console.log(this.productStateService.getSelectedProduct());
    this.router.navigate(['/produkt-show'], { fragment: '' });
  }

  sortProductsByPrice(str: String)
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
      this.products_To_See.sort((a, b) => {
        let pomString_a = a.markUp + a.nameProduct;
        let pomString_b = b.markUp + b.nameProduct;
        return pomString_a.localeCompare(pomString_b);
      });
      this.popisVyberuZoradenia = 'Podľa názvu A-Z';
    } else if (str === 'Podľa názvu Z-A') {
      this.products_To_See.sort((a, b) => {
        let pomString_a = a.markUp + a.nameProduct;
        let pomString_b = b.markUp + b.nameProduct;
        return pomString_b.localeCompare(pomString_a);
      });
      this.popisVyberuZoradenia = 'Podľa názvu Z-A';
    }
  }

  sendProductAndWebsiteLinkToShoppingPackService(product: (Product | BazarProduct), link: string) 
  {
    this.shoppingPackService.setActualWebsiteLink(link);
    this.shoppingPackService.addProduct(product);
  }
}
