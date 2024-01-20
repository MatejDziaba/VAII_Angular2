import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import { Product, TYPEPRODUCT } from '../Intefaces/product';
import { PRODUCTS } from '../Intefaces/mock-product';
import { BazarProduct } from '../Intefaces/bazar-product';
import { Komunita } from '../Intefaces/komunita-prispevok';

@Injectable({
  providedIn: 'root',
})
export class KomunitaService {

    private storageKey = 'komunitaPrispevky';
    komunitaPrispevkyUpdated = new EventEmitter<Komunita[]>();


    storedKomunitaPrispevky = localStorage.getItem(this.storageKey);
    prispevky =  this.storedKomunitaPrispevky ? JSON.parse(this.storedKomunitaPrispevky) : undefined;

    constructor(private http: HttpClient) {}

    getKomunitaPrispevky(): Observable<Komunita[]> 
    {
        this.storedKomunitaPrispevky = localStorage.getItem(this.storageKey);
        this.prispevky = this.storedKomunitaPrispevky ? JSON.parse(this.storedKomunitaPrispevky) : undefined;
        return this.http.get<Komunita[]>("http://localhost:3008/komunita");
    }

    ngOnDestroy() 
    {
        this.komunitaPrispevkyUpdated;
    }

    addPrispevok(problemName: string, info: string, img: string, email: string) 
    {
      axios.post<Komunita>("http://localhost:3008/module-add-komunita", { problemName, info, img, email })
      .then(response => {
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

    uploadProduct(_id: number, problemName: string, info: string, img: string, email: string) {
        console.log(_id, problemName);
        axios.post("http://localhost:3008/module-upload-komunita", { _id, problemName, info, img, email });
    }

    deletePrispevok(problemName: string): void {
        console.log(problemName);
        axios.post("http://localhost:3008/module-delete-komunita", { problemName });
        //window.location.reload();
    }
}
