const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const userController = require("../Controllers/usercontroller");

// Create uploads folder if it does not exist
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Register user
router.post(
  "/register",
  upload.single("image"),
  userController.registerUser
);

// Login user
router.post("/login", userController.loginuser);

// Fetch all users
router.get("/users", userController.getAllUsers);

// Fetch one user by ID
router.get("/:id", userController.getUserById);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;