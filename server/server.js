require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

const UpdateCounter = require('./Routes/UpdateCounter');
app.use(UpdateCounter);

app.listen(3000, () => {
  console.log('Server Started on Port 3000');
});
