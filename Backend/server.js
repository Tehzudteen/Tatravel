const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); // Import the MongoDB connection function
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const chatRoute = require("./routes/chat");
app.use("/api", chatRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
