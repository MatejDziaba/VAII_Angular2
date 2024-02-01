import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Product, TYPEPRODUCT } from '../Intefaces/product';
import { PRODUCTS } from '../Intefaces/mock-product';
import { BazarProduct } from '../Intefaces/bazar-product';
import { KomunitaData } from '../Intefaces/komunita-prispevok';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class KomunitaService {

    private storageKey = 'komunitaPrispevky';
    komunitaPrispevkyUpdated = new EventEmitter<KomunitaData[]>();


    storedKomunitaPrispevky = localStorage.getItem(this.storageKey);
    prispevky =  this.storedKomunitaPrispevky ? JSON.parse(this.storedKomunitaPrispevky) : undefined;

    constructor(private http: HttpClient, private router: Router) {}

    getKomunitaPrispevky(): Observable<KomunitaData[]> 
    {
        this.storedKomunitaPrispevky = localStorage.getItem(this.storageKey);
        this.prispevky = this.storedKomunitaPrispevky ? JSON.parse(this.storedKomunitaPrispevky) : undefined;
        return this.http.get<KomunitaData[]>("http://localhost:3008/komunita");
    }

    ngOnDestroy() 
    {
        this.komunitaPrispevkyUpdated;
    }

    addPrispevok(problemName: string, info: string, img: string, email: string) 
    {
      axios.post<KomunitaData>("http://localhost:3008/module-add-komunita", { problemName, info, img, email })
      .then(response => {
        this.router.navigate(['/komunita']);
        console.log(response.data); 
      })
      .catch(error => {
        if (error.response && error.response.status === 400) 
        {
          const errorMessage = 'Error: Prispevok s rovnakym menom existuje.';
          const userAcknowledged = window.confirm(errorMessage);
        } else 
        {
          const errorMessage = 'Error: Unable to add the product.';
          const userAcknowledged = window.confirm(errorMessage);
          console.error(error); 
        }
      });
    }

    uploadPrispevok(_id: number, problemName: string, info: string, img: string, email: string) {
        console.log(_id, problemName);
        axios.post("http://localhost:3008/module-upload-komunita", { _id, problemName, info, img, email })
        .then(response => {
          this.router.navigate(['/komunita']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400) 
          {
            const errorMessage = 'Error: Prispevok s rovnakym menom neexistuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to upload the product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
    }

    deletePrispevok(problemName: string): void {
        console.log(problemName);
        axios.post("http://localhost:3008/module-delete-komunita", { problemName })
        .then(response => {
          this.router.navigate(['/komunita']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400) 
          {
            const errorMessage = 'Error: Prispevok s rovnakym menom neexistuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to delete the product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
    }
}
