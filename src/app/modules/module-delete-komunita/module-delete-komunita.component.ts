import { Component, Input } from '@angular/core';
import { Komunita } from '../../../Intefaces/komunita-prispevok';
import { KomunitaService } from '../../../service/komunita.service';
import { Router } from '@angular/router';
import { KomunitaStateService } from '../../../service/komunita-state.service';

@Component({
  selector: 'app-module-delete-komunita',
  templateUrl: './module-delete-komunita.component.html',
  styleUrl: './module-delete-komunita.component.css'
})
export class ModuleDeleteKomunitaComponent {
  newProductImg: string | undefined;
  routerLinkPath: string = '/komunita';

  actionSetImg: boolean = true;

  @Input() prispevok: Komunita | undefined;

  constructor(private komunitaService: KomunitaService, private router: Router, private komunitaStateService: KomunitaStateService) {}

  ngOnInit(): void 
  {
    this.prispevok = this.komunitaStateService.selectedPrispevok;
    //console.log(this.product);
  } 

  ngOnDestroy() 
  {
    this.prispevok;
  }

  deletePrispevok(problemName: string) 
  {
    let succesModify = false;
    if (problemName)
    {
      this.komunitaService.deletePrispevok(problemName);
      this.routerLinkPath = '/komunita';
      succesModify = true;
    }

    setTimeout(() => {
      if (succesModify) 
      {
        this.redirectToAnotherPage();
      }
    }, 3000);
  }

  redirectToAnotherPage() {
    this.router.navigate([this.routerLinkPath]);
  }
}
