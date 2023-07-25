// Require mongoose.
const mongoose = require('mongoose')

// Make a product schema.
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
})

// Export the model.
module.exports = mongoose.model('Product', productSchema)
