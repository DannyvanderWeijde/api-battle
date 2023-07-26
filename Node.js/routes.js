// Require express.
const express = require('express')
// Create a router.
const router = express.Router()
// Get the product routes.
const ProductRoutes = require('./routes/products')

// Use the product routes.
router.use('/products', ProductRoutes)

// Export the router.
module.exports = router