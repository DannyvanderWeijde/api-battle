const express = require('express')
const router = express.Router()

const ProductRoutes = require('./routes/products')

router.use('/products', ProductRoutes)

module.exports = router