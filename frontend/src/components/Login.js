
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const $ = window.jQuery;

      if ($ && $.fn && $.fn.owlCarousel) {
        $(".home-slider").each(function () {
          const slider = $(this);

          if (!slider.hasClass("owl-loaded")) {
            slider.owlCarousel({
              items: 1,
              loop: true,
              autoplay: true,
              autoplayTimeout: 5000,
              smartSpeed: 1000,
            });
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("LOGIN API RESPONSE:", response.data);

      const username = response.data.username;
      const usertype = (
        response.data.usertype || "user"
      ).toLowerCase();

      const userId = response.data.userId;

      if (!userId) {
        console.error(
          "Backend response does not contain userId:",
          response.data
        );

        alert(
          "Login response is missing the user ID. Please check the backend login controller."
        );

        return;
      }

      // Store logged-in user details
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username || "");
      localStorage.setItem("usertype", usertype);

      // Admin login
      if (usertype === "admin") {
        alert("Admin login successful!");
        navigate("/admin");
        return;
      }

      // Normal user login
      alert("Login successful!");
      navigate("/user");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />

      {/* Hero Slider */}
      <section className="home-slider owl-carousel">
        <div
          className="slider-item"
          style={{
            backgroundImage: "url('/home/img/hero_1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "600px",
            width: "100%",
          }}
        >
          <div className="container">
            <div className="row slider-text align-items-center justify-content-center">
              <div className="col-md-8 text-center col-sm-12 element-animate">
                <h1>Expert Chefs</h1>

                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Commodi unde impedit, necessitatibus, soluta sit quam minima
                  expedita atque corrupti reiciendis.
                </p>

                <p>
                  <a
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    className="btn btn-white btn-outline-white"
                  >
                    Get Started
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="slider-item"
          style={{
            backgroundImage: "url('/home/img/hero_2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "600px",
            width: "100%",
          }}
        >
          <div className="container">
            <div className="row slider-text align-items-center justify-content-center">
              <div className="col-md-8 text-center col-sm-12 element-animate">
                <h1>Delicious Food</h1>

                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Commodi unde impedit, necessitatibus, soluta sit quam minima
                  expedita atque corrupti reiciendis.
                </p>

                <p>
                  <a
                    href="/"
                    onClick={(e) => e.preventDefault()}
                    className="btn btn-white btn-outline-white"
                  >
                    Get Started
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <section className="section element-animate">
        <div className="clearfix mb-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center heading-wrap">
                <h2>Welcome Back!</h2>
                <span className="back-text "style={{ color: "#f8f2c4" }}>LOGIN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>

                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <Link to="/registration">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Login;
