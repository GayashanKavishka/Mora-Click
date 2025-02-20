import React, { useEffect ,useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import main from "../assets/main.jpg";
import Food1Image from "../assets/food 1.jpg";
import Food2Image from "../assets/food 2.png";
import Food3Image from "../assets/food 3.jpg";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import mora1 from '../assets/mora1.jpg';
import mora2 from '../assets/mora2.png';
import mora3 from '../assets/mora3.png';
import mora5 from '../assets/mora5.png';
import moranew from '../assets/moranew.png';
import canteen from '../assets/canteen.jpg';
import m1 from '../assets/main meal mora.png';
import m2 from '../assets/beverages mora.png';
import m3 from '../assets/short eats mora.png';
import m4 from '../assets/special item mora.png';
import civil from '../assets/civil.jpg';
import godayata from '../assets/godayata.jpg';
import godauda from '../assets/Goda Uda.jpg';
import staff from '../assets/staff.jpg';

import moranew2 from '../assets/moranew2.png';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { use } from 'react';
import { jwtDecode } from 'jwt-decode';
import { requestFCMToken } from '../utils/firebaseUtils';
import axios from 'axios';

export default function Welcome() {
  const navigate = useNavigate();
  const [token,setToken] = useState(null);
  const[role,setRole] = useState(null);
  const[decodedToken,setDecodedToken] = useState(null);

  const handleContactUsClick = () => {
    navigate('/contact');
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from Welcome:",token);
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setRole(decode.role);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      // console.log("Decoded Token in welcome",decode);
      setDecodedToken(decode);
    }
  },[token]);

  useEffect(()=>{
    console.log("Decoded Token in welcome",decodedToken);
  },[decodedToken]);

  useEffect(()=>{
    if(role){
      console.log("role",role);
    }
  },[role])

  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0 } // Trigger when 50% of the element is visible
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);


  const handleNavigation = (sectionId)=>{
        navigate(`/menu?scrollTo=${sectionId}`);
  }

  //------------------------------------------------

  const [FCMToken,setFCMToken] = useState(null);

  useEffect(()=>{
    const FCMToken = async()=>{
      try{
        console.log("Fetching FCM token inside welcome ...");
        const fetchFCM = await requestFCMToken();
        console.log("FCM",fetchFCM);
        setFCMToken(fetchFCM);
      }
      catch(err){
        console.log(err); 

      }
    }
    FCMToken();
  },[])



  useEffect(() => {
    
    if(FCMToken && decodedToken){
      console.log("FCM Token",FCMToken);
      console.log("Decoded Token",decodedToken);
      axios.post("http://localhost:5000/user/addFCM",
      {
        _id:decodedToken.ID,
        FCMToken:FCMToken
      })
      .then((res)=>{
        console.log("FCM token added to DB successfully");
      })
      .catch((err)=>{
        console.log("Error adding FCM token to DB",err);
      })
    }
  },[FCMToken,decodedToken]);





  



  return (
    <div className="main-container flex flex-col  mt-[20px] rounded-[40px]">
      <Header />
      {/* Hero Section */}
      <div className='flex justify-center items-center p-[20px]'>
      <section className="welcomehero  md:gap-4 rounded-[40px]">
        <div className="content rounded-[20px]">
          <h1 className='font-Lobster'>Mora Click</h1>
          <p className='hidden lg:block'>
            "Welcome to Mora Click, your ultimate destination for delicious, mouth-watering dishes crafted with passion and fresh ingredients. From classic Italian cuisines to global favorites, we bring you flavors that delight every palate. Explore our menu, order online, or reserve a table to indulge in an unforgettable dining experience today!"
          </p>
          <div className="buttons">
            <button className="btn-order" onClick={handleContactUsClick}>Contact us</button>
          </div>
        </div>
        <div className="hero-image  ">
          <img src={moranew2} alt="Main Dish" className='flex lg:w-[390px] lg:h-[300px] ' />
          <h2 className='text-white font-semibold text-center mt-4 block lg:hidden'>Find Where your Food !</h2>
        </div>
      </section>
      </div>

      {/* <div className='mt-5'>
        <h1 className='text-center font-bold text-[50px]'>Join with us to Find your Food  Rate & Review </h1>
        <div style={{backgroundImage:`url(${canteen})`}} className='m-9 '>
           <img src={mora5} className='h-[400px] bg-cover'></img>
        </div>
      </div> */}

   <div className="mt-5 relative">
      
      {
        role === "Student" ? (
      <>
      <h1
        data-aos="fade-right" // You can set various AOS animations
        data-aos-duration="1000" // Duration of the animation
        className="text-center font-bold font-Lobster text-blue-900 text-[60px] [text-shadow:3px_3px_5px_yellow]">
        Let's Enjoy Your Foods
      </h1>
      <div
        data-aos="fade-up" // You can set various AOS animations
        data-aos-duration="1000" // Duration of the animation
        // style={{ backgroundImage: `url(${canteen})` }}
        className="m-1 mr-1 rounded-[20px] p-[20px] h-[400px] bg-cover bg-center relative flex flex-col items-center justify-around gap-0 w-full animate-slide-in-left"
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
          <img
          ref={imgRef}
          src={moranew}
          data-aos="fade-up" // You can set various AOS animations
          data-aos-duration="1000" // Duration of the animation
          className={`lg:h-[351px] lg:w-[850px] sm:h-[200px] sm:w-[400px] md:h-[300px] md:w-[600px] mt-8 relative z-10 transition-all sm:animate-slide-in-left md:animate-slide-in-left`}
        />
        {/* <div className='z-10 flex flex-col items-center justify-center gap-[25px]'>
          <h2 className='z-10 text-white font-bold'>Sing up For Rate Foods and Review Foods</h2>
          <button onClick={()=>navigate("/sign-up")}className="btn-order z-10  ">
            SingUp
          </button>
        </div> */}
      </div> 
      </>
        ) : (
            <>
            <div className='flex flex-col justify-center items-center p-[20px]'>
            <div className='flex justify-center items-center w-full'>
                  <h1
                    data-aos="fade-right" // You can set various AOS animations
                    data-aos-duration="1000" // Duration of the animation
                    className="relative inline-block text-center font-bold font-Roboto text-blue-950 lg:text-[60px]  mb-[40px] 
                                before:content-[''] before:absolute before:bottom-[-5px] before:left-0 
                                before:w-full  before:h-[4px]  before:bg-gradient-to-r before:from-[#f1c40f] before:to-[#e67e22] before:rounded-[5px]">
                    Let's Join,Rate & Review
                  </h1>
            </div>
            <div
              data-aos="fade-up" // You can set various AOS animations
              data-aos-duration="1000" // Duration of the animation
              style={{ backgroundImage: `url(${canteen})` }}
              className=" mr-[20px] rounded-[40px] m-[20px] h-[400px] bg-cover bg-center relative flex items-center justify-around gap-0 w-full  animate-slide-in-left"
            >
              <div className=" rounded-[40px] absolute inset-0 bg-black bg-opacity-50"></div>
                <img
                ref={imgRef}
                src={mora5}
                className={`h-[400px] relative z-10 transition-all  sm:w-[100px] sm:h-[300px] md:w-[300px] md:h-[300px]  ${
                  inView ? "animate-slide-in-left" : "opacity-0"
                }`}
              />
              <div className='z-10 flex flex-col items-center justify-center gap-[25px]'>
                <h2 className='z-10 text-white font-bold'>Sing up For Rate Foods and Review Foods</h2>
                <button onClick={()=>navigate("/sign-up")}className="btn-order z-10 rounded ">
                  SingUp
                </button>
              </div>
            </div>
            </div> 
          </>
          
        )
      }
      
    </div>

    
    <div className="py-20 bg-white text-center">
  <h2 className="text-5xl font-bold tracking-wide uppercase text-gray-800 inline-block relative pb-2">
    Explore Our Menu
    <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md"></span>
  </h2>

 {/* Mora Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 justify-items-center">
  {/* Main Meals */}
  <div className="flex flex-col items-center">
    <div className="relative w-full max-w-[300px] bg-gray-100 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <img src={m1} alt="Main Meals" onClick={() => { 
               handleNavigation('main'); 
              //  scrollToSection('main'); 
         }} className="w-full h-auto max-h-[250px] object-cover transition-transform duration-300 hover:scale-110" />

    </div>
    <p className="mt-4 text-lg md:text-xl lg:text-[35px] font-semibold text-gray-700 text-center">Main Meals</p>
  </div>


  {/* Beverages */}
  <div className="flex flex-col items-center">
    <div className="relative w-full max-w-[300px] bg-gray-100 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <img src={m2} alt="Beverages" onClick={() => { 
               handleNavigation('beverage'); 
              //  scrollToSection('shortEat'); 
         }}  className="w-full h-auto max-h-[250px] object-cover transition-transform duration-300 hover:scale-110" />

    </div>
    <p className="mt-4 text-lg md:text-xl lg:text-[35px] font-semibold text-gray-700 text-center">Beverages</p>
  </div>


  {/* Short Eats */}
  <div className="flex flex-col items-center">
    <div className="relative w-full max-w-[300px] bg-gray-100 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <img src={m3} alt="Short Eats" onClick={() => { 
               handleNavigation('shortEat');  
              //  scrollToSection('beverage'); 
         }} className="w-full h-auto max-h-[250px] object-cover transition-transform duration-300 hover:scale-110" />

    </div>
    <p className="mt-4 text-lg md:text-xl lg:text-[35px] font-semibold text-gray-700 text-center">Short Eats</p>
  </div>


  {/* Special Items */}
  <div className="flex flex-col items-center">
    <div className="relative w-full max-w-[300px] bg-gray-100 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
      <img src={m4} onClick={()=>{ handleNavigation('special'); }} alt="Special Items" className="w-full h-auto max-h-[250px] object-cover transition-transform duration-300 hover:scale-110" />
    </div>
    <p className="mt-4 text-lg md:text-xl lg:text-[35px] font-semibold text-gray-700 text-center">Special Items</p>
  </div>
</div>

</div>




      {/* Food Carousel Section */}
      <section className="food-carousel">
        <h2>Our Canteens</h2>
        <Carousel>
          <Carousel.Item>
            <Link to="/godayata"><img className="d-block w-100" src={godauda} alt="Main Meals" /></Link>
            <Carousel.Caption>
              <h3>Goda Yata</h3>
              {/* <p>Delicious main courses crafted for every taste!</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/godauda"><img className="d-block w-100" src={godayata} alt="Beverages" /></Link>
            <Carousel.Caption>
              <h3>Goda Uda</h3>
              {/* <p>Refreshing drinks to complement your meal.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/staff"><img className="d-block w-100" src={staff} alt="Short Eats" /></Link>
            <Carousel.Caption>
              <h3>Staff Canteen</h3>
              {/* <p>Perfect snacks for a quick bite!</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/civil"><img className="d-block w-100" src={civil} alt="Short Eats" /></Link>
            <Carousel.Caption>
              <h3>Civil Canteen</h3>
              {/* <p>Perfect snacks for a quick bite!</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <Footer />
    </div>
  );
}
