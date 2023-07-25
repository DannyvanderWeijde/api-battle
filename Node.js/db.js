// Require mongoose.
const mongoose = require("mongoose")
// Get the mongo db uri.
const uri = process.env.MONGODB_URI

// Make a connection with the database.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('DB connected'))
  .catch((error) => console.error("Error connecting to MongoDB:", error))
