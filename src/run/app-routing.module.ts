import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from '../app/homecomponent/homecomponent.component';
import { CatalogcomponentComponent } from '../app/Catalog/catalogcomponent/catalogcomponent.component';
import { BAdminComponent } from '../app/Catalog/b-admin/b-admin.component';
import { ModuleAddComponent } from '../app/Catalog/module-add/module-add.component';

const routes: Routes = [
  {path: '', component: HomecomponentComponent},
  {path: 'homecomponent', component: HomecomponentComponent},
  {path: 'catalogcomponent', component: CatalogcomponentComponent},
  {path: 'b-admin', component: BAdminComponent},
  {path: 'module-add', component: ModuleAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
