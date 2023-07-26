// Get the product model.
const Product = require('../models/product')

/**
 * Function to get all the products.
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * @returns {Promise<void>}
 */
exports.getAllProducts = async (request, response) => {
    await this.getQuery(Product.find(), response)
}

/**
 * Function to get one product by the name.
 * 
 * @param {Object} request 
 * @param {Object} response
 * 
 * @returns {Promise<void>}
 */
exports.getProduct = async (request, response) => {
    await this.getQuery(Product.findOne({name: request.params.name}), response)
}

/**
 * Function to get the given query.
 * 
 * @param {Object} url 
 * @param {Object} response
 * 
 * @returns {Promise<void>}
 */
exports.getQuery = async (url, response) => {
    try {
        // Get all the products.
        response.json(await url)
    } catch (error) {
        // If something goes wrong return the error message.
        response.status(500).json({ message: error })
    }
}