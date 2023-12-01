import { Component } from '@angular/core';
import { UserStateService } from '../../../service/user-state.service'; 
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent 
{
  userName = this.userStateService.actualUser?.name;

  constructor(private userStateService: UserStateService, private userService: UserService, private router: Router) {}
  
  logOutUser() 
  {
    let actualUser = this.userStateService.getActualUser();
    if (actualUser) 
    {
      this.userStateService.removeActualUser();
      this.userService.uploadUserState(actualUser.id, actualUser.name, actualUser.surname, actualUser.email,
                                      actualUser.city, actualUser.ulica, actualUser.state, actualUser.psc, 
                                      actualUser.password, actualUser.agreeMarketConditions,actualUser.admin, false);
      console.log('user state: ', this.userStateService.userActiveState);
    
    } else 
    {
      console.log('nemozete sa odhlasit lebo nie je prihlaseny ziadny uzivatel!');
    }

    this.redirectToBack();
  }

  redirectToBack() 
  {
    this.router.navigate(['/']);
  }

}
