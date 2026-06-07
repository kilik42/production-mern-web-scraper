const express = require('express');
const cors = require('cors'); // middleware for handling Cross-Origin Resource Sharing (CORS)
const mongoose = require('mongoose'); // MongoDB object modeling tool designed to work in an asynchronous environment.
require('dotenv').config(); // Load environment variables from a .env file into process.env

const tiobController = require('./controllers/tiobController'); // Import the tiobController module

const app = express();



app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB')) // Log a success message if the connection is successful
  .catch(err => console.error('Could not connect to MongoDB', err));    // Log an error message if the connection fails


app.get('/api/tiobe', tiobController.getTiobeRankings); // Define a route for GET requests to /api/tiobe that uses the getTiobeData method from the tiobController
// app.use('/tiob', tiobController); // Use the tiobController for routes starting with /tiob


const port = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

app.listen(port, () => {  
    
    console.log(`Example app listening at http://localhost:${port}`);
});