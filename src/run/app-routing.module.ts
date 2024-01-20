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
import { BicykleComponent } from '../app/Catalog/Bicykle/bicykle/bicykle.component';
import { ModuleSignupFailureComponent } from '../app/modules/module-signup-failure/module-signup-failure.component';
import { ProduktShowComponent } from '../app/produkt-show/produkt-show.component';
import { ProduktShowDescriptionComponent } from '../app/produkt-show/produkt-show-description/produkt-show-description.component';
import { ProduktShowTableSizeComponent } from '../app/produkt-show/produkt-show-table-size/produkt-show-table-size.component';
import { ProduktShowExpeditionComponent } from '../app/produkt-show/produkt-show-expedition/produkt-show-expedition.component';
import { BazarComponent } from '../app/bazar/bazar.component';
import { SearchComponent } from '../app/search/search.component';
import { ModuleAddBazarProductComponent } from '../app/modules/module-add-bazar-product/module-add-bazar-product.component';
import { KomunitaComponent } from '../app/komunita/komunita.component';
import { ModuleAddKomunitaComponent } from '../app/modules/module-add-komunita/module-add-komunita.component';
import { ModuleDeleteKomunitaComponent } from '../app/modules/module-delete-komunita/module-delete-komunita.component';
import { ShoppingPackComponent } from '../app/shoppingPack/shopping-pack/shopping-pack.component';
import { SideBarComponent } from '../app/shoppingPack/side-bar/side-bar.component';
import { EmptyComponent } from '../app/shoppingPack/empty/empty.component';
import { NotEmptyComponent } from '../app/shoppingPack/not-empty/not-empty.component';
import { ModuleToShoppingPackComponent } from '../app/modules/module-to-shopping-pack/module-to-shopping-pack.component';

const routes: Routes = [
  {path: '', component: HomecomponentComponent},
  {path: 'homecomponent', component: HomecomponentComponent},
  {path: 'catalogcomponent', component: CatalogcomponentComponent},
  {path: 'bicykle', component: BicykleComponent},
  {path: 'b-admin', component: BAdminComponent},
  {path: 'module-add', component: ModuleAddComponent},
  {path: 'module-upload', component: ModuleUploadComponent},
  {path: 'module-add-failure', component: ModuleAddFailureComponent},
  {path: 'module-checkout', component: ModuleCheckoutComponent},
  {path: 'module-delete', component: ModuleDeleteComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user-table', component: UserTableComponent}, 
  {path: 'log-out', component: LogOutComponent},
  {path: 'sign-up-failure', component: ModuleSignupFailureComponent},
  {path: 'produkt-show', component: ProduktShowComponent},
  {path: 'produkt-show-description', component: ProduktShowDescriptionComponent},
  {path: 'produkt-show-table-size', component: ProduktShowTableSizeComponent},
  {path: 'produkt-show-expedition', component: ProduktShowExpeditionComponent},
  {path: 'bazar', component: BazarComponent},
  {path: 'search', component: SearchComponent},
  {path: 'module-add-bazar-product', component: ModuleAddBazarProductComponent},
  {path: 'komunita', component: KomunitaComponent},
  {path: 'module-add-komunita', component: ModuleAddKomunitaComponent},
  {path: 'module-delete-komunita', component: ModuleDeleteKomunitaComponent},
  {path: 'shopping-pack', component: ShoppingPackComponent},
  {path: 'shopping-sidebar', component: SideBarComponent},
  {path: 'emptyShoppingPack', component: EmptyComponent},
  {path: 'notEmptyShoppingPack', component: NotEmptyComponent},
  {path: 'module-to-shopping-pack', component: ModuleToShoppingPackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
