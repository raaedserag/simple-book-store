const express = require("express");
const router = express.Router();
const publishersHandler = require("../controller/publishers-controller")
//-----------------------------------

// Add new book
router.post('/', publishersHandler.insertPublisher)

// Get all books
router.get('/', publishersHandler.getAllPublishers)

// Buy book
router.put('/', publishersHandler.updatePublisher)

// Delete Book
router.delete('/:name', publishersHandler.deletePublisher)


module.exports = router;