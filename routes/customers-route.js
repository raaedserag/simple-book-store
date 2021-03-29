const express = require("express");
const router = express.Router();
const customersHandler = require("../controller/customers-controller")
//-----------------------------------

// Add new book
router.post('/', customersHandler.insertCustomer)

// Get all books
router.get('/', customersHandler.getAllCustomers)

// Buy book
router.put('/', customersHandler.updateCustomer)

// Delete Book
router.delete('/:number', customersHandler.deleteCustomer)


module.exports = router;