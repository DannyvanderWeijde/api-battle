// Get the user model.
const User = require('../models/user')

/**
 * Function to get all the users.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.getAllUsers = async (request, response) => {
	await this.querySelector(User.find(), response)
}

/**
 * Function to get one user by the name.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.getUser = async (request, response) => {
	await this.querySelector(User.findOne({name: request.params.name}), response)
}

/**
 * Function to create a user.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.createUser = async (request, response) => {
	// Create a user with the request data.
	const user = new User({name: request.body.name, age: request.body.age})

	try {
		// Save the user to the database.
		const newUser = await user.save()

		// Show the users the user has been added to the database.
		response.status(201).json(`User created ${newUser.name}`);
	} catch (error) {
		// If something goes wrong return the error message.
		response.status(400).json({ message: error.message })
	}
}

/**
 * Function to update a user.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.updateUser = async (request, response) => {
	// Loop through all the given properties and replace the values if a value was sent with.
	for (const [key, value] of Object.entries(request.body)) {
		if (value) response.user[key] = value
	}

	// Save the user.
	this.querySelector(await response.user.save(), response, null, 400)
}

/**
 * Function to delete the given user.
 *
 * @param {Object} request
 * @param {Object} response
 *
 * @returns {Promise<void>}
 */
exports.deleteUser = async (request, response) => {
	// Delete the user by the id.
	this.querySelector(await User.deleteOne(response.user), response, `User ${response.user.name} has been removed`)
}

/**
 * Function to get the given query.
 *
 * @param {Object} url
 * @param {Object} response
 * @param {String|Null} successMessage
 * @param {Number} errorCode
 *
 * @returns {Promise<void>}
 */
exports.querySelector = async (url, response, successMessage = null ,errorCode = 500) => {
	try {
		// Get the result of the given url.
		const result = await url
		// return the success message.
		response.json(successMessage ? successMessage : result)
	} catch (error) {
		// If something goes wrong return the error message.
		response.status(errorCode).json({ message: error })
	}
}

/**
 * Function to get a user by its id.
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Promise<Model>}
 */
exports.getUserById = async (request, response, next) => {
	// Create undefined user.
	let user

	try {
		// Try to get the user by its id.
		user = await User.findById(request.params.id)

		// Check if the user was found. If not send a 404 error.
		if (!user) return response.status(404).json({ message: 'Cannot find user' })
	} catch (error) {
		// Show the user that something went wrong with the database call.
		return response.status(500).json({ message: error.message })
	}

	// Set response user to the found user.
	response.user = user

	// Run the next function to go to the next function.
	next()
}