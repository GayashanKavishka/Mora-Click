import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './StaffCanteen.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ReviewList from '../Components/ReviewList';
import ReviewForm from '../Components/ReviewForm';
import {jwtDecode} from 'jwt-decode';
import image from '../assets/placeholderimage.png';
import StarRating from '../Components/Raiting';

const MENU_API_URL = 'https://mora-click-7.onrender.com/menu/getmenu?canteen_id=6761446355efca0108f8d9f2';
const CANTEEN_API_URL = 'https://mora-click-7.onrender.com/canteen/getcanteen?_id=6761446355efca0108f8d9f2';
const SPECIAL_API_URL = 'https://mora-click-7.onrender.com/special/getItembyId?canteen_id=6761446355efca0108f8d9f2';

export default function StaffCanteen() {
  const [foodData, setFoodData] = useState(null);
  const [specialItems, setSpecialItems] = useState([]);
  const [isCanteenOpen, setIsCanteenOpen] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
          const token = localStorage.getItem("token");
          console.log("Token:", token);
          if(token){
            
            const decoded = jwtDecode(token);
            console.log("Decoded Token:", decoded);
            setDecodedToken(decoded);
          }
          // const decoded = jwtDecode(token);
          // setDecodedToken(decoded);
          // console.log("Decoded Token:", decoded);
          // setIsLoggedIn(!!token);
        }, []);
    
        useEffect(() => {
            if(decodedToken){
              console.log("logged token :",decodedToken);
              if(decodedToken.role !== "canteen"){
                setIsLoggedIn(true);
              }
            }
          }, [decodedToken]);

    const fetchCanteenStatus = async () => {
      try {
        const response = await axios.get(CANTEEN_API_URL);
        const canteen = response.data.data[0];
        setIsCanteenOpen(canteen.open);
      } catch (error) {
        console.error('Error fetching canteen status:', error);
      }
    };

    const fetchMenu = async () => {
      try {
        const response = await axios.get(MENU_API_URL);
        const menu = response.data.data[0];

        const reshapedData = {
          mainMeals: menu.main.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            available: item.available,
            description: item.description || '',
            image: item.image || '',
            raiting: item.raiting || 0,
          })),
          shortEats: menu.short_eat.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            available: item.available,
            image: item.image || '',
            raiting: item.raiting || 0,
          })),
          beverages: menu.beverage.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            available: item.available,
            image: item.image || '',
            raiting: item.raiting || 0,
          })),
        };

        setFoodData(reshapedData);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    const fetchSpecialItems = async () => {
      try {
        const response = await axios.get(SPECIAL_API_URL);
        const specialData = response.data.data.map(item => ({
          id: item._id,
          name: item.name,
          price: item.price,
          description: item.description || '',
          image: item.image || '',
          available: item.available,
        }));
        setSpecialItems(specialData);
      } catch (error) {
        console.error('Error fetching special items:', error);
      }
    };

    useEffect(() => {
            
      const fetchCanteenInfo = async () => {
          try{
              await fetchCanteenStatus();
          }
          catch(error){
            console.error('Error fetching canteen status:', error);
          }
      }
  
      fetchCanteenInfo();
      
    },[])
  
    useEffect(() => {
      const fetchMenuData = async () => {
        try {
          await fetchMenu();
          await fetchSpecialItems();
        } catch (error) {
          console.error('Error fetching menu data:', error);
        }
      }
      fetchMenuData();
    },[isCanteenOpen])

    //------------------------------

    const reviewSectionRef = useRef(null);
          
            const scrollToReview = () => {
              console.log('Scrolling to review section');
              if (reviewSectionRef.current) {
                reviewSectionRef.current.scrollIntoView({
                  behavior: 'smooth',  // For smooth scrolling
                  block: 'start'  // Scroll to the top of the section
                });
              }
            };
  return (
    <>
      <Header />
      <section className="staff-canteen-hero mt-[50px]">
        <div className="hero-content">
          <h1>Welcome to the Staff Canteen</h1>
          <p>Enjoy exclusive meals and beverages specially curated for our staff.</p>
        </div>
      </section>

      <div className={`canteen-status ${isCanteenOpen ? 'open' : 'closed'}`}>
        <h2>{isCanteenOpen ? 'Canteen is Open' : 'Canteen is Closed'}</h2>
        <p>{isCanteenOpen ? 'We are ready to serve you!' : 'Please come back during our operational hours.'}</p>
      </div>

      {isCanteenOpen && (
        <div className="categories-container">
          {specialItems.length > 0 ? (
            <div className="category">
              <div className="flex justify-center items-center mb-3">
              <button className='mb-3 font-semibold' onClick={scrollToReview}>Go to Reviews<i class='fas fa-angle-right'></i> </button>
              </div>
              <h2 className="category-title">Special Items</h2>
              <div className="food-items">
                {specialItems.map((food) => (
                  <div key={food.id} className={`food-card ${food.available ? '' : 'unavailable'}`}>
                    {/* <img
                      src={food.image}
                      alt={food.name}
                      className="food-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }}
                    /> */}
                    {food.image ? (
                      <img
                      src={food.image}
                      alt={food.name}
                      className="food-image"
                    /> 
                    ):(
                      <img
                      src={image}
                      alt={food.name}
                      className="food-image"
                    />
                    )}
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
          )
          :
          (
            <div className="text-center  ">
                <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
                <div class="spinner-border text-warning " role="status">
                      <span class="visually-hidden">Loading...</span>
                </div>
            </div>
          )
        }

          {foodData ?
            Object.entries(foodData).map(([category, items]) => (
              <div key={category} className="category">
                <h2 className="category-title">{category.replace(/([A-Z])/g, ' $1')}</h2>
                <div className="food-items">
                  {items.map((food) => (
                    <div key={food.id} className={`food-card ${food.available ? '' : 'unavailable'}`}>
                      {/* <img
                        src={food.image}
                        alt={food.name}
                        className="food-image"
                        onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }}
                      /> */}
                      {food.image ? (
                      <img
                      src={food.image}
                      alt={food.name}
                      className="food-image"
                    /> 
                    ):(
                      <img
                      src={image}
                      alt={food.name}
                      className="food-image"
                    />
                    )}
                      <h3 className="food-name">{food.name}</h3>
                      <p className="food-price">Rs. {food.price}</p>
                      <p className="food-availability">
                        {food.available ? 'Available' : 'Not Available'}
                      </p>
                      {food.description && <p className="food-description">{food.description}</p>}
                      <div className="flex justify-around">
                      {console.log(food)}
                      <StarRating rating = {food.raiting} />
                      {/* <button onClick={()=>openPopup(item,"short_eat")} className="mr-2 mb-0 bg-blue-950 w-[60px] h-[30px] text-white rounded">Rate</button> */}

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
            :
            (
              <div className="text-center  ">
                <p className="text-[20px] text-yellow-600 font-semibold">Loading...</p>
                <div class="spinner-border text-warning " role="status">
                      <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )
          }
        </div>
      )}
      {isLoggedIn ? (
  <div ref={reviewSectionRef }>
    <ReviewList canteenId="6761446355efca0108f8d9f2" />
      <ReviewForm
  canteenId="6761446355efca0108f8d9f2"
  user_ID={decodedToken?.user_id || 'Guest'}
  scrollToReview={() => navigate(0)}
/>
      
      </div>
      ) : ""}
      <Footer />
    </>
  );
}
