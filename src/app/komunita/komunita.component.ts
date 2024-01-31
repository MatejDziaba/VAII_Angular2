import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BazarProduct } from '../../Intefaces/bazar-product';
import { Observable, Subscription, switchMap } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { ProductStateService } from '../../service/product-state.service';
import { UserStateService } from '../../service/user-state.service';
import { Komunita } from '../../Intefaces/komunita-prispevok';
import { KomunitaService } from '../../service/komunita.service';
import { KomunitaStateService } from '../../service/komunita-state.service';
import { UserService } from '../../service/user.service';
import { User } from '../../Intefaces/user';

@Component({
  selector: 'app-komunita',
  templateUrl: './komunita.component.html',
  styleUrl: './komunita.component.css'
})
export class KomunitaComponent {
  selectedPrispevok?: Komunita;
  prispevky: Komunita[] = [];
  popisVyberuZoradenia: string = "Výberte si";
  
  MAX_ITEMS_TO_SEE: number = 6;
  actualIndex_To_See: number = 1;
  actualIndex_To_See_page: number = 1;
  actualIndex: number = 0;
  products_To_See: Komunita[] = [];

  pageCount: number = 0;
  pages: number[] = [];

  userName: string = 'Prihlás sa';
  userState: string = 'none';

  private prispevkySubscription: Subscription | undefined;

  constructor(private router: Router, private komunitaService: KomunitaService, private komunitaStateService: KomunitaStateService, private userService: UserService, private userStateService: UserStateService) {}

  ngOnInit(): void 
  {
    window.scrollTo(0, 100);
    this.autorization();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/komunita') {
          window.location.reload();
        }
      }
    });
    this.prispevkySubscription = this.komunitaService.getKomunitaPrispevky().subscribe(prispevky => {
      this.prispevky = prispevky;
      this.setPrispevkyToSee();
      this.setPageCount();
    });

    this.komunitaService.komunitaPrispevkyUpdated.subscribe(updatedProducts => {
      this.prispevky = updatedProducts;
    })

    console.log(this.prispevky);
  } 

  private autorization() 
  {
    let actualUser = this.userStateService.getActualUser();
    if (actualUser !== null) {
      this.userName = actualUser.name;
      if (actualUser.admin == true) {
        this.userState = 'admin';
      }
      else {
        this.userState = 'customer';
      }
    }
  }

  setPrispevkyToSee() 
  {
    let wasBreak = false;
    if (this.products_To_See.length < this.prispevky.length) 
    {
      for (let i = this.actualIndex; i < (this.actualIndex_To_See*this.MAX_ITEMS_TO_SEE); i++) 
      {
        if (i < this.prispevky.length) 
        {
          this.products_To_See.push(this.prispevky[i]);
        } else 
        {
          wasBreak = true;
          break;
        }
      }
    }
    

    if (wasBreak)
      this.actualIndex = this.products_To_See.length - 1;
    else
      this.actualIndex = this.MAX_ITEMS_TO_SEE;
    
  }

  increaseItemsToSee()
  {
    if (this.products_To_See.length < this.prispevky.length && this.actualIndex_To_See < (this.prispevky.length / this.MAX_ITEMS_TO_SEE)) 
    {
      window.scrollTo(0, 1000);
      this.actualIndex_To_See++;
      this.setPrispevkyToSee();
      this.sortProductsByName(this.popisVyberuZoradenia);
    }
    console.log(this.actualIndex_To_See);
  }

  setProductsToSee_Page(page: number) 
  {
    window.scrollTo(0, 120);
    this.products_To_See = [];
    this.actualIndex_To_See = 1;
    let startIndex = (page - 1) * this.MAX_ITEMS_TO_SEE;
    for (let i = startIndex; i < ((page) * this.MAX_ITEMS_TO_SEE ); i++) 
    {
      if (i < this.prispevky.length) 
      {
        if (this.products_To_See.length < this.prispevky.length) 
        {
          this.products_To_See.push(this.prispevky[i]);
        }
      } else 
      {
        break;
      }
    }
  }

  setPageCount() 
  {
    if (this.MAX_ITEMS_TO_SEE != 0) 
    {
      let pomNumberCount = this.prispevky.length / this.MAX_ITEMS_TO_SEE;
      if (Number.isInteger(pomNumberCount))
      {
        this.pageCount = pomNumberCount;
      }
      else if (!Number.isInteger(pomNumberCount) && this.prispevky.length > this.MAX_ITEMS_TO_SEE) 
      {
        this.pageCount = pomNumberCount;
      } else if (!Number.isInteger(pomNumberCount) && this.prispevky.length <= this.MAX_ITEMS_TO_SEE)
      {
        this.pageCount = 1;
      }
    }
    else if (this.MAX_ITEMS_TO_SEE == 0)
      this.pageCount = 0;
    
    for (let i = 0; i < this.pageCount; i++) 
    {
      this.pages.push(i + 1);
    }
  }

  ngOnDestroy(): void {
    // Zrušenie odberu v ngDestroy
    if (this.prispevkySubscription) {
      this.prispevkySubscription.unsubscribe();
    }
  }

  sortProductsByName(str: string) {
    if (str === 'Podľa názvu A-Z') {
      this.products_To_See.sort((a, b) => a.problemName.localeCompare(b.problemName));
      this.popisVyberuZoradenia = 'Podľa názvu A-Z';
    } else if (str === 'Podľa názvu Z-A') {
      this.products_To_See.sort((a, b) => b.problemName.localeCompare(a.problemName));
      this.popisVyberuZoradenia = 'Podľa názvu Z-A';
    }
  }

  setPrispevok(selectedPrispevok: Komunita): void 
  {
    this.selectedPrispevok = selectedPrispevok;
    this.komunitaStateService.setSelectedPrispevok(this.selectedPrispevok);
  }

  getActualUserEmail(): string 
  {
    if (this.userStateService.actualUser) 
    {
      return this.userStateService.actualUser.email;
    } else 
    {
      return "";
    }
  }


}
