// Require express.
const express = require('express')
// Create a router.
const router = express.Router()
// Require the products controller.
const ProductController = require('../controllers/productController')

// Set get all products function.
router.get('/', ProductController.getAllProducts)
router.get('/:name', ProductController.getProduct)
router.post('/create', ProductController.createProduct)

// Export the router.
module.exports = router