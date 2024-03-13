const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const admin = require('./firebase-admin-init');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
connectDB();
const User = require('./models/User');


// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use('/api', authRoutes); // Use the authRoutes for all routes starting with /api

app.get('/get-user-token', async (req, res) => {
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
}
);

app.post('/verify-token', async (req, res) => {
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
});


// Secure route example
app.post('/some-secure-route', async (req, res) => {
  const idToken = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!idToken) {
    return res.status(401).send('No token provided');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    // Proceed with the user's request...
    res.send(`Request authorized for user ID: ${uid}`);
  } catch (error) {
    res.status(401).send('You are not authorized');
  }
});


// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
