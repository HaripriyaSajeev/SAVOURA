
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  catid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  // The user who created this recipe
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("recipe", recipeSchema, "recipes");
