import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-heading-two',
  templateUrl: './heading-two.component.html',
  styleUrls: ['./heading-two.component.css']
})
export class HeadingTwoComponent implements OnInit {

    // Passed values from parent component
    @Input() headingTwo: any;

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
