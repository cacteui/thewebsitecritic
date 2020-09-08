import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-add-review',
    templateUrl: './add-review.component.html',
    styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

      // Private fields for the class
      private websiteId : string;
      private userId;

      // Public fields for the HTML
      hasData: boolean;
      hasNullValues: boolean;
      websites: any[];
      users: any[];
      selectedValue: number = 0;

      // Constructor injecting the ActivatedRoute, Router and DataService
      constructor(
          private route : ActivatedRoute,
          private router : Router,
          private dataService: DataService
      ) { }

      ngOnInit() {
          // Initializing the websiteId from the route
          this.websiteId = this.route.snapshot.paramMap.get('id');

          // Setting timeout so data can load before screen shows
          setTimeout(() => {
              this.hasData = true;
              this.getUserId();
              this.getWebsite();
              }, 100);
      }

      // Get specific website from websiteId
      getWebsite() {
          return this.dataService.websites.find(website => website._id === this.websiteId);
      }

      // Get the specific userId from the currentlyLoggedInUser
      getUserId() {
          if(this.dataService.currentlyLoggedInUser !== null) {
              let user = this.dataService.users.find(user => user.name === this.dataService.currentlyLoggedInUser);
              this.userId = user._id.toString();
          }
      }

      // onSubmit method from the add review form
      onSubmit(form: NgForm) {
          // Checking if input fields has been filled out
          if(form.value.title !== "" && form.value.review !== "" && this.selectedValue !== 0) {

              // Fields required for the review object - Inserting both websiteId and userId for later reference
              let title = form.value.title;
              let review = form.value.review;
              let score = this.selectedValue;
              let website = this.websiteId;
              let user = this.userId;

              // Creating a new Review Object to send with the post in dataService
              let newReview = {
                  title: title,
                  review: review,
                  score: score,
                  website: website,
                  user: user
              };

              // Referencing to the addReview Post method in DataService and sending the object to it
              // also setting hasNullValues to false and redirecting to the website they are reviewing on
              this.dataService.addReview(newReview);
              this.hasNullValues = false;
              this.router.navigate([`/websites/${website}`]);
          } else {
              this.hasNullValues = true;
          }
      }
}
