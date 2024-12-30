import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Welcome.css';
import main from "../assets/main.jpg"; // Main image
import Food1Image from "../assets/food1.jpg"; // Food image 1
import Food2Image from "../assets/food2.jpg"; // Food image 2
import Food3Image from "../assets/food3.jpeg"; // Food image 3
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Welcome() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleContactUsClick = () => {
    navigate('/contact'); // Navigate to the Contact Us page
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

      {/* Food Sections */}
      <section className="food-sections">
        <div className="food-category">
          <h2>Main Meals</h2>
          <Link to="/menu"><img src={Food1Image} alt="Main Meal" /></Link>
        </div>
        <div className="food-category">
          <h2>Beverages</h2>
          <Link to="/menu"><img src={Food2Image} alt="Beverages" /></Link>
        </div>
        <div className="food-category">
          <h2>Short Eats</h2>
          <Link to="/menu"><img src={Food3Image} alt="Short Eats" /></Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
