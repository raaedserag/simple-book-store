const express = require("express");
const router = express.Router();
const booksHandler = require("../controller/books-controller")
//-----------------------------------

// Add new book
router.post('/', booksHandler.insertBook)

// Get all books
router.get('/', booksHandler.getAllBooks)

// Buy book
router.put('/', booksHandler.buyBook)

// Delete Book
router.delete('/:number', booksHandler.deleteBook)


module.exports = router;