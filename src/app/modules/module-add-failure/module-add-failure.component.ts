import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-add-failure',
  templateUrl: './module-add-failure.component.html',
  styleUrl: './module-add-failure.component.css'
})
export class ModuleAddFailureComponent {

  constructor(private router: Router) {}

  redirectToAnotherPage() {
    this.router.navigate(['/b-admin']);
  }
  

}
