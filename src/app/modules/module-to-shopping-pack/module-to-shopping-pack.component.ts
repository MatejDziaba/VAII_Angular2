import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShoppingPackService } from '../../../service/shoping-pack.service';
import { BicykleComponent } from '../../Catalog/Bicykle/bicykle/bicykle.component';
import { BazarComponent } from '../../bazar/bazar.component';
import { SearchComponent } from '../../search/search.component';

@Component({
  selector: 'app-module-to-shopping-pack',
  templateUrl: './module-to-shopping-pack.component.html',
  styleUrl: './module-to-shopping-pack.component.css'
})
export class ModuleToShoppingPackComponent {

  routerLinkPath: string = '/';

  @ViewChild('ACTUALSITE', { read: ViewContainerRef }) actualWebSiteContainer!: ViewContainerRef;
  actualWebSite!: ComponentRef<any>;

  constructor(private router: Router, private shoppingPackService: ShoppingPackService, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void 
  {
    this.setActualSite();
  } 

  setActualSite()
  {
    if (this.shoppingPackService.getActualWebsiteLink() === "/bicykle") 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(BicykleComponent);
        this.actualWebSiteContainer.clear();
        this.actualWebSite = this.actualWebSiteContainer.createComponent(factory);
      });
    } else if (this.shoppingPackService.getActualWebsiteLink() === "/bazar") 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(BazarComponent);
        this.actualWebSiteContainer.clear();
        this.actualWebSite = this.actualWebSiteContainer.createComponent(factory);
      });
    } else if (this.shoppingPackService.getActualWebsiteLink() === "/search") 
    {
      setTimeout(() => {
        const factory = this.resolver.resolveComponentFactory(SearchComponent);
        this.actualWebSiteContainer.clear();
        this.actualWebSite = this.actualWebSiteContainer.createComponent(factory);
      });
    }
  }

  ngOnDestroy() 
  {
  }

  setRouterLink(link: string) 
  {
    this.routerLinkPath = link;
  }
  
  redirectToActualSite() {
    this.router.navigate([this.shoppingPackService.getActualWebsiteLink()]);
  }
  
  redirectToAnotherPage(link: string) {
    this.router.navigate([link]);
  }
}
