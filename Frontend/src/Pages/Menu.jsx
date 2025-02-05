
import React, { useEffect, useState,useRef} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./Menu.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";

import { use } from "react";
import StarRating from "../Components/Raiting";
import RatingPopup from "../Components/AddRateing";
import  {jwtDecode} from "jwt-decode";


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
  const [error, setError] = useState(null); // Error state for fetching issues
  const [canteenIds, setCanteenIds] = useState([]);
  const [canteenInfo, setCanteenInfo] = useState({});
  const[section,setSection] = useState("");

  const location = useLocation();




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
    


  const mainMealRef = useRef(null);
  const shortEatRef = useRef(null);
  const beverageRef = useRef(null);


  useEffect(() => {
    if (location.state) {
      console.log("Location state:", location.state);
      setSection(location.state);
    }
  }, [location]);
  
  useEffect(() => {
    if (section && !loading) {
      console.log("Scrolling to section:", section);
      scrollToSection(section);
    }
  }, [section, loading]);
  
  const scrollToSection = (section) => {
    console.log("Attempting to scroll to:", section);
    switch (section) {
      case "main":
        if (mainMealRef.current) {
          mainMealRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("mainMealRef is null");
        }
        break;
      case "shortEat":
        if (shortEatRef.current) {
          shortEatRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("shortEatRef is null");
        }
        break;
      case "beverage":
        if (beverageRef.current) {
          beverageRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("beverageRef is null");
        }
        break;
      default:
        console.warn("Invalid section:", section);
        break;
    }
  };
  

  // Fetch canteen IDs and info
  const getCanteenIds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/canteen/getallcanteens");
      const canteenData = response.data.data;
      const ids = canteenData.map((canteen) => canteen._id);
      const info = canteenData.reduce((acc, canteen) => {
        acc[canteen._id] = canteen.name;
        return acc;
      }, {});
      setCanteenIds(ids);
      setCanteenInfo(info);
    } catch (error) {
      console.error("Error fetching canteen data:", error);
      setError("Failed to fetch canteen data. Please try again later.");
    }
  };

  // Fetch menu data
  const fetchMenuData = async () => {
    try {
      const requests = canteenIds.map((id) =>
        axios.get(`http://localhost:5000/menu/getmenu?canteen_id=${id}`)
      );
      const responses = await Promise.all(requests);

      const allMenuData = responses.flatMap((response, index) => {
        const canteenId = canteenIds[index];
        return response.data.data.map((menu) => ({
          ...menu,
          canteen_id: canteenId,
        }));
      });

      const mainMeals = allMenuData.flatMap((menu) =>
        (menu.main || []).map((item) => ({ ...item, canteen_id: menu.canteen_id }))
      );
      const shortEats = allMenuData.flatMap((menu) =>
        (menu.short_eat || []).map((item) => ({ ...item, canteen_id: menu.canteen_id }))
      );
      const beverages = allMenuData.flatMap((menu) =>
        (menu.beverage || []).map((item) => ({ ...item, canteen_id: menu.canteen_id }))
      );

      setMenuData({ main: mainMeals, shortEat: shortEats, beverage: beverages });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setError("Failed to fetch menu data. Please try again later.");
      setLoading(false);
    }
  };

  // Get the canteen name by ID
  const getCanteenName = (canteenId) => {
    return canteenInfo[canteenId] || "Unknown Canteen";
  };


  // Fetch canteen IDs on mount
  useEffect(() => {
    const fetchData = async () => {
      await getCanteenIds();
    };
    fetchData();
  }, []);

  // Fetch menu data once canteen IDs are available
  useEffect(() => {
    if (canteenIds.length > 0) {
      fetchMenuData();
    }
  }, [canteenIds]);



 



  


  //------------------------------------------------------------

  


  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCanteeId, setSelectedCanteeId] = useState(""); 
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedItemID, setSelectedItemID] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    console.log("Token:", token);
    if(token){
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      setDecodedToken(decoded);
    }
  }, []);

  useEffect(() => {
    if(decodedToken){
      console.log("logged token :",decodedToken);
      setUser(decodedToken.ID);
    }
  }, [decodedToken]);


  const openPopup = (item,type) => {
    console.log("Opening popup for item:", item);
    setSelectedItem(item.name);
    setIsPopupOpen(true);
    setSelectedType(type);
    setSelectedCanteeId(item.canteen_id);
    setSelectedRating(item.raiting);
    setSelectedItemID(item._id);
  };


  const addRaintingMain = async (name,type,selectedRating,canteen_id,item_id) => {
    console.log("Rating name:", name);
    console.log("Rating canteen_id:", canteen_id);
    console.log("Rating type:", type);
    console.log("Rating selectedRating:", selectedRating);
    console.log("Rating item_id:", item_id);
    console.log("Rating user:", user);

    try {
        axios.post("http://localhost:5000/raiting/add",{
          user_id: user,
          item_id: item_id,
          canteen_id: canteen_id,
          type: type,
          raite: selectedRating
        })
        .then((response) => {
          console.log("Rating added:", response.data);
          navigate(0);
        })
        .catch((error) => {
          console.error("Error adding rating:", error); 
        });
    }
    catch(error)
    {
        console.error("Error adding rating:", error);
    }
  }

  const addRaintingShort = async (item,canteen_id) => {
    console.log("Rating item:", item);
    console.log("Rating canteen_id:", item.canteen_id);
  }

  const addRaintingBeverage = async (item,canteen_id) => {
    console.log("Rating item:", item);
    console.log("Rating canteen_id:", item.canteen_id);
  }
  

  return (
    <>
      <Header />
      <div className="menuhero-container mt-[60px]">
        <div className="menuhero-content">
          <h1 className="menuhero-title">Explore Our Delicious Menu</h1>
          <p className="menuhero-description">
            Discover a variety of mouthwatering dishes, refreshing beverages, and delightful short eats from your favorite canteens.
          </p>
        </div>
      </div>
      <div className="menu-container">

        {error && (
          <div className="error-message">
            <p className="text-red-600 font-semibold">{error}</p>

        {/* Main Meal Category */}
        <div className="menu-category ">
          <h2 className="categorymenu-title relative inline-block text-center  font-Roboto text-blue-950 lg:text-[35px]  mb-[40px]">Main Meal</h2>
          <div className="menu-items">
          {menuData.main.length === 0 ? (
          <div className="text-center  ">
              <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
              <div class="spinner-border text-warning " role="status">
                    <span class="visually-hidden">Loading...</span>
              </div>
          </div>
          )
         :(
          menuData.main.map(item => ( !item.available ? null :
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
            <div className="flex justify-around">
             <StarRating rating={item.raiting} />
             {!token ? (""):(
               <button onClick={()=>openPopup(item,"main")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button>
             )}
             {/* <button onClick={()=>openPopup(item,"main")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button> */}
            </div>

          </div>
        )}
        {loading ? (
          <div className="loading-container text-center">
            <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>

        ) : (
          <>
            {/* Main Meal Category */}
            <div className="menu-category" ref={mainMealRef}>
              <h2 className="categorymenu-title text-center text-blue-950 lg:text-[35px] mb-[40px]">Main Meals</h2>
              <div className="menu-items">
                {menuData.main.map(
                  (item) =>
                    item.available && (
                      <div className="menu-item" key={item._id}>
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="item-image"
                        />
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">Rs. {item.price}</p>
                        <p className="item-description">{item.description}</p>
                        <p className="item-canteen">Available at: {getCanteenName(item.canteen_id)}</p>
                      </div>
                    )
                )}
        </div>
        {/* <RatingPopup isOpen={isPopupOpen} itemName={selectedItem} onClose={() => setIsPopupOpen(false)} onRate={addRaintingMain} type={selectedType}  canteen_id={selectedCanteeId} rate={selectedRating} itemID={selectedItemID}/> */}

        {/* Short Eats Category */}
        <div className="menu-category">
          <h2 className="categorymenu-title categorymenu-title relative inline-block text-center  font-Roboto text-blue-950 lg:text-[35px]  mb-[40px]">Short Eats</h2>
          <div className="menu-items">
          {menuData.shortEat.length === 0 ? (
             <div className="text-center  ">
                <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
                <div class="spinner-border text-warning " role="status">
                      <span class="visually-hidden">Loading...</span>
                </div>
             </div>
          ):(
            menuData.shortEat.map(item => ( !item.available ? null :
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
                <div className="flex justify-around">
                  <StarRating rating={item.raiting} />
                  {/* <button onClick={()=>openPopup(item,"short_eat")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button> */}
                  { !token ? (""):(
                     <button onClick={()=>openPopup(item,"short_eat")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button>
                  )}
                  </div>
              </div>
            </div>

            {/* Short Eats Category */}
            <div className="menu-category" ref={shortEatRef}>
              <h2 className="categorymenu-title text-center text-blue-950 lg:text-[35px] mb-[40px]">Short Eats</h2>
              <div className="menu-items">
                {menuData.shortEat.map(
                  (item) =>
                    item.available && (
                      <div className="menu-item" key={item._id}>
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="item-image"
                        />
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">Rs. {item.price}</p>
                        <p className="item-description">{item.description}</p>
                        <p className="item-canteen">Available at: {getCanteenName(item.canteen_id)}</p>
                      </div>
                    )
                )}
              </div>
            </div>


            {/* Beverages Category */}
            <div className="menu-category" ref={beverageRef}>
              <h2 className="categorymenu-title text-center text-blue-950 lg:text-[35px] mb-[40px]">Beverages</h2>
              <div className="menu-items">
                {menuData.beverage.map(
                  (item) =>
                    item.available && (
                      <div className="menu-item" key={item._id}>
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="item-image"
                        />
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">Rs. {item.price}</p>
                        <p className="item-description">{item.description}</p>
                        <p className="item-canteen">Available at: {getCanteenName(item.canteen_id)}</p>
                      </div>
                    )
                )}

          ):(
            menuData.beverage.map(item => ( !item.available ? null :
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
                <div className="flex justify-around">
                  <StarRating rating={item.raiting} />
                  {/* <button onClick={()=>openPopup(item,"beverage")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button> */}
                  {!token ? (""):(
                   <button onClick={()=>openPopup(item,"beverage")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button>
                  )}
                </div>

              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
      <RatingPopup isOpen={isPopupOpen} itemName={selectedItem} onClose={() => setIsPopupOpen(false)} onRate={addRaintingMain} type={selectedType}  canteen_id={selectedCanteeId} rate={selectedRating} itemID={selectedItemID}/>
    </>
  );
};

export default Menu;
