// Require express.
const express = require('express')
// Create a router.
const router = express.Router()
// Require the products controller.
const ProductController = require('../controllers/productController')

// Set get all products function.
router.get('/', ProductController.getAllProducts)
router.get('/:name', ProductController.getProduct)

// Export the router.
module.exports = router