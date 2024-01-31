import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingPackService } from '../../../service/shoping-pack.service';
import { Product } from '../../../Intefaces/product';
import { BazarProduct } from '../../../Intefaces/bazar-product';

interface ShoppingProduct
{
  product: (Product | BazarProduct),
  countOfProduct: number
}

@Component({
  selector: 'app-not-empty',
  templateUrl: './not-empty.component.html',
  styleUrl: './not-empty.component.css'
})
export class NotEmptyComponent {

  shoppingProducts: ShoppingProduct[] = [];
  sumPriceInShoppingPack: number = 0.00;

  constructor(private shoppingPackService: ShoppingPackService) 
  {
    this.shoppingProducts = this.shoppingPackService.getProducts();
    console.log(this.shoppingProducts);
  }

  ngOnInit() 
  {
    window.scrollTo(0, 100);
  }

  increaseProductCount_InShoppingPack(shoppingProduct: ShoppingProduct) 
  {
    this.shoppingPackService.increaseProductCount_InShoppingPack(shoppingProduct);
  }

  decreaseProductCount_InShoppingPack(shoppingProduct: ShoppingProduct) 
  {
    this.shoppingPackService.decreaseProductCount_InShoppingPack(shoppingProduct);
  }

  deleteShoppingPack(shoppingProduct: ShoppingProduct) 
  {
    this.shoppingPackService.deleteProduct(shoppingProduct.product.nameProduct);
  }

}
