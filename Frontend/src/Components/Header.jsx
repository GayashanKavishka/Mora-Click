import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.jpg';

export default function Header() {
  return (
    <header className="navbar">
      <div className="logo"><img src={logo} alt="logo" /></div>
      <nav>
        <Link to="/">Home</Link>
        <a href="#">Menu</a>
        <Link to="/about">About Us</Link>

        {/* Canteen Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Canteens</button>
          <div className="dropdown-content">
          <Link to="/godayata">Goda Yata</Link>
            <a href="#">Canteen 1</a>
            <a href="#">Canteen 2</a>
            <a href="#">Canteen 3</a>
            <a href="#">Canteen 4</a>
          </div>
        </div>

        <Link to="/contact">Contact Us</Link>
      </nav>
      <button className="login-button">Log in</button>
    </header>
  );
}
