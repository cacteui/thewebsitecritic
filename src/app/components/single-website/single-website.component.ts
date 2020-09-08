import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'app-single-website',
    templateUrl: './single-website.component.html',
    styleUrls: ['./single-website.component.css']
})
export class SingleWebsiteComponent implements OnInit {

    // Public fields for HTML
    websiteId : string;
    hasData : boolean = false;
    hasReviews : boolean = true;

    // Constructor injecting ActivatedRoute, Router and DataService
    constructor(
        private route : ActivatedRoute,
        private router : Router,
        private service: DataService
    ) { }

    ngOnInit() {
        // Initializing the websiteId from the route
        this.websiteId = this.route.snapshot.paramMap.get('id');

        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;

            // Checking if website exists
            if(this.getWebsite() === undefined ) {
                this.router.navigate(["/websites"]);
            }
            }, 100);
    }

    // Calculating the average score
    getAverageScore(websiteId) {

        // Variables holding the number of reviews, the full score and the averageScore
        let count = 0;
        let fullScore = 0;
        let averageScore = 0;

        // Looping through the reviews
        for(let review of this.service.reviews) {

            // If review.website (it's the objectId) is the same as websiteId (taken from route) is true
            if(review.website === websiteId) {

                // Add the review's score to fullscore and do +1 on count
                fullScore = fullScore + parseInt(review.score);
                count++;
            }
        }

        // if count is not 0 (so there are reviews) calculate the average using count and fullscore
        if(count !== 0) {
            averageScore = fullScore/count;
            averageScore = Math.round(averageScore * 100) / 100;
        } else {
            // Otherwise set averageScore to 0 and set hasReviews to false (activates a new paragraph in HTML)
            averageScore = 0;
            this.hasReviews = false;
        }

        // Return the score
        return averageScore;
    }

    // Returning the websiteId so it can be sent to child component (reviews List)
    getId() : string {
        return this.websiteId;
    }

    // Get the website object
    getWebsite() : any {
        return this.service.websites.find(d => d._id === this.getId());
    }
}
