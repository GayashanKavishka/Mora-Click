import React, { useEffect, useState } from "react";
import "./Menu.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";

// Define canteen IDs for fetching menu data
const canteenIds = [
  "6761446355efca0108f8d9ef",
  "6761446355efca0108f8d9f0",
  "6761446355efca0108f8d9f2",
  "6761446355efca0108f8d9f1",
];

const Menu = () => {
  const [menuData, setMenuData] = useState({
    main: [],
    shortEat: [],
    beverage: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  // Fetch menu items for all canteens
  const fetchMenuData = async () => {
    try {
      const requests = canteenIds.map((canteenId) =>
        axios.get(`http://localhost:5000/menu/getmenu?canteen_id=${canteenId}`)
      );
      const responses = await Promise.all(requests);
      
      const allMenuData = responses.map(response => response.data);

      // Process and combine all canteen data into one object
      const mainMeals = allMenuData.flatMap(data => data.main || []);
      const shortEats = allMenuData.flatMap(data => data.short_eat || []);
      const beverages = allMenuData.flatMap(data => data.beverage || []);

      setMenuData({ main: mainMeals, shortEat: shortEats, beverage: beverages });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setError("There was an issue fetching the menu data. Please try again later."); // Set error message
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  if (loading) {
    return <p>Loading menu items...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there was an error
  }

  return (
    <>
      <Header />
      <div className="menuhero-container">
        <div className="menuhero-content">
          <h1 className="menuhero-title">Explore Our Delicious Menu</h1>
          <p className="menuhero-description">
            Discover a variety of mouthwatering dishes, refreshing beverages, and delightful short eats from your favorite canteens.
          </p>
        </div>
      </div>
      <div className="menu-container">
        {/* Main Meal Category */}
        <div className="menu-category">
          <h2 className="categorymenu-title">Main Meal</h2>
          <div className="menu-items">
            {menuData.main.map(item => (
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/150"} // Fallback image
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-canteen">Available at: {item.canteen_id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Short Eats Category */}
        <div className="menu-category">
          <h2 className="categorymenu-title">Short Eats</h2>
          <div className="menu-items">
            {menuData.shortEat.map(item => (
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/150"} // Fallback image
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-canteen">Available at: {item.canteen_id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beverages Category */}
        <div className="menu-category">
          <h2 className="categorymenu-title">Beverages</h2>
          <div className="menu-items">
            {menuData.beverage.map(item => (
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/150"} // Fallback image
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-canteen">Available at: {item.canteen_id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Menu;
