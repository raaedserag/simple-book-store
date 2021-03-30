const express = require("express");
const router = express.Router();
const salessHandler = require("../controller/sales-controller")
//-----------------------------------

// Add new Sale
router.post('/', salessHandler.insertSale)

// Get all Sales
router.get('/', salessHandler.getAllSales)

// Update Sale
router.put('/:id', salessHandler.updateSale)

// Delete Sale
router.delete('/:id', salessHandler.deleteSale)

module.exports = router;