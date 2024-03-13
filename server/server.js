const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Database connection
const connectDB = require('./config/db');
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json


// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api', authRoutes); // Use the authRoutes for all routes starting with /api
app.use('/user', userRoutes); // Use the userRoutes for all routes starting with /user


// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the server');
});

// Hello route
app.get('/hello', (req, res) => {
  res.send('Hello World');
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
