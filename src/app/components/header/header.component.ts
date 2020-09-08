import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    // Variables passed from parent component
    @Input() headline: any;
    @Input() paragraph: any;
    @Input() wantHeadingOne: boolean;
    @Input() wantHeadingTwo: boolean;
    @Input() wantParagraph: boolean;

    // Public variables for HTML
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
