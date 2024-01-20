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
  
  maxItems_To_See: number = 6;
  actualIndex_To_See: number = 1;
  actualIndex_To_See_page: number = 1;
  actualIndex: number = 0;
  products_To_See: Komunita[] = [];

  pageCount: number = 0;
  pages: number[] = [];

  userName: string = 'Prihlás sa';
  userAdmin: string = 'none';

  private prispevkySubscription: Subscription | undefined;

  constructor(private router: Router, private komunitaService: KomunitaService, private komunitaStateService: KomunitaStateService, private userService: UserService, private userStateService: UserStateService) {}

  ngOnInit(): void 
  {
    this.autorization();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/bazar') {
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
        this.userAdmin = 'admin';
      }
      else {
        this.userAdmin = 'customer';
      }
    }
  }

  setPrispevkyToSee() 
  {
    let wasBreak = false;
    if (this.products_To_See.length < this.prispevky.length) 
    {
      for (let i = this.actualIndex; i < (this.actualIndex_To_See*this.maxItems_To_See); i++) 
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
      this.actualIndex = this.maxItems_To_See;
    
  }

  increaseItemsToSee()
  {
    this.actualIndex_To_See++;
    this.setPrispevkyToSee();
    console.log(this.products_To_See);
    this.sortProductsByName(this.popisVyberuZoradenia);
  }

  setProductsToSee_Page(page: number) 
  {
    this.products_To_See = [];
    this.actualIndex_To_See = 1;
    let startIndex = (page - 1) * this.maxItems_To_See;
    for (let i = startIndex; i < ((page) * this.maxItems_To_See ); i++) 
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
    this.pageCount = this.prispevky.length % this.maxItems_To_See;
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
