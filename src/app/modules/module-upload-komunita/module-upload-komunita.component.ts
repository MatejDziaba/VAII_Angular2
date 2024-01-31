import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Komunita } from '../../../Intefaces/komunita-prispevok';
import { KomunitaService } from '../../../service/komunita.service';
import { Router } from '@angular/router';
import { KomunitaStateService } from '../../../service/komunita-state.service';
import { UserStateService } from '../../../service/user-state.service';

@Component({
  selector: 'app-module-upload-komunita',
  templateUrl: './module-upload-komunita.component.html',
  styleUrl: './module-upload-komunita.component.css'
})
export class ModuleUploadKomunitaComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/komunita';

  actionSetImg: boolean = true;
  
  @Input() prispevok: Komunita | undefined;

  constructor(private prispevokService: KomunitaService, private router: Router, private prispevokStateService: KomunitaStateService, private userServiceState: UserStateService) {}

  ngOnInit(): void 
  {
    this.prispevok = this.prispevokStateService.selectedPrispevok;
    console.log(this.prispevok);
  } 

  ngOnDestroy(): void 
  {
    this.prispevok;
  }

  onFileSelected(event: any): void {
    const file: File | undefined = event?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.newProductImg = e.target.result;
        this.actionSetImg = false;
      };

      reader.readAsDataURL(file);
    }
  }

  uploadPrispevok(_id: number, problemName: string, info: string, img:string) 
  {
    let succesModify = false;
    let errorMessage = "";

    if (this.actionSetImg) 
    {
      this.newProductImg = img;
    }
    let user = this.userServiceState.getActualUser();
    let email = "";
    if (user) 
    {
      email = user.email;
    }
    
    if (problemName && this.newProductImg && info && email) 
    {
      this.prispevokService.uploadPrispevok(_id, problemName, info, this.newProductImg, email);
      succesModify = true;
    } else {
      errorMessage = "Please fill in all required fields.";
    }

    if (succesModify) 
    {
      this.router.navigate(['/komunita']);
    } else 
    {
      alert("Please fill in all required fields."); // You can also update an HTML element with the error message.
    }
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
