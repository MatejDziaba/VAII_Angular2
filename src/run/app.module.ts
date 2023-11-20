import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app/app.component';
import { HomecomponentComponent } from '../app/homecomponent/homecomponent.component';
import { NavbarcomponentComponent } from '../app/baseComponents/navbarcomponent/navbarcomponent.component';
import { FootercomponentComponent } from '../app/baseComponents/footercomponent/footercomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    NavbarcomponentComponent,
    FootercomponentComponent
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
