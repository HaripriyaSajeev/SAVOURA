import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    password: "",
    gender: "",
    address: "",
  });

  const [image, setImage] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phonenumber", formData.phonenumber);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("gender", formData.gender);
      data.append("address", formData.address);
      if (image) {
        data.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(response.data.message || "Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const $ = window.jQuery;

      if ($ && $.fn.owlCarousel) {
        // Hero Slider
        const homeSlider = $(".home-slider");

        if (!homeSlider.hasClass("owl-loaded")) {
          homeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            nav: false,
            dots: true,
          });
        }

        // Special Dishes Slider
        const dishesSlider = $(".centernonloop");

        if (!dishesSlider.hasClass("owl-loaded")) {
          dishesSlider.owlCarousel({
            center: true,
            items: 1,
            loop: true,
            margin: 30,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 800,
            nav: false,
            dots: true,
            responsive: {
              0: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 3,
              },
            },
          });
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <Header />

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
                  <Link
                    to="/registration"
                    className="btn btn-white btn-outline-white"
                  >
                    Get Started
                  </Link>
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
                <h1>Delecious Food</h1>
                <p className="mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Commodi unde impedit, necessitatibus, soluta sit quam minima
                  expedita atque corrupti reiciendis.
                </p>
                <p>
                  <Link
                    to="/registration"
                    className="btn btn-white btn-outline-white"
                  >
                    Get Started
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section element-animate">
        <div className="clearfix mb-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center heading-wrap">
                <h2>Get In Touch</h2>
                <span className="back-text "style={{ color: "#f8f2c4" }}>Register </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form onSubmit={handleSubmit} action="#" method="post">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phonenumber"
                      className="form-control"
                      maxLength="10"
                      value={formData.phonenumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="gender">Gender</label>
                    <br />
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />{" "}
                    Male &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />{" "}
                    Female
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="message">Address</label>
                    <textarea
                      name="address"
                      id="address"
                      className="form-control"
                      cols="30"
                      rows="8"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="submit"
                      value="save"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Registration;
