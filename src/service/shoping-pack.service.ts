import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Product } from '../Intefaces/product';
import { BazarProduct } from '../Intefaces/bazar-product';
import { ShoppingPackStateService } from './shopping-pack-state.service';

interface ShoppingProduct
{
  product: (Product | BazarProduct),
  countOfProduct: number
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingPackService {

    private storageKey = 'ShoppingPackProducts';
    productUpdated = new EventEmitter<ShoppingProduct[]>();

    product: ShoppingProduct | undefined;
    productsInPack: ShoppingProduct[] = [];

    storedProducts = localStorage.getItem(this.storageKey);

    sumPrice: number = 0;
    link: string = "/";

    constructor(private http: HttpClient, private shoppingPackStateService: ShoppingPackStateService) 
    {
        this.setProducts();
    }

    getProducts(): ShoppingProduct[]
    {
        this.setProducts();
        return this.productsInPack;
    }

    setProducts()
    {
        this.storedProducts = localStorage.getItem(this.storageKey);
        if (this.storedProducts) 
        {
            this.productsInPack = this.storedProducts ? JSON.parse(this.storedProducts) : undefined;
        }
    }

    ngOnDestroy() 
    {
        this.productUpdated;
    }

    addProduct(product: (Product | BazarProduct)) 
    {
        let willBeUniq = true;
        for (let i = 0; i < this.productsInPack.length; i++) 
        {
            if (this.productsInPack[i].product.nameProduct == product.nameProduct) 
            {
                willBeUniq = false;
            }
        }
        if (willBeUniq) 
        {
            this.productsInPack.push({ product, countOfProduct: 1 });
            localStorage.setItem(this.storageKey, JSON.stringify(this.productsInPack));
            this.productUpdated.emit(this.productsInPack);
        }
    }

    setActualWebsiteLink(link: string)
    {
        this.link = link;
    }

    getActualWebsiteLink()
    {
        return this.link;
    }

    deleteProduct(productName: string) {
        const index = this.productsInPack.findIndex((product) => product.product.nameProduct === productName);
    
        if (index !== -1) {
            this.productsInPack.splice(index, 1);
            localStorage.setItem(this.storageKey, JSON.stringify(this.productsInPack));
            this.productUpdated.emit(this.productsInPack);
        }
        if (this.productsInPack.length == 0) 
        {
            window.location.reload();
        }
    }

    getItemsInShoppingPack(): number 
    {
        return this.productsInPack.length;
    }

    getSumPriceWithDPH(): number
    {
        this.sumPrice = 0;
        for (let i = 0; i < this.productsInPack.length; i++) 
        {
            this.sumPrice += (this.productsInPack[i].product.price) * this.productsInPack[i].countOfProduct;
        }
        return this.sumPrice;
    }

    getSumPriceWithoutDPH(): number 
    {
        return this.getSumPriceWithDPH()/(1.2);
    }

    getDPH(): number
    {
        return (this.getSumPriceWithDPH() - this.getSumPriceWithoutDPH());
    }

    getAllProductsInShoppingPack(): number
    {
        let pomCount = 0;
        for(let i = 0; i < this.productsInPack.length; i++) 
        {
            pomCount += this.productsInPack[i].countOfProduct;
        } 
        return pomCount;
    }

  increaseProductCount_InShoppingPack(shoppingProduct: ShoppingProduct) 
  {
    for(let i = 0; i < this.productsInPack.length; i++) 
    {
      if (this.productsInPack[i].product.nameProduct == shoppingProduct.product.nameProduct) 
      {
        this.productsInPack[i].countOfProduct += 1;
        localStorage.setItem(this.storageKey, JSON.stringify(this.productsInPack));
        this.productUpdated.emit(this.productsInPack);
      }
    }     
  }

  decreaseProductCount_InShoppingPack(shoppingProduct: ShoppingProduct) 
  {
    for(let i = 0; i < this.productsInPack.length; i++) 
    {
      if (this.productsInPack[i].product.nameProduct == shoppingProduct.product.nameProduct) 
      {
        if (this.productsInPack[i].countOfProduct > 1) 
        {
          this.productsInPack[i].countOfProduct -= 1;
        }
        localStorage.setItem(this.storageKey, JSON.stringify(this.productsInPack));
        this.productUpdated.emit(this.productsInPack);
      }
    } 
  }
}
