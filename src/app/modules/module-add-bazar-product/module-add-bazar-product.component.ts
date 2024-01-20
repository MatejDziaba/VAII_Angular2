import { Component, Input } from '@angular/core';
import { BazarProduct } from '../../../Intefaces/bazar-product';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-add-bazar-product',
  templateUrl: './module-add-bazar-product.component.html',
  styleUrl: './module-add-bazar-product.component.css'
})
export class ModuleAddBazarProductComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/bazar';

  selectedValue: string = "mock_value";


  @Input() bazarProduct: BazarProduct = {
    id: 100,
    nameProduct: "this.newProductName",
    price: 0,
    img: "this.newProductImg",
    infoProduct: "bla"
  };

  constructor(private productService: ProductService, private router: Router) {}

  private submitEventListener = (form: HTMLFormElement) => (event: Event) => {
    if ((<HTMLFormElement>event.target).checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  };
  
  ngOnInit(): void {
    // Loop over them and prevent submission
    Array.prototype.filter.call(document.getElementsByClassName('needs-validation'), (form: HTMLFormElement) => {
      form.addEventListener('submit', this.submitEventListener(form), false);
    });
  }

  ngOnDestroy(): void {
    // Odstránenie event listeneru
    Array.prototype.filter.call(document.getElementsByClassName('needs-validation'), (form: HTMLFormElement) => {
      form.removeEventListener('submit', this.submitEventListener(form), false);
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

  addProduct(nameProduct: string, priceProduct: string, infoProduct: string) 
  {
    let succesfullAdded = false;
    if (nameProduct && priceProduct && this.newProductImg && infoProduct) 
    {
      this.productService.addBazarProduct(nameProduct, parseInt(priceProduct), this.newProductImg, infoProduct);
      this.routerLinkPath = '/bazar';
      succesfullAdded = true;
    }

    if (succesfullAdded) 
    {
      this.redirectToAnotherPage();
    }
  }


  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
