const User = require('../models/User');
const axios = require('axios');

/*
    Route for fetching user token based on email
    GET /user/get-user-token
*/
const getUserToken = async (req, res) => {
    try {
        const email = req.query.email; // Retrieve email from the request query
        // Fetch user from the database based on email and send back the token
        const user = await User.findOne({ email });
        if (user) {
          res.json({ success: true, token: user.verificationToken });
        } else {
          res.json({ success: false, message: 'User not found' });
        }
      } catch (error) {
        console.error('Error fetching user token:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/*
    Route for verifying user token for LeetCode integration
        - Fetch user data from the LeetCode API (3rd party API)
        - Check if the token is present in the user's about section
        - Update the user in the database with fetched information
    POST /user/verify-token
*/
const verifyToken = async (req, res) => {
    try {
        const { email, token, leetCodeUsername } = req.body;
    
        const leetCodeAPIUrl = `https://alfa-leetcode-api.onrender.com/${leetCodeUsername}`;
        console.log("LEETCODE API URL", leetCodeAPIUrl)
    
        // Fetch user data from the LeetCode API
        const response = await axios.get(leetCodeAPIUrl);
        const userData = response.data;
        console.log("USER DATA", userData)
    
        // Check if the token is present in the user's about section
        if (userData.about && userData.about.includes(token)) {
          console.log("TOKEN FOUND IN USER DATA")
    
          // Update the user in the database with fetched information
          const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { leetCodeUsername: leetCodeUsername, isVerified: true, ...userData } }, // Update leetCodeUsername and other fields
            { new: true }
          );
    
          if (updatedUser) {
            return res.json({ success: true, message: 'Token verified successfully', userData });
          } else {
            return res.json({ success: false, message: 'User not found' });
          }
        } else {
          return res.json({ success: false, message: 'Token not found in user profile' });
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
};

module.exports = { getUserToken, verifyToken };