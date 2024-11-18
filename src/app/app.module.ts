import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OccasionsComponent } from './user/occasions/occasions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    ProductListComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    NotFoundComponent,
    QuickLinksComponent,
    CreateUserComponent,
    LoginComponent,
    OccasionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
