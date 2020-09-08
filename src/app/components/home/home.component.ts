import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Public fields for HTML
    hasData : boolean = false;
    homeParent: number = 1;

    // Constructor
    constructor() { }

    ngOnInit() {
        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;
            }, 100);
    }
}
