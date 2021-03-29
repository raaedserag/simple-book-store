const express = require("express");
const router = express.Router();
const authorsHandler = require("../controller/authors-controller")
//-----------------------------------

// Add new author
router.post('/', authorsHandler.insertAuthor)

// Get all authors
router.get('/', authorsHandler.insertAuthor)

// Update author
router.put('/:number', authorsHandler.updateAuthor)

// Delete author
router.delete('/:number', authorsHandler.deleteAuthor)

// Write a book
router.post('/write', authorsHandler.writeBook)

module.exports = router;