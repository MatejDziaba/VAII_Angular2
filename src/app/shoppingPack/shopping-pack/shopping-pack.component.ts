import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingPackService } from '../../../service/shoping-pack.service';
import { EmptyComponent } from '../empty/empty.component';
import { NotEmptyComponent } from '../not-empty/not-empty.component';

@Component({
  selector: 'app-shopping-pack',
  templateUrl: './shopping-pack.component.html',
  styleUrl: './shopping-pack.component.css'
})
export class ShoppingPackComponent 
{

  @ViewChild('SHOPPINGPACKVIEW', { read: ViewContainerRef }) shoppingPackViewContainer!: ViewContainerRef;
  view!: ComponentRef<any>;

  constructor(private shoppingPackService: ShoppingPackService, private resolver: ComponentFactoryResolver) {}

  ngOnInit() 
  {
    this.setView();
  }

  setView()
  {
    if (this.shoppingPackService.getProducts().length == 0) 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(EmptyComponent);
        this.shoppingPackViewContainer.clear();
        this.view = this.shoppingPackViewContainer.createComponent(factory);
      });
    } else if (this.shoppingPackService.getProducts().length > 0) 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(NotEmptyComponent);
        this.shoppingPackViewContainer.clear();
        this.view = this.shoppingPackViewContainer.createComponent(factory);
      });
    }
  }
}
