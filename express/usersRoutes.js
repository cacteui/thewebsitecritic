// Requirements
const router = require('express').Router(); // Middleware function enabling separation of routes to create better overview of code
const bodyParser = require('body-parser');

// Database requirements
const db = require('./db');
const ObjectID = require('mongodb').ObjectID;

// Authentication requirements (specifically the method of encrypting the passwords)
const bCrypt = require('bcrypt');

// Using the bodyParser to take requests in JSON format
router.use(bodyParser.json()); // Parse JSON from the request body

// The api/users route
router.route('/')
    .get((req, res) => db.getUsers({}).then((users) => res.json(users)))
    .post((req, res) => {

        // The information from the request body (when someone is signing up to become a user)
        let username = req.body.username;
        // Encrypting the password with bCrypt library - salting 10 times
        let password = bCrypt.hashSync(req.body.password, 10);

        // Adding the user to the database
        db.addUser(username, password).then((user) => {
            res.json({message: "User has been added"});
        });
    });

// Exporting the router to be used in the main app.js file (or other files if needed)
module.exports = router;
