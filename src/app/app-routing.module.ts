import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login-register/login/login.component";
import {SingleWebsiteComponent} from "./components/single-website/single-website.component";
import {AddReviewComponent} from "./components/add-review/add-review.component";
import {LoggedInGuard} from "./services/logged-in.guard";
import {SignUpComponent} from "./components/login-register/sign-up/sign-up.component";
import {LoginRegisterComponent} from "./components/login-register/login-register.component";
import {AllReviewsComponent} from "./components/all-reviews/all-reviews.component";
import {AllWebsitesComponent} from "./components/all-websites/all-websites.component";

const appRoutes : Routes = [
    // Paths for different pages
    { path: "", component: HomeComponent},
    { path: "reviews", component: AllReviewsComponent},
    { path: "websites", component: AllWebsitesComponent},
    { path: "websites/:id", component: SingleWebsiteComponent},

    // Add Review page has Guard, route is only open if user is logged in
    { path: "websites/:id/add-review", component: AddReviewComponent, canActivate: [LoggedInGuard]},

    // Login-register has child routing for both login and register
    { path: "login-register", component: LoginRegisterComponent, children: [
        { path: "", component: LoginComponent },
            { path: "login", component: LoginComponent},
            { path: "register", component: SignUpComponent}
            ]},
    { path: "**", redirectTo: ""}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes, { enableTracing: false})
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
