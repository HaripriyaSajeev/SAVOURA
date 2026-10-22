import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "./AllRecipes.css";

function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [savedRecipeIds, setSavedRecipeIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingRecipeId, setSavingRecipeId] = useState("");
  const [deletingRecipeId, setDeletingRecipeId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRecipesPage = location.pathname === "/recipes";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/recipe"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.recipes || [];

      setRecipes(data);
      setError("");
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Unable to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes saved by the logged-in user
  const fetchSavedRecipes = async () => {
    const currentUserId = localStorage.getItem("userId");

    if (!currentUserId) {
      setSavedRecipeIds([]);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/saved",
        {
          params: { userId: currentUserId },
        }
      );

      const savedItems = Array.isArray(response.data)
        ? response.data
        : response.data?.savedRecipes || [];

      const ids = savedItems
        .filter((item) => item.recipeId)
        .map((item) =>
          String(
            typeof item.recipeId === "object"
              ? item.recipeId._id
              : item.recipeId
          )
        );

      setSavedRecipeIds(ids);
    } catch (err) {
      console.error(
        "Error fetching saved recipes:",
        err.response?.data || err.message
      );
    }
  };

  // Save a recipe
  const saveRecipe = async (recipe) => {
    const currentUserId = localStorage.getItem("userId");

    if (!currentUserId) {
      navigate("/login");
      return;
    }

    const recipeId = String(recipe._id);

    if (savedRecipeIds.includes(recipeId)) {
      return;
    }

    try {
      setSavingRecipeId(recipeId);

      await axios.post(
        "http://localhost:5000/api/saved/add",
        {
          userId: currentUserId,
          recipeId: recipe._id,
        }
      );

      setSavedRecipeIds((previous) =>
        previous.includes(recipeId)
          ? previous
          : [...previous, recipeId]
      );

      alert("Recipe saved successfully!");
    } catch (err) {
      console.error(
        "Error saving recipe:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Unable to save recipe. Please try again."
      );
    } finally {
      setSavingRecipeId("");
    }
  };

  // Delete only the logged-in user's own recipe
  const deleteRecipe = async (recipe) => {
    const currentUserId = localStorage.getItem("userId");

    if (!currentUserId) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const recipeUserId =
      typeof recipe.userid === "object"
        ? recipe.userid?._id
        : recipe.userid;

    if (
      !recipeUserId ||
      String(recipeUserId) !== String(currentUserId)
    ) {
      alert("You can delete only recipes you added.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingRecipeId(String(recipe._id));

      await axios.delete(
        `http://localhost:5000/api/recipe/${recipe._id}`,
        {
          params: { userId: currentUserId },
        }
      );

      // Remove the deleted recipe from this page
      setRecipes((previous) =>
        previous.filter(
          (item) => String(item._id) !== String(recipe._id)
        )
      );

      // Remove the deleted recipe from the saved list
      setSavedRecipeIds((previous) =>
        previous.filter((id) => id !== String(recipe._id))
      );

      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error(
        "Error deleting recipe:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Unable to delete recipe. Please try again."
      );
    } finally {
      setDeletingRecipeId("");
    }
  };

  // Search recipes
  const searchText = search.trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    const category =
      typeof recipe.catid === "object"
        ? recipe.catid?.catname || ""
        : "";

    return (
      (recipe.title || "").toLowerCase().includes(searchText) ||
      category.toLowerCase().includes(searchText) ||
      (recipe.ingredients || "").toLowerCase().includes(searchText) ||
      (recipe.description || "").toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <Header />

      <main
        className={`savoura-recipes-page ${
          isPublicRecipesPage
            ? "public-recipes-page"
            : "user-recipes-page"
        }`}
      >
        <section className="savoura-recipes-hero">
          <h1>OUR RECIPES</h1>
          <p>
            Discover delicious dishes shared by our food-loving
            community.
          </p>
        </section>

        <section className="savoura-recipes-container">
          <div className="savoura-recipes-top">
            <div>
              <h2>Explore Recipes</h2>
              <p>Find your next favourite dish.</p>
            </div>

            <input
              type="text"
              className={`savoura-recipe-search ${
                isPublicRecipesPage ? "public-recipe-search" : ""
              }`}
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <p className="savoura-recipes-message">
              Loading recipes...
            </p>
          ) : error ? (
            <p className="savoura-recipes-message">{error}</p>
          ) : filteredRecipes.length === 0 ? (
            <div className="savoura-recipes-empty">
              <h3>
                {recipes.length === 0
                  ? "No recipes added yet"
                  : "No matching recipes"}
              </h3>

              <p>
                {recipes.length === 0
                  ? "Recipes shared by users will appear here."
                  : "Try searching with another word."}
              </p>
            </div>
          ) : (
            <div className="savoura-recipe-grid">
              {filteredRecipes.map((recipe) => {
                const recipeId = String(recipe._id);
                const isSaved = savedRecipeIds.includes(recipeId);
                const isSaving = savingRecipeId === recipeId;
                const isDeleting = deletingRecipeId === recipeId;

                const category =
                  typeof recipe.catid === "object"
                    ? recipe.catid?.catname || ""
                    : "";

                const recipeUserId =
                  typeof recipe.userid === "object"
                    ? recipe.userid?._id
                    : recipe.userid;

                const isOwner =
                  Boolean(userId) &&
                  Boolean(recipeUserId) &&
                  String(recipeUserId) === String(userId);

                return (
                  <article
                    className="savoura-recipe-card"
                    key={recipe._id}
                  >
                    {recipe.image ? (
                      <img
                        className="savoura-recipe-image"
                        src={`http://localhost:5000/uploads/${recipe.image}`}
                        alt={recipe.title || "Recipe"}
                      />
                    ) : (
                      <div className="savoura-recipe-no-image">
                        No image available
                      </div>
                    )}

                    <div className="savoura-recipe-content">
                      {category && (
                        <span className="savoura-recipe-category">
                          {category}
                        </span>
                      )}

                      <h3>{recipe.title || "Untitled Recipe"}</h3>

                      <p className="savoura-recipe-description">
                        {recipe.description ||
                          "No description available."}
                      </p>

                      <h4>Ingredients</h4>

                      <p className="savoura-recipe-ingredients">
                        {recipe.ingredients || "Not specified"}
                      </p>

                      {/* Actions appear only on the user recipes page */}
                      {!isPublicRecipesPage && (
                        <div className="recipe-actions">
                          <button
                            type="button"
                            className={`savoura-save-button ${
                              isSaved ? "is-saved" : ""
                            }`}
                            onClick={() => saveRecipe(recipe)}
                            disabled={
                              isSaved || isSaving || isDeleting
                            }
                          >
                            {isSaved
                              ? "SAVED"
                              : isSaving
                              ? "SAVING..."
                              : "SAVE RECIPE"}
                          </button>

                          {/* Show Delete only for the recipe owner */}
                          {isOwner && (
                            <button
                              type="button"
                              className="savoura-delete-button"
                              onClick={() => deleteRecipe(recipe)}
                              disabled={isDeleting || isSaving}
                            >
                              {isDeleting
                                ? "DELETING..."
                                : "DELETE RECIPE"}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <Footer/>
      </main>
    </>
  );
}

export default AllRecipes;