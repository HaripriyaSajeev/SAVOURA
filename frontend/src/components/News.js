
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
 import Footer from "./Footer";

import "./Pages.css";

const newsItems = [
  {
    category: "HEALTHY FOOD",
    title: "Fresh and Healthy Eating",
    description:
      "Discover simple ways to include fresh ingredients and healthy choices in your everyday meals.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "COOKING TIPS",
    title: "Make Cooking More Enjoyable",
    description:
      "Learn practical kitchen tips to make preparing your favourite dishes easier and more enjoyable.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "RECIPE IDEAS",
    title: "Bring New Flavours to Your Table",
    description:
      "Explore new meal ideas and discover inspiration for your next cooking adventure.",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },
];

function News() {
  return (
    <div className="savoura-page">
      <Header />

      <section className="page-hero news-hero">
        <div className="page-overlay">
          <h1>FOOD &amp; RECIPE NEWS</h1>
          <p>
            Discover food trends, cooking tips, and delicious
            inspiration from the world of food.
          </p>
          <a href="#latest-news" className="hero-button">
            READ LATEST NEWS
          </a>
        </div>
      </section>

      <section className="news-section" id="latest-news">
        <div className="news-heading">
          <span className="section-subtitle">
            FROM OUR KITCHEN
          </span>
          <h2>Latest Food Stories</h2>
          <p>
            Get inspired with fresh ideas, useful cooking tips,
            and new recipes.
          </p>
        </div>

        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article className="news-card" key={item.title}>
              <div className="news-image">
                <img src={item.image} alt={item.title} />
                <span className="news-number">
                  0{index + 1}
                </span>
              </div>

              <div className="news-card-content">
                <span className="news-category">
                  {item.category}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <Link to="/recipes" className="news-link">
                  EXPLORE RECIPES <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="news-cta">
        <div>
          <span className="section-subtitle">
            YOUR NEXT FAVOURITE DISH
          </span>
          <h2>Let's Make Something Delicious</h2>
          <p>
            Explore our recipe collection and find inspiration
            for your next meal.
          </p>
        </div>

        <Link to="/registration" className="page-button">
          GET STARTED
        </Link>
      </section>
      <Footer />

    </div>
  );
}

export default News;
