import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from '../app/homecomponent/homecomponent.component';
import { CatalogcomponentComponent } from '../app/Catalog/catalogcomponent/catalogcomponent.component';
import { BAdminComponent } from '../app/Catalog/b-admin/b-admin.component';
import { ModuleAddComponent } from '../app/Catalog/module-add/module-add.component';
import { ModuleAddFailureComponent } from '../app/module-add-failure/module-add-failure.component';
import { ModuleCheckoutComponent } from '../app/module-checkout/module-checkout.component';
import { ModuleUploadComponent } from '../app/Catalog/module-upload/module-upload.component';
import { ModuleDeleteComponent } from '../app/Catalog/module-delete/module-delete.component';

const routes: Routes = [
  {path: '', component: HomecomponentComponent},
  {path: 'homecomponent', component: HomecomponentComponent},
  {path: 'catalogcomponent', component: CatalogcomponentComponent},
  {path: 'b-admin', component: BAdminComponent},
  {path: 'module-add', component: ModuleAddComponent},
  {path: 'module-upload', component: ModuleUploadComponent},
  {path: 'module-add-failure', component: ModuleAddFailureComponent},
  {path: 'module-checkout', component: ModuleCheckoutComponent},
  {path: 'module-delete', component: ModuleDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
