import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About Us</Link>

        {/* Canteen Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Canteens</button>
          <div className="dropdown-content">
            <Link to="/godayata">Goda Yata</Link>
            <Link to="/godauda">Goda Uda</Link>
            <Link to="/staff">Staff Canteen</Link>
            <Link to="/civil">Civil Canteen</Link>
          </div>
        </div>

        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* Show Login if not logged in, otherwise Logout */}
      {isLoggedIn ? (
        <button className="login-button" onClick={handleLogout}>Log out</button>
      ) : (
        <Link to="/login">
          <button className="login-button">Log in</button>
        </Link>
      )}
    </header>
  );
}
