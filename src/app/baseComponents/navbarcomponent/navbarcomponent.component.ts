import { Component } from '@angular/core';
import { UserStateService } from '../../../service/user-state.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-navbarcomponent',
  templateUrl: './navbarcomponent.component.html',
  styleUrl: './navbarcomponent.component.css'
})
export class NavbarcomponentComponent 
{
  userName: string = 'Prihlás sa';
  userAdmin: string = 'none';

  constructor(private userStateService: UserStateService, private productService: ProductService) {}

  ngOnInit(): void 
  {
    this.autorization();
  }

  private autorization() 
  {
    let actualUser = this.userStateService.getActualUser();
    if (actualUser !== null) {
      this.userName = actualUser.name;
      if (actualUser.admin == true) {
        this.userAdmin = 'admin';
      }
      else {
        this.userAdmin = 'customer';
      }
    }
  }

  setSearchTerm(term: String) 
  {
    if (this.productService.getSearchTerm() == "") 
    {
      this.productService.setSearchTerm(term);
      this.productService.setRefreshSeachSite_false();
    }
    else 
    {
      this.productService.setSearchTerm(term);
      this.productService.setRefreshSeachSite_true();
    }
  }

}
