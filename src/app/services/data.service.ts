import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    // Private fields for the class
    private url_prefix : string = environment.express_url;
    private httpOptions = {};

    // Variables holding the data from the database
    reviews : any[];
    websites : any[];
    users : any[];

    // Variable holding the user currently logged in
    currentlyLoggedInUser: string;

    // Constructor injecting HTTPClient, AuthService and Router
    constructor(private http : HttpClient, private auth: AuthService, private router: Router) {
        this.getReviews();
        this.getWebsites();
        this.getUsers();
    }

    // Get method - getting all the websites from websites document in MongoDB
    getWebsites() {
        return this.http.get<any[]>(this.url_prefix+'/api/websites')
            .subscribe((websites) => this.websites = websites);
    }

    // Post method - posting to the specific route in Express, where it pushes it to MongoDB
    addWebsite(website) : void {
        this.http.post<any>(this.url_prefix+'/api/websites', website)
            .subscribe(newWebsite => console.log(newWebsite));
    }

    // Get method - getting all the reviews from reviews document in MongoDB
    getReviews() {
        return this.http.get<any[]>(this.url_prefix+'/api/reviews')
            .subscribe((reviews) => this.reviews = reviews);
    }

    // Post method - posting to the specific route in Express, where it pushes it to MongoDB
    // HTTPOptions variable with Bearer Token is passed as well to make sure the person is authorized to post on route
    addReview(review) : void {
        this.http.post<any>(this.url_prefix+'/api/reviews', review, this.httpOptions)
            .subscribe(newReview => console.log(newReview));
    }

    // Get method - getting all the users from users document in MongoDB
    getUsers() {
        return this.http.get<any[]>(this.url_prefix+'/api/users')
            .subscribe((users) => this.users = users);
    }

    // Post method - posting to the specific route in Express, where it pushes it to MongoDB
    addUser(username, password) {
        this.http.post<any>(this.url_prefix+'/api/users', {
            username: username,
            password: password
        }).subscribe((newUser) => console.log(newUser));
    }

    // Creating the HTTPOptions that gets the token, when a user is logged in
    CreateHttpOptions() {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth.getToken()}`
            })
        };
    }

    // Post method - authenticating the user that should be logged in - referring to the express route that contains the logic
    // that checks if user exists and then sets a token, creates the HTTPoptions and redirects user if before statement is true
    authenticate(username, password) {
        this.http.post<any>(`${this.url_prefix}/api/authenticate`, {
            username: username,
            password: password
        }).subscribe(data => {
            this.auth.setToken(data.token);
            this.CreateHttpOptions();
            this.router.navigate(['/']);
        },
                error => console.error(error));
    }
}
