import React from 'react';
import './GodaYata.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import godayata from '../assets/godayata.jpg';
import ChickenBurger from '../assets/Chicken Burger.jpg';
import VeggiePizza from '../assets/Veggie Pizza.png';
import VegRoll from '../assets/Veg Roll.jpg';
import FishPattie from '../assets/Fish Pattie.jpg';
import MangoSmoothie from '../assets/Mango Smoothie.jpg';
import IcedCoffee from '../assets/Iced Coffee.jpg';
import SizzlingBrownie from '../assets/Sizzling Brownie.jpg';
import GodaYataSpecialThali from '../assets/Special Thali.jpg';

const foodData = {
  mainMeals: [
    {
      id: 1,
      name: 'Chicken Burger',
      image: ChickenBurger,
      price: 350,
      available: true,
    },
    {
      id: 2,
      name: 'Veggie Pizza',
      image: VeggiePizza,
      price: 500,
      available: false,
    },
  ],
  beverages: [
    {
      id: 3,
      name: 'Mango Smoothie',
      image: MangoSmoothie,
      price: 200,
      available: true,
    },
    {
      id: 4,
      name: 'Iced Coffee',
      image: IcedCoffee,
      price: 150,
      available: true,
    },
  ],
  shortEats: [
    {
      id: 5,
      name: 'Veg Roll',
      image: VegRoll,
      price: 50,
      available: true,
    },
    {
      id: 6,
      name: 'Fish Pattie',
      image: FishPattie,
      price: 75,
      available: false,
    },
  ],
  specialItems: [
    {
      id: 7,
      name: 'Sizzling Brownie',
      image: SizzlingBrownie,
      price: 250,
      available: true,
    },
    {
      id: 8,
      name: 'Goda Yata Special Thali',
      image: GodaYataSpecialThali,
      price: 650,
      available: true,
    },
  ],
};

const isCanteenOpen = false;  // This can be dynamic, based on time or other conditions

export default function GodaYata() {
  return (
    <>
      <Header />
      <section className="godayatahero">
        <div className="hero-content">
          <h1>Welcome to Goda Yata Canteen</h1>
          <p>Enjoy our variety of delicious meals, refreshing beverages, and tasty short eats.</p>
        </div>
      </section>

      {/* Canteen Status Section */}
      <div className={`canteen-status ${isCanteenOpen ? 'open' : 'closed'}`}>
        <h2>{isCanteenOpen ? 'Canteen is Open' : 'Canteen is Closed'}</h2>
        <p>{isCanteenOpen ? 'Come in and enjoy your meal!' : 'Sorry, we are currently closed. Please visit later!'}</p>
      </div>

      {/* Only show food items if canteen is open */}
      {isCanteenOpen && (
        <div className="categories-container">
          {Object.entries(foodData).map(([category, items]) => (
            <div key={category} className="category">
              <h2 className="category-title">{category.replace(/([A-Z])/g, ' $1')}</h2>
              <div className="food-items">
                {items.map((food) => (
                  <div key={food.id} className={`food-card ${food.available ? '' : 'unavailable'}`}>
                    <img src={food.image} alt={food.name} className="food-image" />
                    <h3 className="food-name">{food.name}</h3>
                    <p className="food-price">Rs. {food.price}</p>
                    <p className="food-availability">
                      {food.available ? 'Available' : 'Not Available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
