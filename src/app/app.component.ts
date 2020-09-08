import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // Constructor injecting the AuthService
    constructor(public auth: AuthService) {}

    // Call getCurrentYear when initiazing page
    ngOnInit() {
        this.getCurrentYear();
    }

    // Method for logging out user
    logout() {
        this.auth.Logout();
    }

    // Get current year for copyright in footer
    getCurrentYear() {
        return new Date().getFullYear();
    }
}
