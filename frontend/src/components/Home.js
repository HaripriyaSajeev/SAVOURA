import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Home() {
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
                  Discover delicious recipes, learn new cooking techniques, and
                  explore amazing dishes prepared by expert chefs.
                </p>
                <p>
                  <a href="#" className="btn btn-white btn-outline-white">
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
                <h1>Delecious Food</h1>
                <p className="mb-5">
                  Discover delicious recipes and explore a world of amazing
                  flavours. Learn new cooking techniques, find inspiration for
                  your next meal, and enjoy creating delicious dishes at home.
                </p>
                <p>
                  <a href="#" className="btn btn-white btn-outline-white">
                    Get Started
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light element-animate">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
              <span className="flaticon-cheers display-4 text-black d-block mb-4"></span>
              <h4 className="mb-4 text-primary">Beverages</h4>
              <p>
                Explore refreshing beverages, from delicious fruit juices and
                smoothies to aromatic coffees and soothing teas. Find the
                perfect drink to refresh your day!
              </p>
            </div>
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
              <span className="flaticon-fish display-4 text-black d-block mb-4"></span>
              <h4 className="mb-4 text-primary">Meat N SeaFoods</h4>
              <p>
                Discover a delicious variety of meat and seafood dishes, from
                juicy grilled chicken and tender meats to fresh fish and
                flavorful prawns. Enjoy mouthwatering recipes for every
                occasion!
              </p>
            </div>
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
              <span className="flaticon-coffee-cup display-4 text-black d-block mb-4"></span>
              <h4 className="mb-4 text-primary">sweet Treat</h4>
              <p>
                Indulge in a delightful collection of sweet treats, from creamy
                cakes and delicious pastries to rich chocolates and
                mouthwatering desserts. Discover the perfect sweetness to make
                every moment special!
              </p>
            </div>
            <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
              <span className="flaticon-salad display-4 text-black d-block mb-4"></span>
              <h4 className="mb-4 text-primary">Vegetarian</h4>
              <p>
                Explore a variety of delicious vegetarian recipes made with
                fresh vegetables, wholesome ingredients, and aromatic spices.
                From healthy salads to flavorful curries, discover tasty dishes
                for every meal!.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section element-animate">
        <div className="clearfix mb-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center heading-wrap">
                <h2>Special Dishes</h2>
                <span className="back-text " style={{ color: "#f8f2c4" }}>
                  Dishes
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="owl-carousel centernonloop">
          <a href="#" className="item-dishes">
            <div className="text">
              <h2 className="dishes-heading">baked bow-tie pasta </h2>
            </div>
            <img src="/home/img/dishes_1.jpg" alt="" className="img-fluid" />
          </a>
          <a href="#" className="item-dishes">
            <div className="text">
              <h2 className="dishes-heading">Khao Moo Daeng</h2>
            </div>
            <img src="/home/img/dishes_2.jpg" alt="" className="img-fluid" />
          </a>
          <a href="#" className="item-dishes">
            <div className="text">
              <h2 className="dishes-heading"> Spaghetti Carbonara</h2>
            </div>
            <img src="/home/img/dishes_3.jpg" alt="" className="img-fluid" />
          </a>
          <a href="#" className="item-dishes">
            <div className="text">
              <h2 className="dishes-heading">grilled pork chops</h2>
            </div>
            <img src="/home/img/dishes_4.jpg" alt="" className="img-fluid" />
          </a>
        </div>
      </section>

      <section className="section bg-light element-animate">
        <div className="clearfix mb-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center heading-wrap">
                <h2>Most Liked </h2>
                <span className="back-text" style={{ color: "#f8f2c4" }}>
                  Menu
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-6">
              <div className="sched d-block d-lg-flex">
                <div
                  className="bg-image order-2"
                  style={{
                    backgroundImage:
                      "url('/home/img/caesar-salad-opengraph.jpg')",
                  }}
                ></div>
                <div className="text order-1">
                  <h3>Grilled Caesar salad, shaved reggiano</h3>
                  <p>
                    Enjoy a fresh and delicious grilled Caesar salad topped with
                    crisp lettuce, crunchy croutons, and shaved Reggiano cheese.
                    Tossed in a creamy Caesar dressing, it's a perfect blend of
                    freshness and flavor....
                  </p>
                </div>
              </div>

              <div className="sched d-block d-lg-flex">
                <div
                  className="bg-image"
                  style={{ backgroundImage: "url('/home/img/images2.jpg')" }}
                ></div>
                <div className="text">
                  <h3>Spicy Calamari and beans</h3>
                  <p>
                    Enjoy tender calamari cooked with fresh beans, aromatic
                    herbs, and flavorful spices. This delicious seafood dish
                    combines fresh ingredients and rich flavors to create a
                    satisfying meal....
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="sched d-block d-lg-flex">
                <div
                  className="bg-image order-2"
                  style={{ backgroundImage: "url('/home/img/images (1).jpg')" }}
                ></div>
                <div className="text order-1">
                  <h3>Bacon wrapped wild gulf prawns</h3>
                  <p>
                    Enjoy juicy wild Gulf prawns wrapped in crispy, smoky bacon.
                    Seasoned with delicious spices and grilled to perfection,
                    this mouthwatering seafood dish is a perfect combination of
                    rich flavors and irresistible taste...
                  </p>
                </div>
              </div>

              <div className="sched d-block d-lg-flex">
                <div
                  className="bg-image"
                  style={{ backgroundImage: "url('/home/img/images3.jpg')" }}
                ></div>
                <div className="text">
                  <h3>Seared ahi tuna fillet*, honey-ginger sauce</h3>
                  <p>
                    Enjoy perfectly seared ahi tuna fillet served with a
                    delicious honey-ginger sauce. The combination of tender
                    tuna, sweet honey, and fresh ginger creates a flavorful dish
                    with a perfect balance of sweetness and spice...
                  </p>
                </div>
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
                <h2>Testimonial</h2>
                <span className="back-text" style={{ color: "#f8f2c4" }}>
                  Testimonial
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <blockquote className="testimonial">
                <p>
                  &ldquo; "SAVOURA has made cooking more enjoyable for me! The
                  recipes are easy to follow, delicious, and perfect for trying
                  something new every day. I love discovering new dishes and
                  flavors." &rdquo;
                </p>
                <div className="d-flex author">
                  <img src="/home/img/person_1.jpg" alt="" className="mr-4" />
                  <div className="author-info">
                    <h4>Mellisa Howard</h4>
                    <p>CEO, XYZ Company</p>
                  </div>
                </div>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="testimonial">
                <p>
                  &ldquo; "I absolutely love using SAVOURA to discover new
                  recipes! The instructions are simple to follow, and every dish
                  inspires me to try new flavors. It's my favorite place to find
                  delicious meal ideas for my family." &rdquo;
                </p>
                <div className="d-flex author">
                  <img src="/home/img/person_2.jpg" alt="" className="mr-4" />
                  <div className="author-info">
                    <h4>Mike Richardson</h4>
                    <p>CEO, XYZ Company</p>
                  </div>
                </div>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="testimonial">
                <p>
                  &ldquo; "SAVOURA is a wonderful platform for anyone who loves
                  cooking. The variety of recipes makes it easy to find
                  something delicious for every occasion. I've discovered many
                  new dishes and enjoy preparing them for my friends and
                  family." &rdquo;
                </p>
                <div className="d-flex author">
                  <img src="/home/img/person_3.jpg" alt="" className="mr-4" />
                  <div className="author-info">
                    <h4>Charles White</h4>
                    <p>CEO, XYZ Company</p>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section element-animate">
        <div className="clearfix mb-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center heading-wrap">
                <h2>Blog</h2>
                <span className="back-text" style={{ color: "#f8f2c4" }}>
                  Our Blog
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="blog d-block d-lg-flex">
                <div
                  className="bg-image"
                  style={{ backgroundImage: "url('/home/img/dishes_1.jpg')" }}
                ></div>
                <div className="text">
                  <h3>How to cook beef steak with sauce</h3>
                  <p className="sched-time">
                    <span>
                      <span className="fa fa-calendar"></span> April 22, 2018
                    </span>{" "}
                    <br />
                  </p>
                  <p>
                    Learn how to prepare a juicy and tender beef steak served
                    with a rich, flavorful sauce. Follow simple cooking steps to
                    create a delicious restaurant-style meal that's perfect for
                    special occasions or a satisfying dinner...
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="blog d-block d-lg-flex">
                <div
                  className="bg-image"
                  style={{ backgroundImage: "url('/home/img/dishes_2.jpg')" }}
                ></div>
                <div className="text">
                  <h3>How to cook beef steak with sauce</h3>
                  <p className="sched-time">
                    <span>
                      <span className="fa fa-calendar"></span> April 22, 2018
                    </span>{" "}
                    <br />
                  </p>
                  <p>
                    Discover how to cook a delicious beef steak with a rich and
                    savory sauce. Learn simple cooking techniques to prepare
                    tender, juicy steak with perfect seasoning and mouthwatering
                    flavors. Enjoy a restaurant-style meal right at home!..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="row">
                <form action="" className="col-12">
                  <div className="row align-items-center"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
