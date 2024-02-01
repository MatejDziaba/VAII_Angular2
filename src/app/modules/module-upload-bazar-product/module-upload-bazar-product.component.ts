import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { ProductStateService } from '../../../service/product-state.service';
import { BazarProduct } from '../../../Intefaces/bazar-product';

@Component({
  selector: 'app-module-upload-bazar-product',
  templateUrl: './module-upload-bazar-product.component.html',
  styleUrl: './module-upload-bazar-product.component.css'
})
export class ModuleUploadBazarProductComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/bazar';

  actionSetImg: boolean = true;
  
  @Input() product: BazarProduct | undefined;

  constructor(private productService: ProductService, private router: Router, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.product = this.productStateService.selectedProduct_bazar
    console.log(this.product);
  } 

  ngOnDestroy(): void 
  {
    this.product;
  }

  onFileSelected(event: any): void {
    const file: File | undefined = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.newProductImg = e.target.result;
        this.actionSetImg = false;
      };

      reader.readAsDataURL(file);
    }
  }

  uploadProduct(id: number, nameProduct: string, priceProduct: string, imgProduct: string, infoProduct: string) 
  {
    let errorMessage = "";
    if (this.actionSetImg) 
    {
      this.newProductImg = imgProduct;
    }
    if (nameProduct && priceProduct && this.newProductImg && infoProduct) 
    {
      this.productService.uploadBazarProduct(id, nameProduct, parseInt(priceProduct), this.newProductImg, infoProduct);
    } else {
      errorMessage = "Please fill in all required fields.";
    }
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
