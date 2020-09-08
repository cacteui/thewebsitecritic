import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login-register/login/login.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { SingleWebsiteComponent } from './components/single-website/single-website.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { SignUpComponent } from './components/login-register/sign-up/sign-up.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component';
import { AllWebsitesComponent } from './components/all-websites/all-websites.component';
import { WebsitesListComponent } from './components/websites-list/websites-list.component';
import { AddWebsiteComponent } from './components/add-website/add-website.component';
import { HeaderComponent } from './components/header/header.component';
import { HeadingOneComponent } from './components/header/heading-one/heading-one.component';
import { HeadingTwoComponent } from './components/header/heading-two/heading-two.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddReviewComponent,
    SingleWebsiteComponent,
    ReviewsListComponent,
    SignUpComponent,
    LoginRegisterComponent,
    AllReviewsComponent,
    AllWebsitesComponent,
    WebsitesListComponent,
    AddWebsiteComponent,
    HeaderComponent,
    HeadingOneComponent,
    HeadingTwoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
