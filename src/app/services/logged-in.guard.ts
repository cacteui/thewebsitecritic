import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

    // Constructor
    constructor(private auth: AuthService, private router: Router) { }

    // The canActivate that is set on routes in routing module is activated if a user is logged in
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // If user is not logged in, user is redirected to the login page otherwise activate the route
        if(!this.auth.IsLoggedIn()) {
            this.router.navigate(['/login-register']);
        } else {
            return true;
        }
    }
}
