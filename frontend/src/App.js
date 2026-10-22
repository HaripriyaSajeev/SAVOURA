
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import About from "./components/About";
import News from "./components/News";

// Admin components
import Admin from "./components/admin/Admin";
import Category from "./components/admin/Category";
import AdminUser from "./components/admin/User";
import AdminLayout from "./components/admin/AdminLayout";
import AdminSavedRecipes from "./components/admin/AdminSavedRecipes";

// User components
import UserPage from "./components/user/User";
import UserLayout from "./components/user/UserLayout";
import AllRecipes from "./components/user/AllRecipes";
import SavedRecipe from "./components/user/SavedRecipe";
import AddRecipe from "./components/user/AddRecipe";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* General Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          {/* Public Recipes Page */}
          <Route path="/recipes" element={<AllRecipes />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="category" element={<Category />} />
            <Route path="user" element={<AdminUser />} />
            <Route
              path="saved-recipes/:userId"
              element={<AdminSavedRecipes />}
            />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<UserPage />} />
            <Route path="allrecipes" element={<AllRecipes />} />
            <Route path="savedrecipe" element={<SavedRecipe />} />
            <Route path="addrecipe" element={<AddRecipe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
