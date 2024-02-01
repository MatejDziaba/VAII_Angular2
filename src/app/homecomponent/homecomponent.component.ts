import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Subscription, timeout } from 'rxjs';
import { ImgTypeData } from '../../Intefaces/imgTypeData';

type StringType = {
  id_: string;
  type: string;
};

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrl: './homecomponent.component.css'
})
export class HomecomponentComponent {

  private productsSubscription: Subscription | undefined;
  private productsSubscription2: Subscription | undefined;

  imagesType: StringType[] = [];
  imagesURL: string[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void 
  {
    this.productsSubscription = this.productService.getImagesType().subscribe(images => {
      this.imagesType = images;
      for (let i = 0; i < this.imagesType.length; i++) 
      {
        if (this.imagesType[i].type == "homecomponent") 
        {
          this.productsSubscription2 = this.productService.getImagesURL(this.imagesType[i].id_).subscribe(imagesURL => {
            this.imagesURL = imagesURL;
          });
        }
      }
      
    });

    this.productService.imagesUpdated.subscribe(updatedImages => {
      this.imagesType = updatedImages;
      this.productService.updatedImgURL.subscribe(updatedImgURL => {
        this.imagesURL = updatedImgURL;
      })
    })

    console.log(this.imagesType);

    

    
  } 

}
