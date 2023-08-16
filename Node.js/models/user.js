// Require mongoose.
const mongoose = require('mongoose')

// Make a user schema.
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number },
})

// Export the model.
module.exports = mongoose.model('User', userSchema)
