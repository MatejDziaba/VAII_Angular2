import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, TYPEPRODUCT } from '../../../product';
import { ProductService } from '../../../service/product.service';
import { ProductStateService } from '../../product-state.service';

@Component({
  selector: 'app-module-upload',
  templateUrl: './module-upload.component.html',
  styleUrl: './module-upload.component.css'
})
export class ModuleUploadComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/b-admin';
  pomTypProduct: TYPEPRODUCT = TYPEPRODUCT.Bicycle;

  actionSetImg: boolean = true;

  //selectedValue: string = "bla";

  typeOfProducts = [
    { value: TYPEPRODUCT.Bicycle },
    { value: TYPEPRODUCT.ElectroBicycle }
  ];

  @Input() product: Product | undefined;

  // @Input() product: Product | undefined;

  constructor(private productService: ProductService, private router: Router, private productStateService: ProductStateService) {}

  ngOnInit(): void 
  {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, (form: HTMLFormElement) => {
        form.addEventListener('submit', (event: Event) => {
          if ((<HTMLFormElement>event.target).checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });

    this.product = this.productStateService.selectedProduct;

    console.log(this.product);
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
    console.log(id, typProduct, nameProduct, markUpProduct, this.newProductImg, priceProduct, discountProduct);
    if (typProduct && nameProduct && markUpProduct && priceProduct && this.newProductImg && discountProduct) 
    {
      this.setTypeProduct(typProduct);
      console.log("module-upload-component.ts succesModify is true")
      this.productService.uploadProduct(id, this.pomTypProduct, nameProduct, markUpProduct, (parseInt(priceProduct) - (parseInt(priceProduct)*(parseInt(discountProduct)/100))), this.newProductImg, parseInt(discountProduct));
      this.routerLinkPath = '/b-admin';
      succesModify = true;
    }

    if (succesModify) 
    {
      console.log("module-upload-component.ts succesModify is true")
      this.redirectToAnotherPage();
    }

    console.log("Pomoc")
  }

  private setTypeProduct(typProduct: string) {
    if (typProduct === TYPEPRODUCT.Bicycle) {
      this.pomTypProduct = TYPEPRODUCT.Bicycle;
    }
    if (typProduct === TYPEPRODUCT.ElectroBicycle) {
      this.pomTypProduct = TYPEPRODUCT.ElectroBicycle;
    }
  }

  setProducts() 
  {
    this.product = this.productStateService.selectedProduct;
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}