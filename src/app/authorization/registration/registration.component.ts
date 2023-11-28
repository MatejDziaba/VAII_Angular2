import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent 
{
  routerLinkPath: string = '/';

  constructor(private router: Router, private userService: UserService) {}

   private submitEventListener = (form: HTMLFormElement) => (event: Event) => {
    if ((<HTMLFormElement>event.target).checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  };
  
  ngOnInit(): void {
    console.log(this.userService);
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
    this.router.navigate(['/sign-up']);
  }

  addUser(name: string, surname: string, email: string, 
    city: string, ulica: string, state: string, 
    psc: string, password1: string, password2: string, agreeMarketConditions: boolean) 
  {
    console.log(agreeMarketConditions)
    let succesfullAdded = false;
    if (name && surname && email && city && ulica && state && psc && password1 && password2 && agreeMarketConditions) 
    {
      if (password1 === password2) 
      {
        this.userService.addUser(name, surname, email, city, ulica, state, psc, password1, agreeMarketConditions);
        this.routerLinkPath = '/sign-up';
        succesfullAdded = true;
      }
    }

    if (succesfullAdded) 
    {
      this.redirectToAnotherPage();
    }
  }
}
