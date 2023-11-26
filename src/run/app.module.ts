import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field'; 


import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app/app.component';
import { HomecomponentComponent } from '../app/homecomponent/homecomponent.component';
import { NavbarcomponentComponent } from '../app/baseComponents/navbarcomponent/navbarcomponent.component';
import { FootercomponentComponent } from '../app/baseComponents/footercomponent/footercomponent.component';
import { NavbarAdminComponent } from '../app/baseComponents/navbar-admin/navbar-admin.component';
import { SideBarcomponentComponent } from '../app/baseComponents/side-barcomponent/side-barcomponent.component';
import { BAdminComponent } from '../app/Catalog/b-admin/b-admin.component';
import { BicykleComponent } from '../app/Catalog/Bicykle/bicykle/bicykle.component';
import { CatalogcomponentComponent } from '../app/Catalog/catalogcomponent/catalogcomponent.component';
import { ModuleAddComponent } from '../app/Catalog/module-add/module-add.component';
import { ModuleUploadComponent } from '../app/Catalog/module-upload/module-upload.component';
import { ModuleAddFailureComponent } from '../app/module-add-failure/module-add-failure.component';
import { ModuleCheckoutComponent } from '../app/module-checkout/module-checkout.component';
import { ModuleDeleteComponent } from '../app/Catalog/module-delete/module-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    NavbarcomponentComponent,
    FootercomponentComponent,
    NavbarAdminComponent,
    SideBarcomponentComponent,
    BAdminComponent,
    BicykleComponent,
    CatalogcomponentComponent,
    ModuleAddComponent,
    ModuleUploadComponent,
    ModuleAddFailureComponent,
    ModuleCheckoutComponent,
    ModuleDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
