import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';


export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token"); // Clean up invalid token
      }
    }
  }, []);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= prevScrollY);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isProfileDropdownOpen &&
        !event.target.closest(".profile-container")
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isProfileDropdownOpen]);

  return (
    <header className={`navbar ${visible ? "visible" : "hidden"}`}>
      <div className="logo">
        <a href="/"><img src={logo} alt="logo" /></a>
      </div>

      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={isMenuOpen ? "nav-links active" : "nav-links"}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <i className="fa fa-home" style={{ fontSize: "25px" }}></i>
        </Link>
        <Link to="/menu" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-hamburger" style={{ fontSize: "29px" }}></i>
        </Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-address-card" style={{ fontSize: "29px" }}></i>
        </Link>
        <div className="dropdown ">
          <button className={isMenuOpen ?"dropbtn ml-[32px] mr-9":"dropbtn"}><i class="bi bi-shop-window"><div className="w-4 h-4 mb-[12px]" ><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5"/>
          </svg></div></i></button>
          <div className="dropdown-content">
            <Link to="/godayata" onClick={() => setIsMenuOpen(false)}>Goda Yata</Link>
            <Link to="/godauda" onClick={() => setIsMenuOpen(false)}>Goda Uda</Link>
            <Link to="/staff" onClick={() => setIsMenuOpen(false)}>Staff Canteen</Link>
            <Link to="/civil" onClick={() => setIsMenuOpen(false)}>Civil Canteen</Link>
          </div>
        </div>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
          <i className="fas fa-phone" style={{ fontSize: "29px" }}></i>
        </Link>

        {isLoggedIn ? (
          <div
            className="profile-container"
            onClick={() =>
              setIsProfileDropdownOpen((prevState) => !prevState)
            }
          >
          <div className="profile-circle">
            {decodedToken?.name ? decodedToken.name.charAt(0).toUpperCase() : "?"}
          </div>

            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/account">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="login-button">Log in</button>
          </Link>
        )}
      </nav>
    </header>
  );
}
