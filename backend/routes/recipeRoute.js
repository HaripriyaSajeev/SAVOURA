
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const Recipe = require("../models/recipemodel");

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Add a recipe and store its creator
router.post("/addrecipe", upload.single("image"), async (req, res) => {
  try {
    const { title, description, ingredients, catid, userid } = req.body;

    if (!title || !description || !ingredients || !catid) {
      return res.status(400).json({
        message: "Please provide title, description, ingredients and category.",
      });
    }

    if (!userid || !isValidId(userid)) {
      return res.status(401).json({
        message: "Please log in before adding a recipe.",
      });
    }

    if (!isValidId(catid)) {
      return res.status(400).json({
        message: "Invalid category ID.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a recipe image.",
      });
    }

    const recipe = await Recipe.create({
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      catid,
      image: req.file.filename,
      userid,
    });

    return res.status(201).json({
      message: "Recipe added successfully",
      recipe,
    });
  } catch (error) {
    console.error("Error adding recipe:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Get all recipes for the user and public pages
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("catid", "catname")
      .sort({ createdAt: -1 });

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Delete only a recipe owned by the requesting user
router.delete("/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.query.userId;

    if (!isValidId(recipeId) || !userId || !isValidId(userId)) {
      return res.status(400).json({
        message: "A valid recipe ID and user ID are required.",
      });
    }

    // Ownership is checked in the database query itself.
    const recipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      userid: userId,
    });

    if (!recipe) {
      return res.status(404).json({
        message:
          "Recipe not found, or you do not have permission to delete it.",
      });
    }

    // Remove the recipe image file, if it exists.
    if (recipe.image) {
      const imagePath = path.join(uploadDir, path.basename(recipe.image));

      if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (error) => {
          if (error) {
            console.error("Could not delete recipe image:", error);
          }
        });
      }
    }

    return res.status(200).json({
      message: "Your recipe was deleted successfully.",
      recipeId: recipe._id,
    });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return res.status(500).json({ message: error.message });
  }
});

// Get one recipe by ID
router.get("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid recipe ID." });
    }

    const recipe = await Recipe.findById(req.params.id).populate(
      "catid",
      "catname"
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
