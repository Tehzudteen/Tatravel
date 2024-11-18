const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const chatRoute = require("./routes/chat");
const connectDB = require("./config/db"); 
const authRoutes = require('./routes/auth');
const travelRoutes = require('./routes/travel');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", chatRoute);
app.use('/auth', authRoutes);
app.use('/travels', authMiddleware, travelRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

