import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../Intefaces/product';
import { ProductStateService } from '../../../service/product-state.service';

@Component({
  selector: 'app-produkt-show-description',
  templateUrl: './produkt-show-description.component.html',
  styleUrl: './produkt-show-description.component.css'
})
export class ProduktShowDescriptionComponent {
  selectedProduct: Product | undefined;

  constructor(private userStateService: ProductStateService) {
    this.selectedProduct = this.getSelectedProduct();
  }

  getSelectedProduct(): Product | undefined {
    return this.userStateService.getSelectedProduct();
  }
}
