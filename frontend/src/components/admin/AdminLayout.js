
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("usertype");
    navigate("/login");
  };

  return (
    <div>
      <div
        className={`wrapper ${
          sidebarOpen ? "" : "sidebar-collapsed"
        }`}
      >
        {/* Sidebar */}
        <div className="sidebar" data-background-color="dark">
          {/* Sidebar Logo */}
          <div className="sidebar-logo">
            <div className="logo-header" data-background-color="dark">
              <Link to="/admin" className="logo">
                <span
                  className="navbar-brand"
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    letterSpacing: "2px",
                  }}
                >
                  SAVOURA
                </span>
              </Link>
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-secondary">
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <i className="fas fa-home"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/category">
                    <i className="fas fa-list"></i>
                    <p>Category</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin/user">
                    <i className="fas fa-users"></i>
                    <p>Users</p>
                  </Link>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <p>Logout</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="main-panel">
          {/* Header */}
          <div className="main-header">
            <div className="main-header-logo">
              <div className="logo-header" data-background-color="dark">
                <Link to="/admin" className="logo">
                  <span
                    className="navbar-brand"
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#ffffff",
                      letterSpacing: "2px",
                    }}
                  >
                    SAVOURA
                  </span>
                </Link>

                {/* Header Toggle Button */}
                <div className="nav-toggle">
                  <button
                    type="button"
                    onClick={toggleSidebar}
                    aria-label={
                      sidebarOpen ? "Close sidebar" : "Open sidebar"
                    }
                    title={
                      sidebarOpen ? "Close sidebar" : "Open sidebar"
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ffffff",
                      cursor: "pointer",
                      fontSize: "22px",
                    }}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* Top Navbar */}
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
              <div className="container-fluid">
                {/* Main Sidebar Toggle Button */}
                <button
                  type="button"
                  onClick={toggleSidebar}
                  aria-label={
                    sidebarOpen ? "Hide sidebar" : "Show sidebar"
                  }
                  title={
                    sidebarOpen ? "Hide sidebar" : "Show sidebar"
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "42px",
                    height: "42px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#ffffff",
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "24px",
                    flexShrink: 0,
                    marginRight: "15px",
                  }}
                >
                  ☰
                </button>

                <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                  {/* Search */}
                  <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fa fa-search"></i>
                    </a>

                    <ul className="dropdown-menu dropdown-search animated fadeIn">
                      <form
                        className="navbar-left navbar-form nav-search"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Search ..."
                            className="form-control"
                          />
                        </div>
                      </form>
                    </ul>
                  </li>

                  {/* Admin Profile */}
                  <li className="nav-item topbar-user dropdown hidden-caret">
                    <a
                      className="dropdown-toggle profile-pic"
                      data-bs-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="avatar-sm">
                        <img
                          src="/admin/assets/img/adminprofile.png"
                          alt="Admin profile"
                          className="avatar-img rounded-circle"
                        />
                      </div>

                      <span className="profile-username">
                        <span className="fw-bold">Admin</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Page Content */}
          <Outlet />

          {/* Footer */}
          <footer className="footer">
            <div className="container-fluid d-flex justify-content-center">
              <div className="copyright text-center">
                2026, made with{" "}
                <i className="fa fa-heart heart text-danger"></i> by SAVOURA
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
