import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductTrashComponent } from './product-trash/product-trash.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/product-list",
    pathMatch: "full",
  },
  {
    path: "product-list",
    component: ProductListComponent,
    title: 'Product list'
  },
  {
    path: "detail/:id",
    component: ProductDetailComponent,
    title: 'Product detail'
  },
  {
    path: "trash",
    component: ProductTrashComponent,
    title: 'Trash'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
