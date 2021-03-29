// Import Modules
const express = require("express");
const cors = require('cors');

module.exports = function (app) {
    // Apply Essential Middlewares
    app.use(express.json()); // Reparse body of the request into json object
    app.use(express.urlencoded({
        extended: true
    })); // Reparse url to encoded url payload
    app.use(express.static("public"))
    app.use(cors()); // Enable cors is essential to allow web pages to fetch resources
    app.use(require("morgan")("tiny")) // middleware to enable requests logging

    // Apply Routes
    Object.entries({
        "/authors": require("./authors-route"),
        "/customers": require("./customers-route"),
        "/publishers": require("./publishers-route"),
        "/books": require("./books-route"),
    }).map((route => app.use(route[0], route[1])))

    // Apply Error Middleware
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(500).send(err.message)
    });
};