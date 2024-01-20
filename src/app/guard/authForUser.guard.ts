import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';
import { UserStateService } from '../../service/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard_FOR_USER implements CanActivate {

  constructor(private userService: UserService, private userStateService: UserStateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
        if (this.userStateService.getActualUser()?.admin == false) 
        {
            return true;
        } else 
        {
            this.router.navigate(['/registration']);
            return false;
        }
    }
}
