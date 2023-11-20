import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-upload',
  templateUrl: './module-upload.component.html',
  styleUrl: './module-upload.component.css'
})
export class ModuleUploadComponent {
  constructor(private router: Router) {}

  redirectToAnotherPage() {
    this.router.navigate(['/b-admin']);
  }
}
