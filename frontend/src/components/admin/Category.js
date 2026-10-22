import React, { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    catname: "",
    description: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:5000/api/category";

  // Fetch categories from MongoDB
  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Unable to load categories. Check your backend.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        setMessage("Category updated successfully!");
      } else {
        await axios.post(`${API_URL}/add`, formData);
        setMessage("Category added successfully!");
      }

      setFormData({
        catname: "",
        description: "",
        status: "Active",
      });

      setEditId(null);
      await fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      setError(err.response?.data?.message || "Unable to save category.");
    }
  };

  // Edit category
  const handleEdit = (category) => {
    setFormData({
      catname: category.catname || "",
      description: category.description || "",
      status: category.status || "Active",
    });

    setEditId(category._id);
    setMessage("");
    setError("");
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      await axios.delete(`${API_URL}/${id}`);
      setMessage("Category deleted successfully!");
      await fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
      setError(err.response?.data?.message || "Unable to delete category.");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({
      catname: "",
      description: "",
      status: "Active",
    });

    setEditId(null);
    setError("");
    setMessage("");
  };

  return (
    <div
      className="container-fluid"
      style={{
        paddingTop: "30px",
        paddingBottom: "50px",
        minHeight: "calc(100vh - 180px)",
      }}
    >
      <h3 className="mb-4">Manage Categories</h3>

      {message && <div className="alert alert-success">{message}</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row align-items-start">
        {/* Category Form - 7 columns */}
        <div className="col-md-7">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">
                {editId ? "Edit Category" : "Add Category"}
              </h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Category Name</label>
                  <input
                    type="text"
                    name="catname"
                    className="form-control"
                    value={formData.catname}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter category description"
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Status</label>
                  <select
                    name="status"
                    className="form-control"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary me-2">
                  {editId ? "Update Category" : "Add Category"}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Category List - 5 columns */}
        <div className="col-md-5">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Category List</h5>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Category Name</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr key={category._id}>
                          <td>{index + 1}</td>
                          <td>{category.catname}</td>
                          <td>{category.status}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-warning mb-1 me-1"
                              onClick={() => handleEdit(category)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger mb-1"
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No categories found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
