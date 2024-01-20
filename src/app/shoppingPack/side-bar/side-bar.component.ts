import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingPackService } from '../../../service/shoping-pack.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(private shoppingPackService: ShoppingPackService) {}

  getSumPriceWithDPH(): number
  {
    return this.shoppingPackService.getSumPriceWithDPH();
  }

  getSumPriceWithoutDPH(): number
  {
    return this.shoppingPackService.getSumPriceWithoutDPH();
  }

  getDPH(): number
  {
    return this.shoppingPackService.getDPH();
  }

  getAllProductsInShoppingPack(): number
  {
    return this.shoppingPackService.getAllProductsInShoppingPack()
  }
}
