import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, TYPEPRODUCT } from '../../../Intefaces/product';
import { ProductService } from '../../../service/product.service';
import { ProductStateService } from '../../../service/product-state.service';

@Component({
  selector: 'app-module-upload',
  templateUrl: './module-upload.component.html',
  styleUrl: './module-upload.component.css'
})
export class ModuleUploadComponent 
{
  newProductImg: string | undefined;
  routerLinkPath: string = '/b-admin';
  pomTypProduct: TYPEPRODUCT = TYPEPRODUCT.Bicycle;

  actionSetImg: boolean = true;

  typeOfProducts = [
    { value: TYPEPRODUCT.Bicycle },
    { value: TYPEPRODUCT.ElectroBicycle }
  ];

  @Input() product: Product | undefined;

  constructor(private productService: ProductService, private router: Router, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
    this.product = this.productStateService.selectedProduct;
    //console.log(this.product);
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

  uploadProduct(id: number, typProduct: string, nameProduct: string, markUpProduct: string, priceProduct: string, imgProduct: string, discountProduct: string) 
  {
    let succesModify = false;
    if (this.actionSetImg) 
    {
      this.newProductImg = imgProduct;
    }
    if (typProduct && nameProduct && markUpProduct && priceProduct && this.newProductImg && discountProduct) 
    {
      this.setTypeProduct(typProduct);
      this.productService.uploadProduct(id, this.pomTypProduct, nameProduct, markUpProduct, (parseInt(priceProduct) - (parseInt(priceProduct)*(parseInt(discountProduct)/100))), this.newProductImg, parseInt(discountProduct));
      succesModify = true;
    }

    if (succesModify) 
    {
      this.redirectToAnotherPage();
    }
  }

  private setTypeProduct(typProduct: string) {
    if (typProduct === TYPEPRODUCT.Bicycle) {
      this.pomTypProduct = TYPEPRODUCT.Bicycle;
    }
    if (typProduct === TYPEPRODUCT.ElectroBicycle) {
      this.pomTypProduct = TYPEPRODUCT.ElectroBicycle;
    }
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
