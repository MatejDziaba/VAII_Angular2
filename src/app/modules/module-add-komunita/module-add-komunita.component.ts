import { Component, Input } from '@angular/core';
import { Komunita } from '../../../Intefaces/komunita-prispevok';
import { Router } from '@angular/router';
import { KomunitaService } from '../../../service/komunita.service';
import { UserStateService } from '../../../service/user-state.service';


@Component({
  selector: 'app-module-add-komunita',
  templateUrl: './module-add-komunita.component.html',
  styleUrl: './module-add-komunita.component.css'
})
export class ModuleAddKomunitaComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/komunita';

  selectedValue: string = "mock_value";


  @Input() bazarProduct: Komunita = {
    id: 100,
    problemName: "this.newProductName",
    info: 0,
    img: "this.newProductImg",
    email: "bla"
  };

  constructor(private komunitaService: KomunitaService, private userStateService: UserStateService, private router: Router) {}

  private submitEventListener = (form: HTMLFormElement) => (event: Event) => {
    if ((<HTMLFormElement>event.target).checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  };
  
  ngOnInit(): void {
    console.log(this.userStateService.getActualUser());
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.newProductImg = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  addPrispevok(problemName: string, info: string) 
  {
    let succesfullAdded = false;
    console.log(this.userStateService.getActualUser());
    if (problemName && info && this.newProductImg && this.userStateService.getActualUser()) 
    {
      this.komunitaService.addPrispevok(problemName, info, this.newProductImg, this.userStateService.getActualUser()!.email);
      this.routerLinkPath = '/komunita';
      succesfullAdded = true;
    }

    if (succesfullAdded) 
    {
      this.redirectToAnotherPage();
    }
  }


  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
