import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../Intefaces/user';
import { UserService } from '../../../service/user.service';
import { UserStateService } from '../../../service/user-state.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent 
{

  constructor(private router: Router, private userService: UserService, private userStateService: UserStateService) {}

   private submitEventListener = (form: HTMLFormElement) => (event: Event) => {
    if ((<HTMLFormElement>event.target).checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  };
  
  ngOnInit(): void 
  {
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
    this.router.navigate(['/sign-up']);
  }

  redirectToBack() 
  {
    this.router.navigate(['/']);
  }

  signUpUser(email: string, password: string) {
    let userWasFound = false;
    if (this.userStateService.getActualUser() === null) {
      const subscription = this.userService.getUsers().subscribe({
        next: (users: User[]) => {
          users.forEach((user: User) => {
            if (user.email === email && user.password === password) {
              userWasFound = true;
              user.isActive = true;
              this.userStateService.setActualUser(user);
              console.log('signUpUser: ', user.name);
              this.userService.uploadUserState(user.id, user.name, user.surname, user.email,
                user.city, user.ulica, user.state, user.psc,
                user.password, user.agreeMarketConditions, user.admin, true);
              console.log('user state: ', this.userStateService.userActiveState);
              this.router.navigate(['/']);
            }
          });

          // Po dokončení iterácie
          if (!userWasFound) {
            // Vypísať okno alebo vyvolať inú akciu, pretože používateľ nebol nájdený
            console.log('Dany uzivatel neexistuje!');
            this.userService.setUserInformationHeader("Prihlásenie bolo neúspešné");
            this.userService.setUserInformationResult("Daný užívateľ neexistuje!");
            this.router.navigate(['/sign-up-failure']);
          }
        },
        error: (error: any) => {
          console.error('Chyba pri získavaní používateľov:', error);
          // Riešte chybu podľa potreby
        },
        complete: () => {
          // Vykona sa niečo, keď sa observable dokončí, ak je to potrebné
        }
      });
    } else {
      console.log('Už ste prihlásený: ', this.userStateService.actualUser);
    }
}



  routerToRegistration() 
  {
    this.router.navigate(['/registration']);
  }

}
