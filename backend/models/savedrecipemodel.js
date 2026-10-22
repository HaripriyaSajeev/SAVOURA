
const mongoose = require("mongoose");

const savedRecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe",
    required: true
  },
  savedDate: {
    type: Date,
    default: Date.now
  }
});

savedRecipeSchema.index(
  { userId: 1, recipeId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "savedrecipe",
  savedRecipeSchema,
  "savedrecipes"
);
