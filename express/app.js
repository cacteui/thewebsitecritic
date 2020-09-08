// Requirements
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Database requirements
const db = require('./db');
const ObjectID = require('mongodb').ObjectID;

// Routes in separate files
const websites = require('./websitesRoutes');
const users = require('./usersRoutes');

// Authentication requirements
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const checkJwt = require('express-jwt');

// Configuration
const secret = "cheesecake";
const port = (process.env.PORT || 8080);
const app = express();
let server = "";
let io;

// Listen to port
db.connect().then(() => {
    server = app.listen(port, () => console.log(`The Website Critic API running on port ${port}!`));

    // Making socket.io listen as well
    io = require('socket.io').listen(server);

    // Messages on connection and disconnection
    io.of('/review').on('connection', function (socket) {
        socket.on('hello', function (from, msg) {
            console.log(`I received a private message from '${from}' saying '${msg}'`);
        });
        socket.on('disconnect', () => {
            console.log("Someone disconnected...");
        });
    });
});

// Using the libraries
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log results to the console
app.use(express.static('../dist/the-website-critic'));

// Additional headers for the response to avoid trigger CORS security
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.send(200);
    }
    else {
        // move on
        next();
    }
});

// The error message on authorization
app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});

// Authenticating the users trying to log in
app.route("/api/authenticate")
    .post((req, res) => {

        // Getting the values from the login
        const username = req.body.username;
        const password = req.body.password;

        // Finding the specific user in the user document
        db.getUsers({"name": username}).then(user => {

            // If user exists
            if(user) {
                // Compare the password the user has written with the one in database
                // Using bCrypt to do this, since password is encrypted on register
                bCrypt.compare(password, user[0].hash, (err, result) => {

                    // If user and password matches a JWT token is created
                    if(result) {

                        // Creating a payload with username
                        const payload = {
                            username: username,
                            admin: false
                        };

                        // Signing the token with paylod and secret and setting expiration to 1 hour
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '1h'
                        });

                        // Success response
                        res.json({
                            message: "User authenticated successfully",
                            token: token
                        });
                    } else res.status(401).json({ message: "Password mismatch"}) // User and password didn't match
                });
            } else {
                res.status(404).json({message: "User not found!"}); // User couldn't be found
            }
        });
    });

// Using the middleware routers for websites and users
app.use("/api/websites", websites);
app.use("/api/users", users);

// The review route
app.route('/api/reviews')
    .get((req, res) => db.getReviews({}).then((reviews) => res.json(reviews)))
    // It should not be possible to post on this route without having been authorized (logged in)
    // inserting checkJwt here, makes sure of that
    .post(checkJwt({ secret: secret }), (req, res) => {

        // The information from the request body (when user is adding review)
        let title = req.body.title;
        let review = req.body.review;
        let score = req.body.score;
        let timeOfReview = new Date(); // Adding a new Date() to determine the time the review was added
        let website = new ObjectID(req.body.website); // Creating an ObjectID on the inserted websiteId
        let user = new ObjectID(req.body.user); // Creating an ObjectId on the inserted userId

        // Creating an object with the new review information
        let newReview = {
            title: title,
            review: review,
            score: score,
            timeOfReview: timeOfReview,
            website: website,
            user: user
        };

        // Adding the new Review - it returns the new reviewID which can now be inserted into the website and user
        // Then adding the success respons
        db.addReview(newReview).then((newReviewId) => {
            db.updateWebsite(website, newReviewId).then(data => console.log("Website updated successfully"));
            db.updateUser(user, newReviewId).then(data => console.log("User updated successfully"));

            // Telling socket that new data has been added
            io.of("/review").emit('newData', {message: "New data is available on /api/reviews"});

            res.json({message: "Review has been added successfully"});
        });
    });

// Reroute all unknown requests to angular index.html
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../dist/the-website-critic/index.html'));
});
