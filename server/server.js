const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const admin = require('./firebase-admin-init');

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
