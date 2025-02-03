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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { use } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function Welcome() {
  const navigate = useNavigate();
  const [token,setToken] = useState(null);
  const[role,setRole] = useState(null);

  const handleContactUsClick = () => {
    navigate('/contact');
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setRole(decode.role);
    }
  }, [token]);

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

  return (
    <div className="main-container flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="welcomehero  md:gap-4">
        <div className="content">
          <h1 className='font-Lobster'>Mora Click</h1>
          <p className='hidden lg:block'>
            "Welcome to Mora Click, your ultimate destination for delicious, mouth-watering dishes crafted with passion and fresh ingredients. From classic Italian cuisines to global favorites, we bring you flavors that delight every palate. Explore our menu, order online, or reserve a table to indulge in an unforgettable dining experience today!"
          </p>
          <div className="buttons">
            <button className="btn-order" onClick={handleContactUsClick}>Contact us</button>
          </div>
        </div>
        <div className="hero-image  ">
          <img src={mora1} alt="Main Dish" className='flex lg:w-[390px] lg:h-[300px] ' />
          <h2 className='text-white font-semibold text-center mt-4 block lg:hidden'>Find Where your Food !</h2>
        </div>
      </section>

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
        className="m-1 mr-1 rounded-[20px] h-[400px] bg-cover bg-center relative flex flex-col items-center justify-around gap-0 w-full animate-slide-in-left"
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
          <img
          ref={imgRef}
          src={moranew}
          data-aos="fade-up" // You can set various AOS animations
          data-aos-duration="1000" // Duration of the animation
          className={`h-[351px] w-[850px] mt-8 relative z-10 transition-all`}
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
              className="m-1 mr-1 rounded-[20px] h-[400px] bg-cover bg-center relative flex items-center justify-around gap-0 w-full"
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <img
                ref={imgRef}
                src={mora5}
                className={`h-[400px] relative z-10 transition-all  sm:w-[100px] sm:h-[300px] md:w-[300px] md:h-[300px]  ${
                  inView ? "animate-slide-in-left" : "opacity-0"
                }`}
              />
              <div className='z-10 flex flex-col items-center justify-center gap-[25px]'>
                <h2 className='z-10 text-white font-bold'>Sing up For Rate Foods and Review Foods</h2>
                <button onClick={()=>navigate("/sign-up")}className="btn-order z-10  ">
                  SingUp
                </button>
              </div>
            </div> 
          </>
          
        )
      }
      
    </div>


      {/* Food Carousel Section */}
      <section className="food-carousel">
        <h2>Our Menu</h2>
        <Carousel>
          <Carousel.Item>
            <Link to="/menu"><img className="d-block w-100" src={Food1Image} alt="Main Meals" /></Link>
            <Carousel.Caption>
              <h3>Main Meals</h3>
              <p>Delicious main courses crafted for every taste!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/menu"><img className="d-block w-100" src={Food2Image} alt="Beverages" /></Link>
            <Carousel.Caption>
              <h3>Beverages</h3>
              <p>Refreshing drinks to complement your meal.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/menu"><img className="d-block w-100" src={Food3Image} alt="Short Eats" /></Link>
            <Carousel.Caption>
              <h3>Short Eats</h3>
              <p>Perfect snacks for a quick bite!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <Footer />
    </div>
  );
}
