
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  // Hide Login and Registration only on User All Recipes
  const isUserRecipesPage =
    location.pathname === "/user/allrecipes";

  return (
    <header role="banner">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          {/* Logo */}
          <Link
            className="navbar-brand"
            to="/"
            onClick={closeMenu}
          >
            SAVOURA
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="navbarsExample05"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div
            className={`collapse navbar-collapse ${
              menuOpen ? "show" : ""
            }`}
            id="navbarsExample05"
          >
            <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
              {/* HOME */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/")}`}
                  to="/"
                  onClick={closeMenu}
                >
                  HOME
                </Link>
              </li>

              {/* RECIPES */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/recipes")}`}
                  to="/recipes"
                  onClick={closeMenu}
                >
                  RECIPES
                </Link>
              </li>

              {/* ABOUT */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/about")}`}
                  to="/about"
                  onClick={closeMenu}
                >
                  ABOUT
                </Link>
              </li>

              {/* NEWS */}
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/news")}`}
                  to="/news"
                  onClick={closeMenu}
                >
                  NEWS
                </Link>
              </li>
            </ul>

            {/* Login and Registration: public pages only */}
            {!isUserRecipesPage && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item cta-btn mr-2">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={closeMenu}
                  >
                    LOGIN
                  </Link>
                </li>

                <li className="nav-item cta-btn">
                  <Link
                    className="nav-link"
                    to="/registration"
                    onClick={closeMenu}
                  >
                    REGISTRATION
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
