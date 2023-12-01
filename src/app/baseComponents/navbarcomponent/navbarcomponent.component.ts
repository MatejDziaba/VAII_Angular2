import { Component } from '@angular/core';
import { UserStateService } from '../../../service/user-state.service';

@Component({
  selector: 'app-navbarcomponent',
  templateUrl: './navbarcomponent.component.html',
  styleUrl: './navbarcomponent.component.css'
})
export class NavbarcomponentComponent 
{
  userName: string = 'Prihlás sa';
  userAdmin: string = 'none';

  constructor(private userStateService: UserStateService) {}

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
}
