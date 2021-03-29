const express = require("express");
const router = express.Router();
const booksHandler = require("../controller/books-controller")
//-----------------------------------

// Get all books
router.get('/', booksHandler.getAllBooks)


module.exports = router;