import React, { useEffect, useState,useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { use } from "react";
import StarRating from "../Components/Raiting";
import RatingPopup from "../Components/AddRateing";
import  {jwtDecode} from "jwt-decode";

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
  const [specialItems, setSpecialItems] = useState([]);




const GetCanteenIds = async () => {
  try {
    const response = await axios.get("https://mora-click-7.onrender.com/canteen/getallcanteens");
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
        axios.get(`https://mora-click-7.onrender.com/menu/getmenu?canteen_id=${canteenId}`)
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

  const fetchSpecialItems = async () => {
    try {
      const canteenRequests = canteenIds.map((canteenId) =>
        axios.get(`https://mora-click-7.onrender.com/special/getItembyId?canteen_id=${canteenId}`)
      );
  
      const responses = await Promise.all(canteenRequests);
  
      const allSpecialItems = responses.flatMap((response, index) => {
        const canteenId = canteenIds[index];
        return response.data.data.map((item) => ({
          ...item,
          canteen_id: canteenId,
        }));
      });
  
      setSpecialItems(allSpecialItems);
    } catch (error) {
      console.error("Error fetching special items:", error);
    }
  };

  useEffect(() => {
    if (canteenIds.length > 0) {
      fetchSpecialItems();
    }
  }, [canteenIds]);
  
  
  
  useEffect(()=>{
     const fetchCanteenID = async () => {
      try {
              await GetCanteenIds();
          } catch (error) {
              console.error("Error fetching canteen data:", error);
          }
     }
      fetchCanteenID();
  },[]);

  useEffect(()=>{
    if(canteenIds.length > 0)
    {
      console.log("Canteen Ids:",canteenIds);
      
    }
  },[canteenIds])


  useEffect(()=>{
     const fetchMenu = async () => {
       try{
          if(canteenIds.length > 0)
          {
            await fetchMenuData();
          }
       }
       catch(error)
       {
          console.error("Error fetching menu data:", error);
       }
     }
      fetchMenu();
  },[canteenIds]);

  useEffect(() => {
    console.log("Menu data:", menuData);
  },[menuData]);


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
        
        if(type === "special")
        {
          axios.post("https://mora-click-7.onrender.com/raiting/addspecial",{
            user_id: user,
            item_id: item_id,
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
        else
        {
          axios.post("https://mora-click-7.onrender.com/raiting/add",{
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


  //-----------------------------------

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");

    if (scrollTo) {
      const sectionRefMap = {
        "main": section1Ref,
        "beverage": section2Ref,
        "shortEat": section3Ref,
        "special": section4Ref,
      };

      const targetRef = sectionRefMap[scrollTo];
      if (targetRef?.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  

  return (
    <>
      <Header />
      <div className="menuhero-container mt-[60px]">
        <div className="menuhero-content ">
          <h1 className="menuhero-title">Explore Our Delicious Menu</h1>
          <p className="menuhero-description">
            Discover a variety of mouthwatering dishes, refreshing beverages, and delightful short eats from your favorite canteens.
          </p>
        </div>
      </div>
      <div className="menu-container">
        {/* Main Meal Category */}
        <div className="menu-category "  ref={section1Ref}>
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
        )))}
          </div>
        </div>
        {/* <RatingPopup isOpen={isPopupOpen} itemName={selectedItem} onClose={() => setIsPopupOpen(false)} onRate={addRaintingMain} type={selectedType}  canteen_id={selectedCanteeId} rate={selectedRating} itemID={selectedItemID}/> */}

        {/* Short Eats Category */}
        <div className="menu-category"  ref={section3Ref}>
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
            ))
          )}
            
          </div>
        </div>

        {/* Beverages Category */}
        <div className="menu-category" ref={section2Ref}>
          <h2 className="categorymenu-title categorymenu-title relative inline-block text-center  font-Roboto text-blue-950 lg:text-[35px]  mb-[40px]">Beverages</h2>
          <div className="menu-items">
          {menuData.beverage.length === 0 ? (
            <div className="text-center  ">
              <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
              <div class="spinner-border text-warning " role="status">
                    <span class="visually-hidden">Loading...</span>
              </div>
            </div>
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
            ))
          )}
            
          </div>
        </div>

      {/* Special Items Category */}
      <div className="menu-category" ref={section4Ref}>
        <h2 className="categorymenu-title relative inline-block text-center font-Roboto text-blue-950 lg:text-[35px] mb-[40px]">Special Items</h2>
        <div className="menu-items">
          {specialItems.length === 0 ? (
            <div className="text-center">
              <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            specialItems.map((item) => (
              !item.available ? null : (
                <div className="menu-item" key={item._id}>
                  <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} className="item-image" />
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">Rs. {item.price}</p>
                  <p className="item-description">{item.description}</p>
                  <p className="item-canteen">Available at: {canteenname(item.canteen_id)}</p>
                  <div className="flex justify-around">
                    <StarRating rating={item.raiting} />
                    {!token ? null : (
                      <button onClick={() => openPopup(item, "special")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button>
                    )}
                  </div>
                </div>
              )
            ))
          )}
        </div>
      </div>

      </div>
      <Footer />
      <RatingPopup isOpen={isPopupOpen} itemName={selectedItem} onClose={() => setIsPopupOpen(false)} onRate={addRaintingMain} type={selectedType}  canteen_id={selectedCanteeId} rate={selectedRating} itemID={selectedItemID}/>
    </>
  );
};

export default Menu;