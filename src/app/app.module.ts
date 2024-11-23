import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeComponent } from './components/common/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { QuickLinksComponent } from './components/quick-links/quick-links.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OccasionsComponent } from './components/user/occasions/occasions.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ReadyToShipComponent } from './components/user/ready-to-ship/ready-to-ship.component';
import { BuildABoxComponent } from './components/user/build-a-box/build-a-box.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    ProductListComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    QuickLinksComponent,
    CreateUserComponent,
    LoginComponent,
    OccasionsComponent,
    ReadyToShipComponent,
    BuildABoxComponent
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
