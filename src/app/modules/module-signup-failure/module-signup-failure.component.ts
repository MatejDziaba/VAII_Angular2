import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-module-signup-failure',
  templateUrl: './module-signup-failure.component.html',
  styleUrl: './module-signup-failure.component.css'
})
export class ModuleSignupFailureComponent {
  constructor(private router: Router, private userService: UserService) {}

  redirectToAnotherPage() {
    this.router.navigate(['/sign-up']);
  }

  getInfoHeader(): string 
  {
    return this.userService.getUserInformationHeader();
  }

  getInfoResult(): string
  {
    return this.userService.getUserInformationResult();
  }
}
