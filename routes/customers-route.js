const express = require("express");
const router = express.Router();
const customersHandler = require("../controller/customers-controller")
//-----------------------------------

// Add new customer
router.post('/', customersHandler.insertCustomer)

// Get all customers
router.get('/', customersHandler.getAllCustomers)

// Update customer
router.put('/:number', customersHandler.updateCustomer)

// Delete customer
router.delete('/:number', customersHandler.deleteCustomer)

// Buy a book
router.post('/buy', customersHandler.buyBook)

module.exports = router;