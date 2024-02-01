import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { BazarProduct } from '../../../Intefaces/bazar-product';
import { ProductStateService } from '../../../service/product-state.service';

@Component({
  selector: 'app-module-delete-bazar-product',
  templateUrl: './module-delete-bazar-product.component.html',
  styleUrl: './module-delete-bazar-product.component.css'
})
export class ModuleDeleteBazarProductComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/bazar';

  actionSetImg: boolean = true;

  @Input() product: BazarProduct | undefined;

  constructor(private productService: ProductService, private router: Router, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.product = this.productStateService.selectedProduct_bazar;
    //console.log(this.product);
  } 

  ngOnDestroy() 
  {
    this.product;
  }

  deleteProduct(nameProduct: string) 
  {
    if (nameProduct)
    {
        this.productService.deleteBazarProduct(nameProduct);
    }
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
