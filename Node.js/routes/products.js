// Require express.
const express = require('express')
// Create a router.
const router = express.Router()
// Require the products controller.
const ProductController = require('../controllers/productController')

// Set get all products routes.
router.get('/', ProductController.getAllProducts)
router.get('/:name', ProductController.getProduct)
router.post('/create', ProductController.createProduct)
router.patch('/update/:id', ProductController.getProductById, ProductController.updateProduct)
router.delete('/delete/:id', ProductController.getProductById, ProductController.deleteProduct)

// Export the router.
module.exports = router