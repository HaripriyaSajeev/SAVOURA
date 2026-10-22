
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const userId = localStorage.getItem("userId");

  const [totalRecipes, setTotalRecipes] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [unsavedCount, setUnsavedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const recipeResponse = await axios.get(
          "http://localhost:5000/api/recipe"
        );

        const recipes = Array.isArray(recipeResponse.data)
          ? recipeResponse.data
          : recipeResponse.data?.recipes || [];

        let savedItems = [];

        if (userId) {
          const savedResponse = await axios.get(
            "http://localhost:5000/api/saved",
            { params: { userId } }
          );

          savedItems = Array.isArray(savedResponse.data)
            ? savedResponse.data
            : savedResponse.data?.savedRecipes || [];
        }

        const recipeIds = new Set(
          recipes.map((recipe) => String(recipe._id))
        );

        const savedIds = new Set(
          savedItems
            .filter((item) => item.recipeId)
            .map((item) =>
              String(
                typeof item.recipeId === "object"
                  ? item.recipeId._id
                  : item.recipeId
              )
            )
            .filter((id) => recipeIds.has(id))
        );

        setTotalRecipes(recipes.length);
        setSavedCount(savedIds.size);
        setUnsavedCount(recipes.length - savedIds.size);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(
          "Unable to load recipe statistics. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [userId]);

  return (
    <div className="container">
      <div className="page-inner">
        {/* Dashboard heading - Logout button removed */}
        <div className="d-flex align-items-center justify-content-between flex-wrap pt-2 pb-4">
          <div>
            <h3 className="fw-bold mb-2">User Dashboard</h3>
            <h6 className="text-muted mb-0">
              Welcome back, {username}!
            </h6>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* Recipe statistics */}
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="icon-big text-center icon-primary bubble-shadow-small">
                      <i className="fas fa-utensils"></i>
                    </div>
                  </div>
                  <div className="col">
                    <p className="card-category">Total Recipes</p>
                    <h4 className="card-title">
                      {loading ? "..." : totalRecipes}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="icon-big text-center icon-success bubble-shadow-small">
                      <i className="fas fa-bookmark"></i>
                    </div>
                  </div>
                  <div className="col">
                    <p className="card-category">Saved Recipes</p>
                    <h4 className="card-title">
                      {loading ? "..." : savedCount}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="card card-stats card-round">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="icon-big text-center icon-warning bubble-shadow-small">
                      <i className="fas fa-book-open"></i>
                    </div>
                  </div>
                  <div className="col">
                    <p className="card-category">Unsaved Recipes</p>
                    <h4 className="card-title">
                      {loading ? "..." : unsavedCount}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User activity overview */}
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <h4 className="card-title">
                  My Activity Overview
                </h4>
                <p className="card-category">
                  Manage your recipes and favourites
                </p>
              </div>

              <div className="card-body">
                <div className="row">
                  {/* Explore Recipes */}
                  <div className="col-md-4 mb-3">
                    <div className="card card-round border">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="fas fa-search text-primary me-3 fa-2x"></i>
                          <h5 className="mb-0">
                            Explore Recipes
                          </h5>
                        </div>

                        <p className="text-muted">
                          Browse all available recipes and discover
                          new dishes.
                        </p>

                        <button
                          className="btn btn-primary btn-round"
                          onClick={() =>
                            navigate("/user/allrecipes")
                          }
                        >
                          View Recipes
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Saved Recipes */}
                  <div className="col-md-4 mb-3">
                    <div className="card card-round border">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="fas fa-heart text-success me-3 fa-2x"></i>
                          <h5 className="mb-0">
                            Saved Recipes
                          </h5>
                        </div>

                        <p className="text-muted">
                          {loading
                            ? "Loading your saved recipes..."
                            : `You have saved ${savedCount} recipe(s).`}
                        </p>

                        <button
                          className="btn btn-success btn-round"
                          onClick={() =>
                            navigate("/user/savedrecipe")
                          }
                        >
                          View Saved
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add Recipe */}
                  <div className="col-md-4 mb-3">
                    <div className="card card-round border">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                          <i className="fas fa-plus-circle text-info me-3 fa-2x"></i>
                          <h5 className="mb-0">
                            Share a Recipe
                          </h5>
                        </div>

                        <p className="text-muted">
                          Add your favourite dish and share it with
                          the community.
                        </p>

                        <button
                          className="btn btn-info btn-round"
                          onClick={() =>
                            navigate("/user/addrecipe")
                          }
                        >
                          Add Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome panel */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-body p-4">
                <h4 className="fw-bold">
                  Welcome to SAVOURA!
                </h4>

                <p className="text-muted mb-3">
                  Discover delicious meals, save the recipes you
                  love, and share your own cooking ideas with the
                  SAVOURA community.
                </p>

                <button
                  className="btn btn-primary btn-round"
                  onClick={() =>
                    navigate("/user/allrecipes")
                  }
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
