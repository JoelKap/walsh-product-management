import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductTrashComponent } from './product-trash/product-trash.component';

// The reason why I didn't choose lazy loading is because this is a fairly small application,
// otherwise, it would have made sense to choose it.
const routes: Routes = [
  {
    path: "",
    redirectTo: "/product-list",
    pathMatch: "full",
  },
  {
    path: "product-list",
    component: ProductListComponent
  },
  {
    path: "detail/:id",
    component: ProductDetailComponent
  },
  {
    path: "trash",
    component: ProductTrashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
