import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDividerModule} from '@angular/material/divider';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field'; 


import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app/app.component';
import { HomecomponentComponent } from '../app/homecomponent/homecomponent.component';
import { NavbarcomponentComponent } from '../app/baseComponents/navbarcomponent/navbarcomponent.component';
import { FootercomponentComponent } from '../app/baseComponents/footercomponent/footercomponent.component';
import { SideBarcomponentComponent } from '../app/baseComponents/side-barcomponent/side-barcomponent.component';
import { BAdminComponent } from '../app/Catalog/Bicykle/b-admin/b-admin.component';
import { BicykleComponent } from '../app/Catalog/Bicykle/bicykle/bicykle.component';
import { CatalogcomponentComponent } from '../app/Catalog/catalogcomponent/catalogcomponent.component';
import { ModuleAddComponent } from '../app/modules/module-add/module-add.component';
import { ModuleUploadComponent } from '../app/modules/module-upload/module-upload.component';
import { ModuleAddFailureComponent } from '../app/modules/module-add-failure/module-add-failure.component';
import { ModuleCheckoutComponent } from '../app/modules/module-checkout/module-checkout.component';
import { ModuleDeleteComponent } from '../app/modules/module-delete/module-delete.component';
import { RegistrationComponent } from '../app/authorization/registration/registration.component'; 
import { SignUpComponent } from '../app/authorization/sign-up/sign-up.component';
import { UserTableComponent } from '../app/tables/user-table/user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LogOutComponent } from '../app/authorization/log-out/log-out.component';
import { ModuleSignupFailureComponent } from '../app/modules/module-signup-failure/module-signup-failure.component';
import { ProduktShowComponent } from '../app/produkt-show/produkt-show.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProduktShowDescriptionComponent } from '../app/produkt-show/produkt-show-description/produkt-show-description.component';
import { ProduktShowTableSizeComponent } from '../app/produkt-show/produkt-show-table-size/produkt-show-table-size.component';
import { ProduktShowExpeditionComponent } from '../app/produkt-show/produkt-show-expedition/produkt-show-expedition.component';
import { BazarComponent } from '../app/bazar/bazar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    NavbarcomponentComponent,
    FootercomponentComponent,
    SideBarcomponentComponent,
    BAdminComponent,
    BicykleComponent,
    CatalogcomponentComponent,
    ModuleAddComponent,
    ModuleUploadComponent,
    ModuleAddFailureComponent,
    ModuleCheckoutComponent,
    ModuleDeleteComponent,
    RegistrationComponent,
    SignUpComponent,
    UserTableComponent,
    LogOutComponent,
    ModuleSignupFailureComponent,
    ProduktShowComponent,
    ProduktShowDescriptionComponent,
    ProduktShowTableSizeComponent,
    ProduktShowExpeditionComponent,
    BazarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
