import { Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ProductStateService } from '../../service/product-state.service';
import { Product } from '../../Intefaces/product';
import { FootercomponentComponent } from '../baseComponents/footercomponent/footercomponent.component';
import { ProduktShowDescriptionComponent } from './produkt-show-description/produkt-show-description.component';
import { ProduktShowTableSizeComponent } from './produkt-show-table-size/produkt-show-table-size.component';
import { ProduktShowExpeditionComponent } from './produkt-show-expedition/produkt-show-expedition.component';

@Component({
  selector: 'app-produkt-show',
  templateUrl: './produkt-show.component.html',
  styleUrls: ['./produkt-show.component.css']
})
export class ProduktShowComponent {
  selectedProduct: Product | undefined;

  @ViewChild('DESCRIPTION', { read: ViewContainerRef }) descriptionContainer!: ViewContainerRef;
  description!: ComponentRef<any>;

  constructor(private userStateService: ProductStateService, private resolver: ComponentFactoryResolver) {
    this.selectedProduct = this.getSelectedProduct();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const factory = this.resolver.resolveComponentFactory(ProduktShowDescriptionComponent);
      this.description = this.descriptionContainer.createComponent(factory);
    });
  }

  setDescription(popis: String)
  {
    if (popis === "popis") 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(ProduktShowDescriptionComponent);
        this.descriptionContainer.clear();
        this.description = this.descriptionContainer.createComponent(factory);
      });
    } else if (popis === "velkost") 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(ProduktShowTableSizeComponent);
        this.descriptionContainer.clear();
        this.description = this.descriptionContainer.createComponent(factory);
      });
    } else if (popis === "expedicia") 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(ProduktShowExpeditionComponent);
        this.descriptionContainer.clear();
        this.description = this.descriptionContainer.createComponent(factory);
      });
    }
    else 
    {
      console.log("Chyba vyberu!: produktShow.ts a produktShow.html");
    }
  }

  ngOnDestroy() {
    if (this.description) {
      this.description.destroy();
    }
  }

  getDiscountPrice() {
    if (this.selectedProduct) {
      return ((this.selectedProduct.price) * (this.selectedProduct.discount / 100) + this.selectedProduct.price).toFixed(2);
    }
    return "";
  }

  getSelectedProduct(): Product | undefined {
    return this.userStateService.getSelectedProduct();
  }
}
