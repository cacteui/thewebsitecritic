import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
    selector: 'app-websites-list',
    templateUrl: './websites-list.component.html',
    styleUrls: ['./websites-list.component.css']
})
export class WebsitesListComponent implements OnInit {

    // Public fields for HTML
    hasData: boolean = false;

    // Constructor injecting the dataService
    constructor(private dataService: DataService) {
        this.dataService.getWebsites();
    }

    ngOnInit() {
        // Setting timeout so data can load before screen shows
        setTimeout(() => {
            this.hasData = true;
        }, 100);
    }

    // Getting the websites
    getWebsites() {
        return this.dataService.websites;
    }
}
