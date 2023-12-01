import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { UserStateService } from '../../../service/user-state.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent 
{
  routerLinkPath: string = '/';
  agree: boolean = false;

  constructor(private router: Router, private userService: UserService, private userStateService: UserStateService) {}

   private submitEventListener = (form: HTMLFormElement) => (event: Event) => {
    if ((<HTMLFormElement>event.target).checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  };
  
  ngOnInit(): void {
    console.log(this.userService.getUsers());
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

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }

  redirectToBack() 
  {
    this.router.navigate(['/']);
  }

  setRouterOnSignUp() 
  {
    console.log(this.userStateService.getActualUser());
    if (this.userStateService.getActualUser() === null) 
    {
      this.router.navigate(['/sign-up']);
    } else 
    {
      this.router.navigate(['/log-out']);
    }
    
  }

  addUser(name: string, surname: string, email: string, 
    city: string, ulica: string, state: string, 
    psc: string, password1: string, password2: string, agreeMarketConditions: string) 
  {
    console.log(agreeMarketConditions)
    let succesfullAdded = false;
    if (name && surname && email && city && ulica && state && psc && password1 && password2 && agreeMarketConditions) 
    {
      if (password1 === password2) 
      {
        if (this.agree === true) 
        {
          this.userService.addUser(name, surname, email, city, ulica, state, psc, password1, this.agree);
          this.routerLinkPath = '/sign-up';
          succesfullAdded = true;
        }
      }
    }

    if (succesfullAdded) 
    {
      this.redirectToAnotherPage();
    }
  }

  setAgree(event: any): void 
  {
    if (this.agree === false) 
    {
      console.log('setAgree: true');
      this.agree = true;
    } else 
    {
      console.log('setAgree: false');
      this.agree = false;
    }

  }
}
