import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'app-add-website',
    templateUrl: './add-website.component.html',
    styleUrls: ['./add-website.component.css']
})
export class AddWebsiteComponent implements OnInit {

    // Public fields for HTML
    hasNullValues: boolean = false;
    hasAddedWebsite: boolean = false;
    headline: string = "Add a website";

    // Constructor injecting dataService
    constructor(private dataService: DataService) { }

    ngOnInit() {}

    // onSubmit method from the add review form
    onSubmit(form: NgForm) {
        // Checking if input fields has been filled out
        if(form.value.domain !== "" && form.value.description) {

            // Fields required for the review object - Inserting both websiteId and userId for later reference
            let domain = form.value.domain;
            let description = form.value.description;

            // Creating a new Review Object to send with the post in dataService
            let newWebsite = {
                domain: domain,
                description: description
            };

            // Referencing to the addReview Post method in DataService and sending the object to it
            // also setting hasNullValues to false and adding a feedback line in HTML
            this.dataService.addWebsite(newWebsite);
            this.dataService.websites.push(newWebsite);
            this.hasNullValues = false;
            this.hasAddedWebsite = true;

            // Resetting the input fields
            form.reset();
        } else {
            this.hasNullValues = true;
        }
    }
}
