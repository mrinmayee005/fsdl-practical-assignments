// server.js

// Import Express
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route for GET request
app.get('/', (req, res) => {
    res.send({ message: "Request successful!" });
});

// Define a route for POST request
app.post('/', (req, res) => {
    // You can also access data sent in Postman using req.body
    console.log(req.body); // optional
    res.send({ message: "POST request successful!" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
