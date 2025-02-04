import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import  store from '../assets/store.png';
import shopwindow from '../assets/shop-window.svg';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.role !== "canteen") {
        console.log(decodedToken);
        setIsLoggedIn(true);
      }
    }
  }, [decodedToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setVisible(false); // Hide navbar when scrolling down
      } else {
        setVisible(true); // Show navbar when scrolling up
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <header className={`navbar ${visible ? "visible" : "hidden"}`}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
       

       
      <nav className={isMenuOpen ? "nav-links active " : "nav-links "}>
         <div className={isMenuOpen ?"flex flex-col":"flex gap-5 "}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}><i class="fa fa-home" style={{fontSize:"25px"}}></i></Link>
        <Link to="/menu" onClick={() => setIsMenuOpen(false)}><i class='fas fa-hamburger' style={{fontSize:"29px"}}></i> </Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}><i class='fas fa-address-card' style={{fontSize:"29px"}}></i> </Link>

        <div className="dropdown">
          <button className={isMenuOpen ?"dropbtn ml-[32px]":"dropbtn"}><i class="bi bi-shop-window"><div className="w-4 h-4 mb-[12px]" ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5"/>
          </svg></div></i></button>
          <div className="dropdown-content">
            <Link to="/godayata" onClick={() => setIsMenuOpen(false)}>Goda Yata</Link>
            <Link to="/godauda" onClick={() => setIsMenuOpen(false)}>Goda Uda</Link>
            <Link to="/staff" onClick={() => setIsMenuOpen(false)}>Staff Canteen</Link>
            <Link to="/civil" onClick={() => setIsMenuOpen(false)}>Civil Canteen</Link>
          </div>
        </div>

        <Link to="/contact" onClick={() => setIsMenuOpen(false)}><i class='fas fa-phone' style={{fontSize:"29px"}}></i> </Link>

        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>Log out</button>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="login-button">Log in</button>
          </Link>
        )}
        </div>
      </nav>
      
    </header>
  );
}

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";
// import logo from "../assets/logo.jpg";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { jwtDecode } from "jwt-decode";

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [decodedToken, setDecodedToken] = useState(null);
//   const [prevScrollY, setPrevScrollY] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       setDecodedToken(decoded);
//     }
//   }, []);

//   useEffect(() => {
//     if (decodedToken) {
//       if (decodedToken.role !== "canteen") {
//         setIsLoggedIn(true);
//       }
//     }
//   }, [decodedToken]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   // Handle dropdown close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown")) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   // Scroll event listener
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setVisible(currentScrollY < prevScrollY);
//       setPrevScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollY]);

//   return (
//     <header className={`navbar ${visible ? "visible" : "hidden"}`}>
//       <div className="logo">
//         <img src={logo} alt="logo" />
//       </div>

//       <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//         {isMenuOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       <nav className={isMenuOpen ? "nav-links active" : "nav-links"}>
//         <div className={isMenuOpen ? "flex flex-col" : "flex gap-5"}>
//           <Link to="/" onClick={() => setIsMenuOpen(false)}>
//             <i className="fa fa-home" style={{ fontSize: "25px" }}></i>
//           </Link>
//           <Link to="/menu" onClick={() => setIsMenuOpen(false)}>
//             <i className="fas fa-hamburger" style={{ fontSize: "29px" }}></i>
//           </Link>
//           <Link to="/about" onClick={() => setIsMenuOpen(false)}>
//             <i className="fas fa-address-card" style={{ fontSize: "29px" }}></i>
//           </Link>

//           {/* Dropdown menu */}
//           <div className="dropdown">
//             <button
//               className="dropbtn"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent closing when clicking the button itself
//                 setIsDropdownOpen(!isDropdownOpen);
//               }}
//             >
//               <i className="bi bi-shop-window">
//                 <div className="w-4 h-4 mb-[12px]">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="28"
//                     height="28"
//                     fill="currentColor"
//                     className="bi bi-shop-window"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
//                   </svg>
//                 </div>
//               </i>
//             </button>
//             {isDropdownOpen && (
//               <div className="dropdown-content">
//                 <Link to="/godayata" onClick={() => setIsDropdownOpen(false)}>Goda Yata</Link>
//                 <Link to="/godauda" onClick={() => setIsDropdownOpen(false)}>Goda Uda</Link>
//                 <Link to="/staff" onClick={() => setIsDropdownOpen(false)}>Staff Canteen</Link>
//                 <Link to="/civil" onClick={() => setIsDropdownOpen(false)}>Civil Canteen</Link>
//               </div>
//             )}
//           </div>

//           <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
//             <i className="fas fa-phone" style={{ fontSize: "29px" }}></i>
//           </Link>

//           {isLoggedIn ? (
//             <button className="login-button" onClick={handleLogout}>Log out</button>
//           ) : (
//             <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//               <button className="login-button">Log in</button>
//             </Link>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

