import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-all-reviews',
    templateUrl: './all-reviews.component.html',
    styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {

    // Public fields for HTML
    hasData: boolean = false;
    allReviews: number = 1;
    headline: string = "All reviews";
    paragraph: string = "See all reviews";

    // Constructor
    constructor() { }

    ngOnInit() {
        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;
        }, 100);
    }
}
