import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from '../app/homecomponent/homecomponent.component';
import { CatalogcomponentComponent } from '../app/Catalog/catalogcomponent/catalogcomponent.component';
import { BAdminComponent } from '../app/Catalog/Bicykle/b-admin/b-admin.component';
import { ModuleAddComponent } from '../app/modules/module-add/module-add.component';
import { ModuleAddFailureComponent } from '../app/modules/module-add-failure/module-add-failure.component';
import { ModuleCheckoutComponent } from '../app/modules/module-checkout/module-checkout.component';
import { ModuleUploadComponent } from '../app/modules/module-upload/module-upload.component';
import { ModuleDeleteComponent } from '../app/modules/module-delete/module-delete.component';
import { RegistrationComponent } from '../app/authorization/registration/registration.component';
import { SignUpComponent } from '../app/authorization/sign-up/sign-up.component';
import { UserTableComponent } from '../app/tables/user-table/user-table.component';
import { LogOutComponent } from '../app/authorization/log-out/log-out.component';

const routes: Routes = [
  {path: '', component: HomecomponentComponent},
  {path: 'homecomponent', component: HomecomponentComponent},
  {path: 'catalogcomponent', component: CatalogcomponentComponent},
  {path: 'b-admin', component: BAdminComponent},
  {path: 'module-add', component: ModuleAddComponent},
  {path: 'module-upload', component: ModuleUploadComponent},
  {path: 'module-add-failure', component: ModuleAddFailureComponent},
  {path: 'module-checkout', component: ModuleCheckoutComponent},
  {path: 'module-delete', component: ModuleDeleteComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user-table', component: UserTableComponent}, 
  {path: 'log-out', component: LogOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
