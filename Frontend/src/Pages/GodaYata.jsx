import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GodaYata.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const API_URL = 'http://localhost:5000/menu/getmenu?canteen_id=6761446355efca0108f8d9ef';


export default function GodaYata() {
  const [foodData, setFoodData] = useState(null);
  const [isCanteenOpen, setIsCanteenOpen] = useState(true); // Assuming canteen open status

  useEffect(() => {
    // Fetch the menu data from the backend
    const fetchMenu = async () => {
      try {
        const response = await axios.get(API_URL);
        const menu = response.data.data[0]; // Access the menu data

        // Reshape the data to fit the UI structure
        const reshapedData = {
          mainMeals: menu.main.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            available: item.available,
            description: item.description || '',
          })),
          shortEats: menu.short_eat.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            available: item.available,
          })),
          beverages: menu.beverag.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            available: item.available,
          })),
        };

        setFoodData(reshapedData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

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
      {isCanteenOpen && foodData && (
        <div className="categories-container">
          {Object.entries(foodData).map(([category, items]) => (
            <div key={category} className="category">
              <h2 className="category-title">{category.replace(/([A-Z])/g, ' $1')}</h2>
              <div className="food-items">
                {items.map((food) => (
                  <div key={food.id} className={`food-card ${food.available ? '' : 'unavailable'}`}>
                    <h3 className="food-name">{food.name}</h3>
                    <p className="food-price">Rs. {food.price}</p>
                    <p className="food-availability">
                      {food.available ? 'Available' : 'Not Available'}
                    </p>
                    {food.description && <p className="food-description">{food.description}</p>}
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
