
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Pages.css";

function About() {
  return (
    <div className="savoura-page">
      <Header />

      <section className="page-hero about-hero">
        <div className="page-overlay">
          <h1>ABOUT SAVOURA</h1>
          <p>
            Discover delicious recipes, cooking inspiration,
            and the joy of preparing amazing food at home.
          </p>
          <Link to="/news" className="hero-button">
            DISCOVER MORE
          </Link>
        </div>
      </section>

      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85"
            alt="Cooking in a modern kitchen"
          />
        </div>

        <div className="about-content">
          <span className="section-subtitle">
            WELCOME TO SAVOURA
          </span>

          <h2>Discover the Art of Cooking</h2>

          <p>
            Savoura is a place for food lovers to discover
            delicious recipes and explore the wonderful world
            of cooking.
          </p>

          <p>
            From everyday meals to special occasions, our
            collection of recipes provides inspiration for
            everyone. Discover new flavours, learn cooking
            techniques, and make every meal memorable.
          </p>

          <Link to="/recipes" className="page-button">
            EXPLORE RECIPES
          </Link>
        </div>
      </section>

      <section className="about-features">
        <div className="feature-item">
          <div className="feature-icon">01</div>
          <h3>Delicious Recipes</h3>
          <p>
            Explore a variety of recipes for every taste
            and occasion.
          </p>
        </div>

        <div className="feature-item">
          <div className="feature-icon">02</div>
          <h3>Cooking Inspiration</h3>
          <p>
            Find new ideas and make your everyday cooking
            more enjoyable.
          </p>
        </div>

        <div className="feature-item">
          <div className="feature-icon">03</div>
          <h3>Made with Love</h3>
          <p>
            Bring family and friends together with
            wonderful homemade food.
          </p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Love Cooking? Join Savoura!</h2>
        <p>
          Start exploring recipes and discover your next
          favourite dish.
        </p>
        <Link to="/registration" className="page-button">
          JOIN US
        </Link>
      </section>
      <Footer />

  
    </div>
  );
}

export default About;
