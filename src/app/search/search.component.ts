import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BazarProduct } from '../../Intefaces/bazar-product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { ProductStateService } from '../../service/product-state.service';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from '../../Intefaces/product';
import { ShoppingPackService } from '../../service/shoping-pack.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  selectedProduct?: Product;
  productsNormal: Product[] = [];
  selectedProductBazar?: BazarProduct;
  productsBazar: BazarProduct[] = [];
  popisVyberuZoradenia: string = "Výberte si";

  products_To_See_Normal: Product[] = [];
  products_To_See_Bazar: BazarProduct[] = [];

  products_To_See: (Product | BazarProduct)[] = [];

  private productsSubscription: Subscription | undefined;

  constructor(private router: Router, private productService: ProductService, private productStateService: ProductStateService, private shoppingPackService: ShoppingPackService) {}

  ngOnInit(): void 
  {
    if (this.productService.getRefreshSeachSite()) 
    {
      this.productService.setRefreshSeachSite_false();
      window.location.reload();
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/bazar') {
          window.location.reload();
        }
      }
    });
    this.productsSubscription = this.productService.getBazarProducts().subscribe(products => {
      this.productsBazar = products;
      console.log(this.productsBazar);
      this.setBazarProductsToSee();
    });

    this.productService.productUpdated_bazar.subscribe(updatedProducts => {
      this.productsBazar = updatedProducts;
    })

    this.productsSubscription = this.productService.getProducts().subscribe(products => {
      this.productsNormal = products;
      console.log(this.productsNormal);
      this.setNormalProductsToSee();
    });

    this.productService.productUpdated.subscribe(updatedProducts => {
      this.productsNormal = updatedProducts;
    })
  } 

  setBazarProductsToSee() 
  {
    if (this.productService.getSearchTerm() != "") 
    {
      if (this.products_To_See_Bazar.length < this.productsBazar.length) 
      {
        for (let i = 0; i < this.productsBazar.length; i++) 
        {
          const searchTermLowerCase = this.productService.searchTerm.toLowerCase();
          
          const nameProductLowerCase = this.productsBazar[i].nameProduct.toLocaleLowerCase();
          const infoProductLowerCase = this.productsBazar[i].infoProduct.toLowerCase();
          const priceProductLowerCase = this.productsBazar[i].price.toString().toLowerCase();

          if (nameProductLowerCase.includes(searchTermLowerCase) ||
              infoProductLowerCase.includes(searchTermLowerCase) ||
              priceProductLowerCase.includes(searchTermLowerCase)) 
          {
            this.products_To_See.push(this.productsBazar[i]);
          }
        }
      }
    }
  }

  setNormalProductsToSee() 
  {
    if (this.productService.getSearchTerm() != "") 
    {
      if (this.products_To_See_Normal.length < this.productsNormal.length) 
      {
        for (let i = 0; i < this.productsNormal.length; i++) 
        {
          const searchTermLowerCase = this.productService.searchTerm.toLowerCase();
          
          const nameProductLowerCase = this.productsNormal[i].nameProduct.toLocaleLowerCase();
          const typeLowerCase = this.productsNormal[i].type.toLowerCase();
          const priceProductLowerCase = this.productsNormal[i].price.toString().toLowerCase();

          if (nameProductLowerCase.includes(searchTermLowerCase) ||
              typeLowerCase.includes(searchTermLowerCase) ||
              priceProductLowerCase.includes(searchTermLowerCase)) 
          {
            this.products_To_See.push(this.productsNormal[i]);
          }
        }
      }
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
    this.selectedProductBazar = selectedProduct;
    this.productStateService.setSelectedBazarProduct(this.selectedProductBazar);
  }

  sendProductAndWebsiteLinkToShoppingPackService(product: (Product | BazarProduct), link: string) 
  {
    this.shoppingPackService.setActualWebsiteLink(link);
    this.shoppingPackService.addProduct(product);
  }
}
