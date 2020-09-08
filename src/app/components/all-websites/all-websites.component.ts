import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-all-websites',
    templateUrl: './all-websites.component.html',
    styleUrls: ['./all-websites.component.css']
})
export class AllWebsitesComponent implements OnInit {

    // Public fields for HTML
    hasData: boolean = false;
    headline: string = "Websites";
    paragraph: any = `List of all the websites you can add reviews to. Missing one?`;

    // Constructor
    constructor() { }

    ngOnInit() {
        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;
        }, 100);
    }
}
