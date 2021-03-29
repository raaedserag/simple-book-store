const express = require("express");
const router = express.Router();
const publishersHandler = require("../controller/publishers-controller")
//-----------------------------------

// Add new publisher
router.post('/', publishersHandler.insertPublisher)

// Get all publishers
router.get('/', publishersHandler.getAllPublishers)

// Update publisher
router.put('/:name', publishersHandler.updatePublisher)

// Delete publisher
router.delete('/:name', publishersHandler.deletePublisher)


module.exports = router;