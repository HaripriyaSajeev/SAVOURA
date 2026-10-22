const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/recipedb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// Routes
const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const categoryRoute = require("./routes/categoryRoute");
app.use("/api/category", categoryRoute);

const recipeRoute = require("./routes/recipeRoute");
app.use("/api/recipe", recipeRoute);

const savedRoute = require("./routes/savedRoute");
app.use("/api/saved", savedRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Connected to MongoDB");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});