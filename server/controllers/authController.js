// authController.js
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcrypt');

/*
    Route for registering a new user
    POST /auth/register
*/
const registerUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate user data (email and password), also done in client side
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      // TODO: add a different validation for email format
      const verificationToken = Math.random().toString(36).substring(7);

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt factor of 10
  
      // New user Instance
      const newUser = new User({ email, password: hashedPassword, verificationToken });
      const savedUser = await newUser.save();

      console.log('User saved:', savedUser);

     
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ success: false, message: 'Failed to register user' });
    }
};


/*
    Route for fetching user data
    GET /auth/user-data
*/
const getUserData = async (req, res) => {
  console.log("GET USER DATA")
  const { email } = req.query; // email is part of the query

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