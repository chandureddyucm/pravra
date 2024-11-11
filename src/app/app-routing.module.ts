import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryComponent } from './category/category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route,
  { path: 'home', component: HomeComponent }, 
  { path: 'quick-links/:id', component: QuickLinksComponent }, 

  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: CategoryComponent }, 
  { path: 'categories', component: CategoryComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent } // For unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
