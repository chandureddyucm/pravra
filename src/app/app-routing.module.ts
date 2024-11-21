import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { OccasionsComponent } from './components/user/occasions/occasions.component';
import { HomeComponent } from './components/common/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route,
  { path: 'home', component: HomeComponent }, 
  { path: 'quick-links/:id', component: QuickLinksComponent }, 

  { path: 'category/:id', component: CategoryComponent }, 
  { path: 'categories', component: CategoryComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'occasions', component: OccasionsComponent },

  { path: '**', component: HomeComponent } // For unmatched routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
