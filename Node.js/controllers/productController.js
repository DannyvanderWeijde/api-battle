const Product = require('../models/product')

exports.getAllProducts = async (request, response) => {
    try {
        response.json(await Product.find())
    } catch (error) {
        response.status(500).json({ message: error })
    }
}