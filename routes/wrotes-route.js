const express = require("express");
const router = express.Router();
const wrotesHandler = require("../controller/wrotes-controller")
//-----------------------------------

// Add new wrote
router.post('/', wrotesHandler.insertWrote)

// Get all wrotes
router.get('/', wrotesHandler.getAllWrotes)

// Update wrote
router.put('/:id', wrotesHandler.updateWrote)

// Delete wrote
router.delete('/:id', wrotesHandler.deleteWrote)

module.exports = router;