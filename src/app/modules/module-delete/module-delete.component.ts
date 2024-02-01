import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, TYPEPRODUCT } from '../../../Intefaces/product';
import { ProductService } from '../../../service/product.service';
import { ProductStateService } from '../../../service/product-state.service';

@Component({
  selector: 'app-module-delete',
  templateUrl: './module-delete.component.html',
  styleUrl: './module-delete.component.css'
})
export class ModuleDeleteComponent 
{
  newProductImg: string | undefined;
  routerLinkPath: string = '/b-admin';

  actionSetImg: boolean = true;

  @Input() product: Product | undefined;

  constructor(private productService: ProductService, private router: Router, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.product = this.productStateService.selectedProduct;
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
        this.productService.deleteProduct(nameProduct);
    }
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
