// authController.js
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
      // Extract user data from the request body
      const { email, password } = req.body;
  
      // Validate user data (e.g., check if email is unique, password meets requirements, etc.)
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      // Generate LeetCode token for the user
      const generateLeetCodeToken = () => {
        // Generate a unique token (you can use any method for this)
        return Math.random().toString(36).substring(7);
        };
      const verificationToken = generateLeetCodeToken(); // Implement this function
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt factor of 10
  
      // Create a new user instance
      const newUser = new User({ email, password: hashedPassword, verificationToken });

      // Save the user to the database
      const savedUser = await newUser.save();
      console.log('User saved:', savedUser);

      // Respond with success message
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      // Handle any errors and respond with error message
      console.error('Error registering user:', error);
      res.status(500).json({ success: false, message: 'Failed to register user' });
    }
};

// In authController.js, add the getUserData function

const getUserData = async (req, res) => {
  console.log("GET USER DATA")
  const { email } = req.query; // Assuming you're sending the email as a query parameter

  if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
      const user = await User.findOne({ email }).select("-password -verificationToken"); // Exclude sensitive information
      if (user) {
          res.json({ success: true, user });
      } else {
          res.status(404).json({ success: false, message: "User not found." });
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { registerUser, getUserData };