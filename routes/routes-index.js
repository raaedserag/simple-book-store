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
    app.use("/authors", require("./authors-route.js"))
    app.use("/customers", require("./customers-route.js"))
    app.use("/publishers", require("./publishers-route.js"))
    app.use("/books", require("./books-route.js"))
    app.use("/sales", require("./sales-route.js"))
    app.use("/wrotes", require("./wrotes-route.js"))

    // Apply Error Middleware
    app.use((err, req, res, next) => {
        console.error(err)
        res.status(500).send(err.message)
    });
};