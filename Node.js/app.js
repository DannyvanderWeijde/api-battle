// Require body parser.
const bodyParser = require('body-parser')
// Require express.
const express = require('express')
// Make an app.
const app = express()
// // Require dotenv so it can be used.
require("dotenv").config()

// Get the port or set it to 3000.
const PORT = process.env.PORT || 3000
// Require the database connection.
require('./db')
// Get the routes.
const routes = require('./routes')

// Parse application/json.
app.use(bodyParser.json())

// Use the api routes.
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});