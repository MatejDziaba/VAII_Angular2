import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, TYPEPRODUCT } from '../../../product';
import { ProductService } from '../../../service/product.service';


@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrl: './module-add.component.css'
  
})
export class ModuleAddComponent {

  newProductImg: string | undefined;
  routerLinkPath: string = '/b-admin';
  pomTypProduct: TYPEPRODUCT = TYPEPRODUCT.Bicycle;

  selectedValue: string = "bla";

  typeOfProducts = [
    { value: TYPEPRODUCT.Bicycle },
    { value: TYPEPRODUCT.ElectroBicycle }
  ];

  @Input() product: Product = {
    id: 100,
    type: TYPEPRODUCT.Bicycle,
    nameProduct: "this.newProductName",
    markUp: "this.newProductMarkUp",
    price: 0,
    img: "this.newProductImg",
    discount: 0
  };

  constructor(private productService: ProductService, private router: Router) {}

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
  } 

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.newProductImg = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  addProduct(typProduct: string, nameProduct: string, markUpProduct: string, priceProduct: string, discountProduct: string) 
  {
    let succesfullAdded = false;
    if (typProduct && nameProduct && markUpProduct && priceProduct && this.newProductImg && discountProduct) 
    {
      this.setTypeProduct(typProduct);
      this.productService.addProduct(this.pomTypProduct, nameProduct, markUpProduct, (parseInt(priceProduct) - (parseInt(priceProduct)*(parseInt(discountProduct)/100))), this.newProductImg, parseInt(discountProduct));
      this.routerLinkPath = '/b-admin';
      succesfullAdded = true;
    }

    if (succesfullAdded) 
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
