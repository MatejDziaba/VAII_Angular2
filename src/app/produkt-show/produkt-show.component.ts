import { Component, ComponentRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ProductStateService } from '../../service/product-state.service';
import { Product } from '../../Intefaces/product';
import { FootercomponentComponent } from '../baseComponents/footercomponent/footercomponent.component';
import { ProduktShowDescriptionComponent } from './produkt-show-description/produkt-show-description.component';
import { ProduktShowTableSizeComponent } from './produkt-show-table-size/produkt-show-table-size.component';
import { ProduktShowExpeditionComponent } from './produkt-show-expedition/produkt-show-expedition.component';
import { ShoppingPackService } from '../../service/shoping-pack.service';

@Component({
  selector: 'app-produkt-show',
  templateUrl: './produkt-show.component.html',
  styleUrls: ['./produkt-show.component.css']
})
export class ProduktShowComponent {
  selectedProduct: Product | undefined;

  @ViewChild('DESCRIPTION', { read: ViewContainerRef }) descriptionContainer!: ViewContainerRef;
  description!: ComponentRef<any>;
  popis: string = "popis";

  constructor(private userStateService: ProductStateService, private shoppingPackService: ShoppingPackService, private resolver: ComponentFactoryResolver) {
    this.selectedProduct = this.getSelectedProduct();
    
  }

  ngOnInit() 
  {
    window.scrollTo(0, 100);
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
      this.popis = "popis";
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(ProduktShowDescriptionComponent);
        this.descriptionContainer.clear();
        this.description = this.descriptionContainer.createComponent(factory);
      });
    } else if (popis === "velkost") 
    {
      this.popis = "velkost";
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(ProduktShowTableSizeComponent);
        this.descriptionContainer.clear();
        this.description = this.descriptionContainer.createComponent(factory);
      });
    } else if (popis === "expedicia") 
    {
      this.popis = "expedicia";
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
  
  sendProductAndWebsiteLinkToShoppingPackService(link: string) 
  {
    this.shoppingPackService.setActualWebsiteLink(link);
    this.shoppingPackService.addProduct(this.selectedProduct!);
  }
}
