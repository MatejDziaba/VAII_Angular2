import { Component } from '@angular/core';
import { UserStateService } from '../../../service/user-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogcomponent',
  templateUrl: './catalogcomponent.component.html',
  styleUrl: './catalogcomponent.component.css'
})
export class CatalogcomponentComponent 
{
  userName: string = 'Prihlás sa';
  userAdmin: string = 'none';

  constructor(private userStateService: UserStateService, private router: Router) {}

  ngOnInit(): void 
  {
    window.scrollTo(0, 140);
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

  redirectToBicykle() 
  {
    if (this.userAdmin === 'customer' || this.userAdmin === 'none') 
    {
      this.router.navigate(['/bicykle']);
    } else 
    {
      this.router.navigate(['/b-admin']);
    }
  }
}
