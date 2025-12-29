console.log("🔥 THIS SERVER.JS FILE IS RUNNING 🔥");
// 1. Import required libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const todoRoutes = require("./routes/todoRoutes");

// 2. Create express app
const app = express();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/todoApp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 5. Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// 6. Todo routes
app.use("/api/todos", todoRoutes);

// 🔴 ADD THIS TEMP TEST ROUTE HERE
app.get("/api/todos-test", (req, res) => {
  res.json({ test: "server route works" });
});

// 7. Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
