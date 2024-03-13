// authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, getUserData } = require('../controllers/authController');

// Route for user registration
router.post('/register', registerUser);
// Route for fetching user data
router.get('/user-data', getUserData);

module.exports = router;
