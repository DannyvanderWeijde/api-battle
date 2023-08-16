// Require express.
const express = require('express')
// Create a router.
const router = express.Router()
// Require the user controller.
const UserController = require('../controllers/userController')

// Set get all users routes.
router.get('/', UserController.getAllUsers)
router.get('/:name', UserController.getUser)
router.post('/create', UserController.createUser)
router.patch('/update/:id', UserController.getUserById, UserController.updateUser)
router.delete('/delete/:id', UserController.getUserById, UserController.deleteUser)

// Export the router.
module.exports = router