
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function AdminSavedRecipes() {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = location.state?.username || "User";

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/saved",
          {
            params: { userId: userId }
          }
        );

        setRecipes(
          Array.isArray(response.data)
            ? response.data
            : response.data.savedRecipes || []
        );
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
        setError("Unable to load saved recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [userId]);

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/admin")}
      >
        Back to Users
      </button>

      <h2>Saved Recipes</h2>
      <h5 className="text-muted mb-4">
        User: {username}
      </h5>

      {loading && <p>Loading saved recipes...</p>}

      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p>This user has not saved any recipes yet.</p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>No.</th>
                <th>Recipe Image</th>
                <th>Recipe Name</th>
                <th>Category</th>
                <th>Date Saved</th>
              </tr>
            </thead>

            <tbody>
              {recipes.map((item, index) => {
                const recipe = item.recipeId;

                if (!recipe || typeof recipe !== "object") {
                  return (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>
                      <td colSpan="4">
                        Recipe details are unavailable.
                      </td>
                    </tr>
                  );
                }

                const image = recipe.image
                  ? `http://localhost:5000/uploads/${recipe.image}`
                  : "";

                const category =
                  recipe.catid && typeof recipe.catid === "object"
                    ? recipe.catid.catname
                    : recipe.catname || "N/A";

                return (
                  <tr key={item._id || index}>
                    <td>{index + 1}</td>

                    <td>
                      {image ? (
                        <img
                          src={image}
                          alt={recipe.recipename || "Recipe"}
                          width="80"
                          height="60"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>

                    <td>
                      {recipe.recipename ||
                        recipe.recipeName ||
                        recipe.name ||
                        "Unnamed Recipe"}
                    </td>

                    <td>{category}</td>

                    <td>
                      {item.savedDate
                        ? new Date(item.savedDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminSavedRecipes;
