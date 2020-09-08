import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    // Public fields for HTML
    hasNullValues: boolean = false;

    // Constructor injecting dataService
    constructor(private dataService: DataService) { }

    ngOnInit() { }

    // OnSubmit values are sent to the authenticate method in DataService
    onSubmit(form: NgForm) {

        // Checking if all values are there
        if(form.value.username !== "" && form.value.password !== "") {

            // Adding the valeus as parameters to the authenticate method in dataService
            this.dataService.authenticate(form.value.username, form.value.password);

            // Setting hasNullValues to false and adding the username to the currentlyLoggedInUser in DataService
            this.hasNullValues = false;
            this.dataService.currentlyLoggedInUser = form.value.username;
        } else {
            this.hasNullValues = true;
        }
    }
}
