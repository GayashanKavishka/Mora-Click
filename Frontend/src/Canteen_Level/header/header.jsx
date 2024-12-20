import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import logo from '../../assets/logo.jpg';
import user_icon from '../../assets/user.png';

export default function Canteen_header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <header className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* User Section */}
      <div className="user_section">
        <h2 className="canteen-name">Canteen Name</h2>
        <div className="user-icon-container" ref={dropdownRef}>
          <img
            src={user_icon}
            alt="User Icon"
            className="user-icon"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>Account Details</li>
                <li>About Us</li>
              </ul>
            </div>
          )}
        </div>
        <button className="login-button">Logout</button>
      </div>
    </header>
  );
}
