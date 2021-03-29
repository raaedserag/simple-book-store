const express = require("express");
const router = express.Router();
const authorsHandler = require("../controller/authors-controller")
//-----------------------------------

// Add new book
router.post('/', authorsHandler.insertAuthor)

// Get all books
router.get('/', authorsHandler.insertAuthor)

// Buy book
router.put('/', authorsHandler.updateAuthor)

// Delete Book
router.delete('/:number', authorsHandler.deleteAuthor)


module.exports = router;