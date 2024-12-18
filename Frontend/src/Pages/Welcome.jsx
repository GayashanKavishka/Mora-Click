import React from 'react'
import './Welcome.css'
import main from "../assets/main.jpg"; // Add your spaghetti image here
import Food1Image from "../assets/food1.jpg"; // Add other food images
import Food2Image from "../assets/food2.jpg";
import Food3Image from "../assets/food3.jpeg";


export default function Welcome() {
    return (
        <div className="main-container">
          {/* Navigation Bar */}
          <header className="navbar">
            <div className="logo">logo</div>
            <nav>
              <a href="#">Home</a>
              <a href="#">Menu</a>
              <a href="#">About Us</a>
              <a href="#">Canteens</a>
              <a href="#">Contact Us</a>
            </nav>
            <button className="login-button">Log in</button>
          </header>
    
          {/* Hero Section */}
          <section className="hero">
            <div className="content">
              
              <h1>Mora Click</h1>
              <p>
              "Welcome to Mora Click, your ultimate destination for delicious, mouth-watering dishes crafted with passion and fresh ingredients. From classic Italian cuisines to global favorites, we bring you flavors that delight every palate. Explore our menu, order online, or reserve a table to indulge in an unforgettable dining experience today!"
              </p>
              <div className="buttons">
                <button className="btn-order">Contact us</button>
              </div>
            </div>
            <div className="hero-image">
              <img src={main} alt="Spaghetti" />
            </div>
          </section>
    
          {/* Food Gallery */}
          <section className="food-gallery">
            <div className="food-card">
              <img src={Food1Image} alt="Food 1" />
            </div>
            <div className="food-card">
              <img src={Food2Image} alt="Food 2" />
            </div>
            <div className="food-card">
              <img src={Food3Image} alt="Food 3" />
            </div>
          </section>
        </div>
      );
}
