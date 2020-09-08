import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    // Public fields for HTML
    hasNullValues: boolean;

    // Constructor injecting dataService and Router
    constructor(
        private dataService : DataService,
        private router: Router
    ) { }

    ngOnInit() { }

    // OnSubmit values are sent to the addUser method in DataService
    onSubmit(form: NgForm) {

        // Checking if all values are there
        if(form.value.username !== "" && form.value.password !== "") {

            // Adding the form values as parameters to the addUser in dataService
            this.dataService.addUser(form.value.username, form.value.password);

            // Setting hasNullValues to false and navigate the user to login
            this.hasNullValues = false;
            this.router.navigate(["login-register"]);
        } else {
            this.hasNullValues = true;
        }
    }
}
