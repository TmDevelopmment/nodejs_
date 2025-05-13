const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/CustomerController');
const verifyToken = require('../middleware/Middleware');

// Create a new customer
router.post('/create',verifyToken, CustomerController.createCustomer);
// Get all customers
router.get('/customers',verifyToken, CustomerController.getAllCustomers);
// Get a customer by ID
router.get('/find/:id',verifyToken, CustomerController.getCustomerById);
// Update a customer by ID
router.put('/delete/:id',verifyToken, CustomerController.updateCustomer);
// Delete a customer by ID
router.delete('/update/:id',verifyToken, CustomerController.deleteCustomer);
// Get customers search
router.get('/search',verifyToken, CustomerController.searchCustomer);

module.exports = router;
