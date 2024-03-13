// userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserToken, verifyToken } = require('../controllers/userController');

// Route for fetching user token based on email
router.get('/get-user-token', getUserToken);
// Route for verifying user token for LeetCode integration
router.post('/verify-token', verifyToken);

module.exports = router;
