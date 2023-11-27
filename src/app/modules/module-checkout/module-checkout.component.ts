import { Component } from '@angular/core';

@Component({
  selector: 'app-module-checkout',
  templateUrl: './module-checkout.component.html',
  styleUrls: ['./module-checkout.component.css']
})
export class ModuleCheckoutComponent {

  constructor() {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    'use strict';

    window.addEventListener('load', () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, (form: HTMLFormElement) => {
        form.addEventListener('submit', (event: Event) => {
          if ((<HTMLFormElement>event.target).checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  }
}
