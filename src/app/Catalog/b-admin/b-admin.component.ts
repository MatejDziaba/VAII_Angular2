import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-b-admin',
  templateUrl: './b-admin.component.html',
  styleUrl: './b-admin.component.css'
})
export class BAdminComponent {
  isIconHidden: boolean = false;
  colorIntensity: number = 100;

  constructor(private router: Router, private productService: ProductService) {}

  redirectToAnotherPage() {
    this.router.navigate(['/b-admin']);
  }

  toggleIconAndColor() {
    this.isIconHidden = !this.isIconHidden;

    // Ak bola ikona práve zobrazená, nastavíme intenzitu farby na 100%
    if (!this.isIconHidden) {
      this.colorIntensity = 100;
    } else {
      // Inak znížime intenzitu farby o 50%
      this.colorIntensity -= 50;
    }
  }

  @Input() product: Product | undefined;
  @Input() newProductType: string | undefined;
  @Input() newProductName: string | undefined;
  @Input() newProductMarkUp: string | undefined;
  @Input() newProductPrice: number | undefined;
  @Input() newProductImg: string | undefined;
  @Input() newProductDiscount: number | undefined;

  addProduct() 
  {
    if (this.newProductType && this.newProductName && this.newProductMarkUp && this.newProductPrice && this.newProductImg && this.newProductDiscount) 
    {
      this.productService.addProduct(this.newProductType, this.newProductName, this.newProductMarkUp, this.newProductPrice, this.newProductImg, this.newProductDiscount);
    }
  }

}

