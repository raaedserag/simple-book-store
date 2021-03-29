const express = require("express");
const router = express.Router();
const booksHandler = require("../controller/books-controller")
//-----------------------------------

// Add new book
router.post('/', booksHandler.insertBook)

// Get all books
router.get('/', booksHandler.getAllBooks)

// Update book
router.put('/:number', booksHandler.updateBook)

// Delete book
router.delete('/:number', booksHandler.deleteBook)

module.exports = router;