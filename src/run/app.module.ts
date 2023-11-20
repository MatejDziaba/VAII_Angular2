import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ModuleUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
