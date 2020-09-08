// Requirements
let mongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

// Variables with names for database and collections
const dbName = 'websitecritic';
const websitesCol = 'websites';
const reviewsCol = 'reviews';
const usersCol = 'users';
let client = {};

// Connect to the mongodb server
let connect = () => {
    return new Promise((resolve, reject) => {
        mongoClient.connect(dbUrl).then((c) => {
            client = c;
            console.log('Connected successfully to mongodb server!');
            resolve();
        }).catch((error) => console.error(error));
    });
};

// Websites Collection
let getWebsites = (query) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(websitesCol).find(query).toArray()
            .then((documents) => {
                    console.log("Got websites");
                    resolve(documents);
                }).catch((error) => console.error(error));
    });
};

let addWebsite = (newWebsite) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(websitesCol).insertOne(newWebsite)
            .then((result) => {
                console.log('Website added');
                resolve(result);
            }).catch((error) => console.error(error));
    });
};

let updateWebsite = (id, reviewId) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(websitesCol).updateOne({_id: id},
            {$addToSet: { reviews: reviewId }}).then((result) => {
                    console.log("Website updated");
                    resolve(result);
                }).catch((error) => console.error(error));
    });
};

// Reviews Collection
let getReviews = (query) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(reviewsCol).find(query).toArray()
            .then((documents) => {
                console.log("Got reviews");
                resolve(documents);
            }).catch((error) => console.error(error));
    });
};

let addReview = (newReview) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(reviewsCol).insertOne(newReview)
            .then((result) => {
                console.log('Review added');
                resolve(result.insertedId);
            }).catch((error) => console.error(error));
    });
};

// Users Collection
let getUsers = (query) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(usersCol).find(query).toArray()
            .then((documents) => {
                console.log("Got user data");
                resolve(documents);
            }
            ).catch((error) => console.error(error));
    });
};

let addUser = (username, password) => {
    return new Promise((resolve, reject) => {
        let user = {name: username, hash: password};
        client.db(dbName).collection(usersCol).insertOne(user)
            .then((result) => {
                console.log("User added");
                resolve(result);
            }).catch((error) => console.error(error));
    });
};

let updateUser = (id, reviewId) => {
    return new Promise((resolve, reject) => {
        client.db(dbName).collection(usersCol).updateOne({_id: id},
            {$addToSet: { reviews: reviewId }}).then((result) => {
                console.log("User updated");
                resolve(result);
            }).catch((error) => console.error(error));
    });
};

// Export functions
module.exports.connect = connect;
module.exports.getWebsites = getWebsites;
module.exports.addWebsite = addWebsite;
module.exports.updateWebsite = updateWebsite;
module.exports.getReviews = getReviews;
module.exports.addReview = addReview;
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
