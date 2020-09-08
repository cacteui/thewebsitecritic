// Requirements
const router = require('express').Router(); // Middleware function enabling separation of routes to create better overview of code
const bodyParser = require('body-parser');

// Database requirements
const db = require('./db');
const ObjectID = require('mongodb').ObjectID;

// Using the bodyParser to take requests in JSON format
router.use(bodyParser.json()); // Parse JSON from the request body

// The api/websites route
router.route('/')
    .get((req, res) => db.getWebsites({}).then((websites) => res.json(websites)))
    .post((req, res) => {

        // The information from the request body (when someone is posting a new website)
        let domain = req.body.domain;
        let description = req.body.description;

        // Creating an object with the new review information
        let newWebsite = {
            domain: domain,
            description: description
        };

        // Adding the new website info to the database
        db.addWebsite(newWebsite).then((newWebsite) => {
            res.json({message: "Website added"});
        })
    });

// Exporting the router to be used in the main app.js file (or other files if needed)
module.exports = router;
