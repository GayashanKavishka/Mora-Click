// FoodMenu.js
import React from "react";
import "./Menu.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const menuItems = [
  {
    category: "Main Meal",
    items: [
      {
        id: 1,
        name: "Chicken Rice",
        price: "Rs.400",
        canteen: "Canteen A",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        name: "Beef Burger",
        price: "Rs.300",
        canteen: "Canteen B",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 1,
        name: "Chicken Rice",
        price: "Rs.400",
        canteen: "Canteen A",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        name: "Beef Burger",
        price: "Rs.300",
        canteen: "Canteen B",
        image: "https://via.placeholder.com/150"
      }

      
    ]
  },
  {
    category: "Beverages",
    items: [
      {
        id: 3,
        name: "Iced Coffee",
        price: "Rs.150",
        canteen: "Canteen C",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 4,
        name: "Green Tea",
        price: "Rs.100",
        canteen: "Canteen A",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 3,
        name: "Iced Coffee",
        price: "Rs.150",
        canteen: "Canteen C",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 4,
        name: "Green Tea",
        price: "Rs.100",
        canteen: "Canteen A",
        image: "https://via.placeholder.com/150"
      }
    ]
  },
  {
    category: "Short Eats",
    items: [
      {
        id: 5,
        name: "Spring Rolls",
        price: "Rs.50",
        canteen: "Canteen B",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 6,
        name: "Samosa",
        price: "Rs.30",
        canteen: "Canteen C",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 5,
        name: "Spring Rolls",
        price: "Rs.50",
        canteen: "Canteen B",
        image: "https://via.placeholder.com/150"
      },
      {
        id: 6,
        name: "Samosa",
        price: "Rs.30",
        canteen: "Canteen C",
        image: "https://via.placeholder.com/150"
      }
    ]
  }
];



const Menu = () => {
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
          {menuItems.map((category, index) => (
            <div className="menu-category" key={index}>
              <h2 className="categorymenu-title">{category.category}</h2>
              <div className="menu-items">
                {category.items.map((item) => (
                  <div className="menu-item" key={item.id}>
                    <img src={item.image} alt={item.name} className="item-image" />
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                    <p className="item-canteen">Available at: {item.canteen}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  };
  

export default Menu;
