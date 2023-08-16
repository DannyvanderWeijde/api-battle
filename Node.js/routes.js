// Require express.
const express = require('express')
// Create a router.
const router = express.Router()
// Get the product routes.
const productRoutes = require('./routes/products')
// Get the user routes.
const userRoutes = require('./routes/users')

// Use the product routes.
router.use('/products', productRoutes)
router.use('/users', userRoutes)

// Export the router.
module.exports = router