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
 * Function to update a product.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.updateProduct = async (request, response) => {
    // Loop through all the given properties and replace the values if a value was sent with.
    for (const [key, value] of Object.entries(request.body)) {
        if (value) response.product[key] = value
    }

    // Save the product.
    this.querySelector(await response.product.save(), response, 400)
}

/**
 * Function to get the given query.
 *
 * @param {Object} url
 * @param {Object} response
 * @param {Number} errorCode
 *
 * @returns {Promise<void>}
 */
exports.querySelector = async (url, response, errorCode = 500) => {
    try {
        // Get all the products.
        response.json(await url)
    } catch (error) {
        // If something goes wrong return the error message.
        response.status(errorCode).json({ message: error })
    }
}

/***********************
 * Middleware.
 ***********************/

/**
 * Function to get a product by its id.
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Promise<Model>}
 */
exports.getProductById = async (request, response, next) => {
    // Create undefined product.
    let product

    try {
        // Try to get the product by its id.
        product = await Product.findById(request.params.id)

        // Check if the product was found. If not send a 404 error.
        if (!product) return response.status(404).json({ message: 'Cannot find product' })
    } catch (error) {
        // Show the user that something went wrong with the database call.
        return response.status(500).json({ message: error.message })
    }

    // Set response product to the found product.
    response.product = product

    // Run the next function to go to the next function.
    next()
}
