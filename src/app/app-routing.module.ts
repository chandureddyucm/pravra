import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryComponent } from './category/category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route,
  { path: 'home', component: HomeComponent }, // Default route
  { path: 'quick-links/:id', component: QuickLinksComponent }, // Default route

  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: CategoryComponent }, // Dynamic route example
  { path: 'categories', component: CategoryComponent },
  { path: '**', component: NotFoundComponent } // For unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
