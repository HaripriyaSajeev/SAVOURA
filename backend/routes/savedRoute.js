
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const SavedRecipe = require("../models/savedrecipemodel");
const Recipe = require("../models/recipemodel");
const User = require("../models/usermodel");

// SAVE A RECIPE
router.post("/add", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(userId || "") ||
      !mongoose.Types.ObjectId.isValid(recipeId || "")
    ) {
      return res.status(400).json({
        message: "Invalid user ID or recipe ID"
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: "User not found. Please log in again."
      });
    }

    const recipeExists = await Recipe.findById(recipeId);
    if (!recipeExists) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    const existing = await SavedRecipe.findOne({
      userId,
      recipeId
    });

    if (existing) {
      return res.status(200).json({
        message: "Recipe is already saved"
      });
    }

    const saved = await SavedRecipe.create({
      userId,
      recipeId
    });

    return res.status(201).json({
      message: "Recipe saved successfully",
      saved
    });
  } catch (error) {
    console.error("Error saving recipe:", error);

    if (error.code === 11000) {
      return res.status(200).json({
        message: "Recipe is already saved"
      });
    }

    return res.status(500).json({
      message: "Unable to save recipe"
    });
  }
});

// GET ONLY THIS USER'S SAVED RECIPES
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId || "")) {
      return res.status(400).json({
        message: "Invalid user ID. Please log in again."
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const savedRecipes = await SavedRecipe.find({ userId })
      .populate({
        path: "recipeId",
        model: Recipe,
        populate: {
          path: "catid",
          select: "catname"
        }
      })
      .sort({ savedDate: -1 });

    return res.status(200).json(savedRecipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);

    return res.status(500).json({
      message: "Unable to load saved recipes"
    });
  }
});

// REMOVE A SAVED RECIPE ONLY FOR ITS OWNER
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (
      !mongoose.Types.ObjectId.isValid(id || "") ||
      !mongoose.Types.ObjectId.isValid(userId || "")
    ) {
      return res.status(400).json({
        message: "Invalid saved recipe ID or user ID"
      });
    }

    const deleted = await SavedRecipe.findOneAndDelete({
      _id: id,
      userId
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Saved recipe not found for this user"
      });
    }

    return res.status(200).json({
      message: "Recipe removed successfully"
    });
  } catch (error) {
    console.error("Error removing saved recipe:", error);

    return res.status(500).json({
      message: "Unable to remove saved recipe"
    });
  }
});

module.exports = router;
