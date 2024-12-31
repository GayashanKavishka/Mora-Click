import React, { useEffect, useState } from "react";
import "./Menu.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";

// Define canteen IDs for fetching menu data
// const canteenIds = [
//   "6761446355efca0108f8d9ef",
//   "6761446355efca0108f8d9f0",
//   "6761446355efca0108f8d9f2",
//   "6761446355efca0108f8d9f1",
// ];

// const canteenInfo = {
//   "Goda Yata" : "6761446355efca0108f8d9ef" ,
//   "Goda Uda" : "6761446355efca0108f8d9f0" ,
//   "Staff Canteen" : "6761446355efca0108f8d9f2" ,
//   "Civil Canteen" : "6761446355efca0108f8d9f1" ,
// }









const Menu = () => {
  const [menuData, setMenuData] = useState({
    main: [],
    shortEat: [],
    beverage: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling


  const [canteenIds, setCanteenIds] = useState([]);
  const [canteenInfo, setCanteenInfo] = useState({});


const GetCanteenIds = async () => {
  try {
    const response = await axios.get("http://localhost:5000/canteen/getallcanteens");
    console.log("Canteen data:", response.data.data);
    const canteenIds = response.data.data.map((canteen) => canteen._id);
    const canteenInfo = response.data.data.reduce((acc, canteen) => {
      acc[canteen._id] = canteen.name;
      return acc;
    }
    , {});
    setCanteenIds(canteenIds);
    setCanteenInfo(canteenInfo);
    console.log("Canteen data:", canteenInfo);

  } catch (error) {
    console.error("Error fetching canteen data:", error);
  }
};

const canteenname = (canteen_Id)=>
{
    // return Object.keys(canteenInfo).find(key => canteenInfo[key] === canteen_Id) || "Unknown Canteen";
      return canteenInfo[canteen_Id] || "Unknown Canteen";
    

}


  



  const fetchMenuData = async () => {
    try {
      console.log("Fetching menu data...");
      const requests = canteenIds.map((canteenId) =>
        axios.get(`http://localhost:5000/menu/getmenu?canteen_id=${canteenId}`)
      );
      const responses = await Promise.all(requests);
  
      // Combine data from all responses and add canteen_id to each item
      const allMenuData = responses.flatMap((response, index) => {
        const canteenId = canteenIds[index]; // Get the corresponding canteen ID
        return response.data.data.map((menu) => ({
          ...menu,
          canteen_id: canteenId, // Add the canteen_id to each menu
        }));
      });
  
      // Process and group menu items
      const mainMeals = allMenuData.flatMap(menu =>
        (menu.main || []).map(item => ({ ...item, canteen_id: menu.canteen_id }))
      );
      const shortEats = allMenuData.flatMap(menu =>
        (menu.short_eat || []).map(item => ({ ...item, canteen_id: menu.canteen_id }))
      );
      const beverages = allMenuData.flatMap(menu =>
        (menu.beverage || []).map(item => ({ ...item, canteen_id: menu.canteen_id }))
      );
  
      setMenuData({ main: mainMeals, shortEat: shortEats, beverage: beverages });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setError("There was an issue fetching the menu data. Please try again later.");
      setLoading(false);
    }
  };
  
  
  // useEffect(() => {
  //   const fetchIds = async () => {
  //     try {
  //        await GetCanteenIds();
  //     } catch (error) {
  //       console.error("Error fetching canteen data:", error);
  //     }
  //   };

  //   fetchIds();
  //   fetchMenuData();
  //   console.log("hello",menuData);
  //   // console.log("hello",menuData);
  // }, []);

  useEffect(() => {
    const fetchIdsAndMenu = async () => {
      try {
        // Fetch the canteen IDs first
        await GetCanteenIds();
        
        // After fetching IDs, ensure the menu data is fetched
        if (canteenIds.length > 0) {
          await fetchMenuData();
        }
      } catch (error) {
        console.error("Error during fetching process:", error);
      }
    };
  
    fetchIdsAndMenu();
  }, [canteenIds]);
  

  if (loading) {
    return <p>loading</p>;
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
            {menuData.main.map(item => ( !item.available ? null :
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/150"} // Fallback image
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-canteen">Available at:{canteenname(item.canteen_id)} </p>
              </div>
            ))}
          </div>
        </div>

        {/* Short Eats Category */}
        <div className="menu-category">
          <h2 className="categorymenu-title">Short Eats</h2>
          <div className="menu-items">
            {menuData.shortEat.map(item => ( !item.available ? null :
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/150"} // Fallback image
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-canteen">Available at: {canteenname(item.canteen_id)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beverages Category */}
        <div className="menu-category">
          <h2 className="categorymenu-title">Beverages</h2>
          <div className="menu-items">
            {menuData.beverage.map(item => ( !item.available ? null :
              <div className="menu-item" key={item._id}>
                <img
                  src={item.image || "https://via.placeholder.com/150"} // Fallback image
                  alt={item.name}
                  className="item-image"
                />
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Rs. {item.price}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-canteen">Available at: {canteenname(item.canteen_id)}</p>
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