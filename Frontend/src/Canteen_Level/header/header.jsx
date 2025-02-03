import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import user_icon from "../../assets/user.png";

export default function CanteenHeader({ canteenName, canteenId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // Toggle User Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close Dropdown When Clicking Outside
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close Mobile Menu When Clicking Outside
  const closeMobileMenu = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  // Handle Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Add event listeners for closing dropdowns
  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    document.addEventListener("click", closeMobileMenu);
    return () => {
      document.removeEventListener("click", closeDropdown);
      document.removeEventListener("click", closeMobileMenu);
    };
  }, []);

  return (
    <header className="bg-[rgba(3,29,53,0.8)] flex justify-between items-center p-4 shadow-lg sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-16 h-16 rounded-full" />
      </div>

      {/* Desktop View - User Section */}
      <div className="hidden md:flex items-center space-x-4">
        <h2 className="text-white text-lg font-semibold">
          <span className="text-yellow-300">Logged as:</span> {canteenName}
        </h2>

        <div className="relative" ref={dropdownRef}>
          <img
            src={user_icon}
            alt="User Icon"
            className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[rgba(3,29,53,0.8)] text-white rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li>
                  <Link
                    to={`/canteen/account/${canteenId}`}
                    className="block px-4 py-2 hover:bg-blue-950 transition no-underline"
                  >
                    Account Details
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block px-4 py-2 hover:bg-blue-950 transition no-underline"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Mobile & Tablet View - Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          ☰ {/* Hamburger Icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-[80px] right-2 w-48 bg-[rgba(3,29,53,0.8)] text-white rounded-lg shadow-lg p-4 z-50 md:hidden"
        >
          <div className="flex flex-col items-center space-y-4">
            <img
              src={user_icon}
              alt="User Icon"
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <h2 className="text-white text-sm text-center">
              <span className="text-yellow-300">Logged as:</span> {canteenName}
            </h2>
            <Link
              to={`/canteen/account/${canteenId}`}
              className="w-full text-center py-2 bg-blue-700 rounded-lg hover:bg-blue-500 transition"
            >
              Account Details
            </Link>
            <Link
              to="/about"
              className="w-full text-center py-2 bg-blue-700 rounded-lg hover:bg-blue-500 transition"
            >
              About Us
            </Link>
            <button
              className="w-full py-2 bg-yellow-500 text-blue-950 rounded-lg font-semibold hover:bg-yellow-400 transition"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
