import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // Variable holding the token
    storageKey: string = 'website-critic-token';

    // Constructor injecting Router
    constructor(private router: Router) { }

    // Set token
    setToken(token: string) : void {
        localStorage.setItem(this.storageKey, token)
    }

    // Get token
    getToken() : string {
        return localStorage.getItem(this.storageKey);
    }

    // Method for checking if the user is logged in
    IsLoggedIn() : boolean {
        return this.getToken() !== null;
    }

    // Method for logging out the User - redirecting to home after this
    Logout() {
        localStorage.removeItem(this.storageKey);
        this.router.navigate(['/']);
    }
}
