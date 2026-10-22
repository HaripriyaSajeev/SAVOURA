
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function UserLayout() {
  const location = useLocation();
  const username = localStorage.getItem("username") || "User";

  // Keep the original heading on the dashboard only
  const isDashboard = location.pathname === "/user";

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          <div className="logo-header" data-background-color="dark">
            <Link
              to="/user"
              className="logo"
              style={{
                color: "#ffffff",
                fontSize: "25px",
                fontWeight: "800",
                letterSpacing: "2px",
                textDecoration: "none",
              }}
            >
              SAVOURA
            </Link>
          </div>
        </div>

        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
              <li className="nav-item">
                <Link to="/user">
                  <i className="fas fa-home"></i>
                  <p>Dashboard</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/user/addrecipe">
                  <i className="fas fa-utensils"></i>
                  <p>Add Recipe</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/user/allrecipes">
                  <i className="fas fa-utensils"></i>
                  <p>All Recipes</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/user/savedrecipe">
                  <i className="fas fa-utensils"></i>
                  <p>Saved Recipes</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/login">
                  <i className="fas fa-sign-out-alt"></i>
                  <p>Logout</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div
        className="main-panel"
        style={{ backgroundColor: "#f4f6fc" }}
      >
        {/* Header */}
        <div className="main-header">
          <div className="main-header-logo">
            <div className="logo-header" data-background-color="dark">
              <Link to="/user" className="logo">
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: "22px",
                    fontWeight: "800",
                    letterSpacing: "1px",
                  }}
                >
                  SAVOURA
                </span>
              </Link>
            </div>
          </div>

          <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
            <div className="container-fluid">
              <h4 className="mb-0">
                {isDashboard
                  ? "User Dashboard"
                  : `Hi, ${username}!`}
              </h4>

              <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Visit Website
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* User Page Content */}
        <Outlet />

        {/* Footer */}
        <footer className="footer">
          <div className="container-fluid d-flex justify-content-between">
            <div className="copyright">
              SAVOURA - Recipe Website
            </div>

            <div>
              Made with <i className="fa fa-heart heart text-danger"></i>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default UserLayout;
