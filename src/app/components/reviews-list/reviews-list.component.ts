import {ChangeDetectorRef, Component, Input, OnInit, Optional} from '@angular/core';
import {DataService} from "../../services/data.service";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'app-reviews-list',
    templateUrl: './reviews-list.component.html',
    styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {

    // Values passed from a parent components (SingleWebsiteComponent, AllReviewsComponent, HomeComponent)
    @Input() websiteId : string;
    @Input() homeParent : number;
    @Input() allReviews : number;

    // Public fields for HTML
    hasData : boolean = false;
    hasReviews : boolean = true;
    headlineRecent: string = "Recent reviews";
    headlineWebsite: string = "Reviews for this website";
    paragraph: string = "Check out the reviews below!";

    // Fields to contain data arrays
    reviews: any[];
    websites: any[];
    users: any[];

    // Constructor injecting DataService, and initializing the data arrays
    constructor(private service: DataService, private socketService: SocketService, private cd: ChangeDetectorRef) {
        this.service.getReviews();
        this.service.getWebsites();
        this.service.getUsers();
    }

    ngOnInit() {
        // Socket.io messages via SocketService
        // First one tells if app connected to socket on server
        // Second one register, when changes happens on the get review
        this.socketService.onNewMessage();
        this.socketService.sendMessage("newData");

        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;
            }, 100);
    }

    // Creating the arrayList of reviews that will be shown on either frontpage, full list or specific website details page
    getReviews() : any[] {
        // If websiteId is undefined, frontpage list is returned
        if(this.homeParent === 1) {
            let newReviewsList = [...this.service.reviews];
            let slicedReviews = this.sliceReviews(newReviewsList);

            // Checking if review length is more than 0 and setting the hasReviews Boolean
            // that makes sure that a div with text "No reviews yet" is shown if it is false
            slicedReviews.length > 0 ? this.hasReviews = true : this.hasReviews = false;

            return this.sortReviews(slicedReviews);
        } else if (this.allReviews === 1) {
            // If the above is not true, but allReviews = 1 then the full list is return
            let newReviewsList = [...this.service.reviews];
            return this.sortReviews(newReviewsList);
        } else if (this.websiteId !== undefined) {
            // if websiteID is defined, SingleWebsitePage list is returned
            // by creating a new array, looping through the reivew list
            // and adding the matching ones to the array, then return the new array
            let reviews = [];
            for(let review of this.service.reviews) {
                if(review.website === this.websiteId) {
                    reviews.push(review);
                }
            }
            // Checking if review length is more than 0 and setting the hasReviews Boolean
            // that makes sure that a div with text "No reviews yet" is shown if it is false
            reviews.length > 0 ? this.hasReviews = true : this.hasReviews = false;

            // Return the list
            return this.sortReviews(reviews);
        }
    }

    // Slice method for the review list for frontpage
    sliceReviews(array) {
        return array.slice(-10);
    }

    // Sort the review list so it shows the newest reviews first
    sortReviews(array) {
        return array.sort((a, b) => {
            return Date.parse(b.timeOfReview) - Date.parse(a.timeOfReview);
        });
    }

    // Get the website object from the objectId that review object has saved
    getWebsite(id) {
        let website;
        website = this.service.websites.find(website => website._id === id);
        return website;
    }

    // Get the user object from objectId that review object has saved
    getUser(id) {
        if(id === undefined) {
            let defaultText = {
                name: "User",
                reviews: [1,1]
            };
            return defaultText;
        } else {
            let user;
            user = this.service.users.find(user => user._id === id);
            return user;
        }
    }

    // Customize the way the date is shown on the review
    setDateUI(time) {
        let date = new Date(time);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
    }
}
