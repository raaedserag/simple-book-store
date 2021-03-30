const express = require("express");
const router = express.Router();
const authorsHandler = require("../controller/authors-controller")
//-----------------------------------

// Add new author
router.post('/', authorsHandler.insertAuthor)

// Get all authors
router.get('/', authorsHandler.getAllAuthors)

// Update author
router.put('/:number', authorsHandler.updateAuthor)

// Delete author
router.delete('/:number', authorsHandler.deleteAuthor)

module.exports = router;