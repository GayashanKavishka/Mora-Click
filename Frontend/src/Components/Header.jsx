// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";
// import logo from "../assets/logo.jpg";

// export default function Header() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if the token exists in localStorage
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token); // Convert token existence to boolean
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove token
//     setIsLoggedIn(false);
//     navigate("/"); // Redirect to home after logout
//   };

//   return (
//     <header className="navbar">
//       <div className="logo">
//         <img src={logo} alt="logo" />
//       </div>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/menu">Menu</Link>
//         <Link to="/about">About Us</Link>

//         {/* Canteen Dropdown */}
//         <div className="dropdown">
//           <button className="dropbtn">Canteens</button>
//           <div className="dropdown-content">
//             <Link to="/godayata">Goda Yata</Link>
//             <Link to="/godauda">Goda Uda</Link>
//             <Link to="/staff">Staff Canteen</Link>
//             <Link to="/civil">Civil Canteen</Link>
//           </div>
//         </div>

//         <Link to="/contact">Contact Us</Link>
//       </nav>

//       {/* Show Login if not logged in, otherwise Logout */}
//       {isLoggedIn ? (
//         <button className="login-button" onClick={handleLogout}>Log out</button>
//       ) : (
//         <Link to="/login">
//           <button className="login-button">Log in</button>
//         </Link>
//       )}
//     </header>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation Links */}
      <nav className={isMenuOpen ? "nav-links active" : "nav-links"}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>

        {/* Canteen Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Canteens</button>
          <div className="dropdown-content">
            <Link to="/godayata" onClick={() => setIsMenuOpen(false)}>Goda Yata</Link>
            <Link to="/godauda" onClick={() => setIsMenuOpen(false)}>Goda Uda</Link>
            <Link to="/staff" onClick={() => setIsMenuOpen(false)}>Staff Canteen</Link>
            <Link to="/civil" onClick={() => setIsMenuOpen(false)}>Civil Canteen</Link>
          </div>
        </div>

        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>

        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>Log out</button>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="login-button">Log in</button>
          </Link>
        )}
      </nav>
    </header>
  );
}
