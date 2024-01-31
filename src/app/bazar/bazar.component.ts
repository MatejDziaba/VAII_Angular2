import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { ProductStateService } from '../../service/product-state.service';
import { BazarProduct } from '../../Intefaces/bazar-product';
import { UserStateService } from '../../service/user-state.service';
import { ShoppingPackService } from '../../service/shoping-pack.service';
import { Product } from '../../Intefaces/product';

@Component({
  selector: 'app-bazar',
  templateUrl: './bazar.component.html',
  styleUrl: './bazar.component.css'
})
export class BazarComponent {
  selectedProduct?: BazarProduct;
  products: BazarProduct[] = [];
  popisVyberuZoradenia: string = "Výberte si";
  
  MAX_ITEMS_TO_SEE: number = 8;
  actualIndex_To_See: number = 1;
  actualIndex_To_See_page: number = 1;
  actualIndex: number = 0;
  products_To_See: BazarProduct[] = [];

  pageCount: number = 0;
  pages: number[] = [];

  userName: string = 'Prihlás sa';
  userState: string = 'none';

  private productsSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService, private userStateService: UserStateService, private shoppingPackService: ShoppingPackService) {}

  ngOnInit(): void 
  {
    window.scrollTo(0, 100);
    this.autorization();
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

  private autorization() 
  {
    let actualUser = this.userStateService.getActualUser();
    if (actualUser !== null) {
      this.userName = actualUser.name;
      if (actualUser.admin == true) {
        this.userState = 'admin';
      }
      else {
        this.userState = 'customer';
      }
    }
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
      window.scrollTo(0, 1000);
      this.actualIndex_To_See++;
      this.setProductsToSee();
      this.sortProductsByName(this.popisVyberuZoradenia);
      this.sortProductsByPrice(this.popisVyberuZoradenia);
    }
    console.log(this.actualIndex_To_See);
  }

  setProductsToSee_Page(page: number) 
  {
    window.scrollTo(0, 120);
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

  sendProductAndWebsiteLinkToShoppingPackService(product: (Product | BazarProduct), link: string) 
  {
    this.shoppingPackService.setActualWebsiteLink(link);
    this.shoppingPackService.addProduct(product);
  }

  getActualUserEmail() 
  {
    return this.userStateService.getActualUser()?.email;
  }
}
