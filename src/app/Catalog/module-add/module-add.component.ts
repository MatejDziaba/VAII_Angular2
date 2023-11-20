import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrl: './module-add.component.css'
  
})
export class ModuleAddComponent {

  @Input() product: Product | undefined;
  
  @Input() newProductType: string | undefined;
  @Input() newProductName: string | undefined;
  @Input() newProductMarkUp: string | undefined;
  @Input() newProductPrice: number | undefined;
  @Input() newProductImg: string | undefined;
  @Input() newProductDiscount: number | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  redirectToAnotherPage() {
    this.router.navigate(['/b-admin']);
  }

  addProduct() 
  {
    if (this.newProductType && this.newProductName && this.newProductMarkUp && this.newProductPrice && this.newProductImg && this.newProductDiscount) 
    {
      this.productService.addProduct(this.newProductType, this.newProductName, this.newProductMarkUp, this.newProductPrice, this.newProductImg, this.newProductDiscount);
    }
  }
}
