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
    await this.querySelector(Product.find(), response)
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
    await this.querySelector(Product.findOne({name: request.params.name}), response)
}

/**
 * Function to create a product.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.createProduct = async (request, response) => {
    // Create a product with the request data.
    const product = new Product({name: request.body.name, category: request.body.category})

    try {
        // Save the product to the database.
        const newProduct = await product.save()

        // Show the users the product has been added to the database.
        response.status(201).json(`Product created ${newProduct.name}`);
    } catch (error) {
        // If something goes wrong return the error message.
        response.status(400).json({ message: error.message })
    }
}

/**
 * Function to get the given query.
 *
 * @param {Object} url
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.querySelector = async (url, response) => {
    try {
        // Get all the products.
        response.json(await url)
    } catch (error) {
        // If something goes wrong return the error message.
        response.status(500).json({ message: error })
    }
}
