import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import main from "../assets/main.jpg";
import Food1Image from "../assets/food 1.jpg";
import Food2Image from "../assets/food 2.png";
import Food3Image from "../assets/food 3.jpg";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Welcome() {
  const navigate = useNavigate();

  const handleContactUsClick = () => {
    navigate('/contact');
  };

  return (
    <div className="main-container">
      <Header />
      {/* Hero Section */}
      <section className="welcomehero">
        <div className="content">
          <h1>Mora Click</h1>
          <p>
            "Welcome to Mora Click, your ultimate destination for delicious, mouth-watering dishes crafted with passion and fresh ingredients. From classic Italian cuisines to global favorites, we bring you flavors that delight every palate. Explore our menu, order online, or reserve a table to indulge in an unforgettable dining experience today!"
          </p>
          <div className="buttons">
            <button className="btn-order" onClick={handleContactUsClick}>Contact us</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={main} alt="Main Dish" />
        </div>
      </section>

      {/* Food Carousel Section */}
      <section className="food-carousel">
        <h2>Our Menu</h2>
        <Carousel>
          <Carousel.Item>
            <Link to="/menu"><img className="d-block w-100" src={Food1Image} alt="Main Meals" /></Link>
            <Carousel.Caption>
              <h3>Main Meals</h3>
              <p>Delicious main courses crafted for every taste!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/menu"><img className="d-block w-100" src={Food2Image} alt="Beverages" /></Link>
            <Carousel.Caption>
              <h3>Beverages</h3>
              <p>Refreshing drinks to complement your meal.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/menu"><img className="d-block w-100" src={Food3Image} alt="Short Eats" /></Link>
            <Carousel.Caption>
              <h3>Short Eats</h3>
              <p>Perfect snacks for a quick bite!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <Footer />
    </div>
  );
}
