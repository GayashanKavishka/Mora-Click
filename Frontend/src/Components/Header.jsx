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
      <button className="login-button">Log in</button>
    </header>
  );
}
