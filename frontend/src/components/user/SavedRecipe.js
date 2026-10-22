
import React, { useEffect, useState } from "react";
import axios from "axios";

function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setError("Please log in to view your saved recipes.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/saved",
        {
          params: { userId }
        }
      );

      setSavedRecipes(response.data);
      setError("");
    } catch (err) {
      console.error(
        "Error loading saved recipes:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Unable to load saved recipes."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeSavedRecipe = async (savedId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please log in again.");
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/saved/${savedId}`,
        {
          params: { userId }
        }
      );

      setSavedRecipes((previous) =>
        previous.filter((item) => item._id !== savedId)
      );
    } catch (err) {
      console.error(
        "Error removing saved recipe:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        "Unable to remove saved recipe."
      );
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="pt-2 pb-4">
          <h3 className="fw-bold mb-3">Saved Recipes</h3>
          <h6 className="op-7 mb-2">
            Your favourite recipes, saved in one place.
          </h6>
        </div>

        <div className="card card-round">
          <div className="card-header">
            <h4 className="card-title">My Saved Recipes</h4>
            <p className="card-category">
              Total saved: {savedRecipes.length}
            </p>
          </div>

          <div className="card-body">
            {loading ? (
              <p className="text-center">
                Loading saved recipes...
              </p>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : savedRecipes.length === 0 ? (
              <div className="text-center p-4">
                <i className="fa fa-bookmark fa-3x mb-3"></i>
                <h5>No saved recipes yet</h5>
                <p>
                  Visit All Recipes and click Save Recipe
                  to add your favourites here.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Sl. No.</th>
                      <th>Image</th>
                      <th>Recipe Name</th>
                      <th>Category</th>
                      <th>Ingredients</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {savedRecipes.map((item, index) => {
                      const recipe = item.recipeId;

                      if (!recipe || typeof recipe !== "object") {
                        return (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td colSpan="5">
                              Recipe details not found
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  removeSavedRecipe(item._id)
                                }
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={item._id}>
                          <td>{index + 1}</td>

                          <td>
                            {recipe.image ? (
                              <img
                                src={`http://localhost:5000/uploads/${recipe.image}`}
                                alt={recipe.title || "Recipe"}
                                style={{
                                  width: "80px",
                                  height: "70px",
                                  objectFit: "cover"
                                }}
                              />
                            ) : (
                              "No image"
                            )}
                          </td>

                          <td>{recipe.title || "No title"}</td>

                          <td>
                            {recipe.catid?.catname || "No category"}
                          </td>

                          <td>
                            {recipe.ingredients || "Not specified"}
                          </td>

                          <td>
                            {recipe.description || "No description"}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                removeSavedRecipe(item._id)
                              }
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedRecipe;
