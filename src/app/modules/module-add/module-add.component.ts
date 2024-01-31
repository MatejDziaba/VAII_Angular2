import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product, TYPEPRODUCT } from '../../../Intefaces/product';
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

  selectedValue: string = "mock_value";

  typeOfProducts = [
    { value: TYPEPRODUCT.Bicycle },
    { value: TYPEPRODUCT.HorskyBicycle},
    { value: TYPEPRODUCT.ElectroBicycle },
    { value: TYPEPRODUCT.CestnyBicycle },
    { value: TYPEPRODUCT.KrosovyBicycle },
    { value: TYPEPRODUCT.MestkyBicycle },
    { value: TYPEPRODUCT.TrekingBicycle },
    { value: TYPEPRODUCT.GravelCyklotrosBicycle },
    { value: TYPEPRODUCT.DetskyBicycle },
    { value: TYPEPRODUCT.DirtBMXBicycle }
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
    if (typProduct === TYPEPRODUCT.HorskyBicycle) {
      this.pomTypProduct = TYPEPRODUCT.HorskyBicycle;
    }
    if (typProduct === TYPEPRODUCT.CestnyBicycle) {
      this.pomTypProduct = TYPEPRODUCT.CestnyBicycle;
    }
    if (typProduct === TYPEPRODUCT.KrosovyBicycle) {
      this.pomTypProduct = TYPEPRODUCT.KrosovyBicycle;
    }
    if (typProduct === TYPEPRODUCT.MestkyBicycle) {
      this.pomTypProduct = TYPEPRODUCT.MestkyBicycle;
    }
    if (typProduct === TYPEPRODUCT.TrekingBicycle) {
      this.pomTypProduct = TYPEPRODUCT.TrekingBicycle;
    }
    if (typProduct === TYPEPRODUCT.GravelCyklotrosBicycle) {
      this.pomTypProduct = TYPEPRODUCT.GravelCyklotrosBicycle;
    }
    if (typProduct === TYPEPRODUCT.DetskyBicycle) {
      this.pomTypProduct = TYPEPRODUCT.DetskyBicycle;
    }
    if (typProduct === TYPEPRODUCT.DirtBMXBicycle) {
      this.pomTypProduct = TYPEPRODUCT.DirtBMXBicycle;
    }
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
  
}
