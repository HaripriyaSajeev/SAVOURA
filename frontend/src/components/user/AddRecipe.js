
import React, { useState, useEffect } from "react";
import axios from "axios";

function AddRecipe() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    catid: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoryError("");

        const response = await axios.get(
          "http://localhost:5000/api/category"
        );

        const categoryData = Array.isArray(response.data)
          ? response.data
          : response.data?.categories || [];

        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError(
          "Unable to load categories. Please check the backend."
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle text fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files?.[0] || null);
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      ingredients: "",
      catid: "",
      createdAt: new Date().toISOString().split("T")[0],
    });

    setImage(null);

    const fileInput = document.getElementById("recipeImage");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Submit recipe
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get logged-in user's ID
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in before adding a recipe.");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter a recipe title.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter a recipe description.");
      return;
    }

    if (!formData.ingredients.trim()) {
      alert("Please enter the recipe ingredients.");
      return;
    }

    if (!formData.catid) {
      alert("Please select a recipe category.");
      return;
    }

    if (!image) {
      alert("Please select a recipe image.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("description", formData.description.trim());
      data.append("ingredients", formData.ingredients.trim());
      data.append("catid", formData.catid);
      data.append("image", image);

      // Important: store the creator's ID with the recipe
      data.append("userid", userId);

      if (formData.createdAt) {
        data.append(
          "createdAt",
          new Date(formData.createdAt).toISOString()
        );
      }

      const response = await axios.post(
        "http://localhost:5000/api/recipe/addrecipe",
        data
      );

      alert(
        response.data.message || "Recipe added successfully!"
      );

      clearForm();
    } catch (error) {
      console.error(
        "Error adding recipe:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Unable to add recipe. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="pt-2 pb-4 text-center">
          <h3 className="fw-bold mb-3">Add Recipe</h3>
          <p className="text-muted">
            Share a new recipe with the SAVOURA community.
          </p>
        </div>

        <div className="card card-round">
          <div className="card-header">
            <h4 className="card-title text-center">
              Recipe Details
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Recipe Title */}
              <div className="form-group mb-4">
                <label htmlFor="title">Recipe Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter recipe title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-group mb-4">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Describe your recipe"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Ingredients */}
              <div className="form-group mb-4">
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  className="form-control"
                  placeholder="Enter ingredients separated by commas"
                  rows="4"
                  value={formData.ingredients}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group mb-4">
                <label htmlFor="catid">Recipe Category</label>

                <select
                  id="catid"
                  name="catid"
                  className="form-control"
                  value={formData.catid}
                  onChange={handleChange}
                  required
                  disabled={
                    categoriesLoading || categories.length === 0
                  }
                >
                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select a category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.catname}
                    </option>
                  ))}
                </select>

                {categoryError && (
                  <p className="text-danger mt-2">
                    {categoryError}
                  </p>
                )}

                {!categoriesLoading &&
                  !categoryError &&
                  categories.length === 0 && (
                    <p className="text-danger mt-2">
                      No categories found. Please add a category
                      through the Admin Category page.
                    </p>
                  )}
              </div>

              {/* Created Date */}
              <div className="form-group mb-4">
                <label htmlFor="createdAt">Created At</label>
                <input
                  id="createdAt"
                  type="date"
                  name="createdAt"
                  className="form-control"
                  value={formData.createdAt}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Recipe Image */}
              <div className="form-group mb-4">
                <label htmlFor="recipeImage">Recipe Image</label>
                <input
                  type="file"
                  id="recipeImage"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />

                {image && (
                  <p className="text-muted mt-2">
                    Selected image: {image.name}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || categoriesLoading}
              >
                {loading ? "Adding Recipe..." : "Add Recipe"}
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={clearForm}
                disabled={loading}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRecipe;
