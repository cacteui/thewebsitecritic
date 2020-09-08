import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-heading-one',
    templateUrl: './heading-one.component.html',
    styleUrls: ['./heading-one.component.css']
})
export class HeadingOneComponent implements OnInit {

    // Passed values from parent component
    @Input() headingOne: any;

    // Public values for HTML
    hasData: boolean = false;

    // Constructor
    constructor() { }

    ngOnInit() {
        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;
        }, 100);
    }

}
