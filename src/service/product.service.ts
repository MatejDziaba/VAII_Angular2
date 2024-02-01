import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs';
import axios from 'axios';
import { Product, TYPEPRODUCT } from '../Intefaces/product';
import { PRODUCTS } from '../Intefaces/mock-product';
import { BazarProduct } from '../Intefaces/bazar-product';
import { UserStateService } from './user-state.service';
import { ImgTypeData } from '../Intefaces/imgTypeData';
import { Router } from '@angular/router';

type StringType = {
  id_: string;
  type: string;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {

    private storageKey = 'products';
    private storageKey_bazar = 'bazarProducts';
    private storageKey_images = 'images';
    private storageKey_imagesURL = 'imagesURL';
    productUpdated = new EventEmitter<Product[]>();
    productUpdated_bazar = new EventEmitter<BazarProduct[]>();
    imagesUpdated = new EventEmitter<StringType[]>();
    updatedImgURL = new EventEmitter<string[]>();

    product: Product | undefined;

    storedProducts = localStorage.getItem(this.storageKey);
    storedProducts_bazar = localStorage.getItem(this.storageKey_bazar);
    storedImages = localStorage.getItem(this.storageKey_images);
    storedImagesURL = localStorage.getItem(this.storageKey_imagesURL);
    products =  this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
    products_bazar =  this.storedProducts_bazar ? JSON.parse(this.storedProducts_bazar) : undefined;
    images =  this.storedImages ? JSON.parse(this.storedImages) : undefined;
    imagesURL = this.storedImagesURL ? JSON.parse(this.storageKey_imagesURL) : undefined;

    searchTerm: String = "";
    refreshSeachSite: boolean = false;

    constructor(private http: HttpClient, private userServiceState: UserStateService, private router: Router) {}

    getProducts(): Observable<Product[]> 
    {
        this.storedProducts = localStorage.getItem(this.storageKey);
        this.products = this.storedProducts ? JSON.parse(this.storedProducts) : PRODUCTS;
        return this.http.get<Product[]>("http://localhost:3008/bicykle");
    }

    getImagesType(): Observable<StringType[]> 
    {
        return this.http.get<StringType[]>("http://localhost:3008/img");
    }

    getImagesURL(id: string): Observable<string[]> 
    {
      const url = `http://localhost:3008/imgURL?type=${id}`;
      return this.http.get<string[]>(url);
    }

    getBazarProducts(): Observable<BazarProduct[]>
    {
      this.storedProducts_bazar = localStorage.getItem(this.storageKey_bazar);
      this.products_bazar = this.storedProducts_bazar ? JSON.parse(this.storedProducts_bazar) : undefined;
      return this.http.get<BazarProduct[]>("http://localhost:3008/bazar");
    }

    ngOnDestroy() 
    {
        this.productUpdated;
    }

    addProduct(type: TYPEPRODUCT, nameProduct: string, markUp: string, 
      price: number, img: string, discount: number) 
    {
      axios.post<Product>("http://localhost:3008/module-add", { type, nameProduct, markUp, price, img, discount })
      .then(response => {
        this.router.navigate(['/b-admin']);
        console.log(response.data); 
      })
      .catch(error => {
        if (error.response && error.response.status === 400) 
        {
          const errorMessage = 'Error: Produck s rovnakym menom existuje.';
          const userAcknowledged = window.confirm(errorMessage);
        } else 
        {
          const errorMessage = 'Error: Unable to add the product.';
          const userAcknowledged = window.confirm(errorMessage);
          console.error(error); 
        }
    });
    }
    
    addBazarProduct(nameProduct: string, price: number, img: string, infoProduct: string) 
    {
      let user = this.userServiceState.getActualUser();
      if (user) 
      {
        let email = user.email;
        axios.post<BazarProduct>("http://localhost:3008/module-add-bazar-product", { nameProduct, price, img, infoProduct, email })
        .then(response => {
          this.router.navigate(['/bazar']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400) 
          {
            const errorMessage = 'Error: Produck s rovnakym menom existuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to add the product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
      }
    }

      uploadProduct(_id: number, type: TYPEPRODUCT, nameProduct: string, markUp: string, price: number, img: string, discount: number) {
        console.log(_id, nameProduct);
        axios.post("http://localhost:3008/module-upload", { _id, type, nameProduct, markUp, price, img, discount })
        .then(response => {
          this.router.navigate(['/b-admin']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400)  
          {
            const errorMessage = 'Error: Produck s rovnakym menom neexistuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to upload the product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
      }

      uploadBazarProduct(_id: number, nameProduct: string, price: number, img: string, infoProduct: string) 
      {
        console.log(_id, nameProduct);
        let email = this.userServiceState.getActualUser()?.email;
        axios.post("http://localhost:3008/module-upload-bazar-product", { _id, nameProduct, price, img, infoProduct, email })
        .then(response => {
          this.router.navigate(['/bazar']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400) 
          {
            const errorMessage = 'Error: Bazar produkt s rovnakym menom neexistuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to upload the bazar product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
      }

      deleteProduct(nameProduct: string): void {
        console.log(nameProduct);
        axios.post("http://localhost:3008/module-delete", { nameProduct })
        .then(response => {
          this.router.navigate(['/b-admin']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400) 
          {
            const errorMessage = 'Error: Produck s rovnakym menom neexistuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to delete the product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
      }

      deleteBazarProduct(nameProduct: string): void {
        console.log(nameProduct);
        axios.post("http://localhost:3008/module-delete-bazar-product", { nameProduct })
        .then(response => {
          this.router.navigate(['/bazar']);
          console.log(response.data); 
        })
        .catch(error => {
          if (error.response && error.response.status === 400) 
          {
            const errorMessage = 'Error: Bazar produkt s rovnakym menom neexistuje.';
            const userAcknowledged = window.confirm(errorMessage);
          } else 
          {
            const errorMessage = 'Error: Unable to delete the bazar product.';
            const userAcknowledged = window.confirm(errorMessage);
            console.error(error); 
          }
        });
      }

      setSearchTerm(searchTerm: String) 
      {
        this.searchTerm = searchTerm;
      }

      getSearchTerm(): String 
      {
        return this.searchTerm;
      }
      
      setRefreshSeachSite_true() 
      {
        this.refreshSeachSite = true;
      }

      setRefreshSeachSite_false() 
      {
        this.refreshSeachSite = false;
      }

      getRefreshSeachSite(): boolean 
      {
        return this.refreshSeachSite;
      }
}
