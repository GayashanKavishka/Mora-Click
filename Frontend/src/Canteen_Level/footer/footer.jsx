import React from 'react'
import "./footer.css";
import footer from "../../assets/footer.jpg"; // Add your footer image here

export default function Canteen_Footer() {
    return (
        <footer className="footer">
          <div className="footer-container">
            {/* Column 1: Logo and Intro */}
            <div className="footer-column">
              <h2 className="footer-logo">Mora Click</h2>
              <p>
                Your ultimate destination for delicious, mouth-watering dishes crafted with passion and fresh ingredients.
              </p>
            </div>
    
            {/* Column 2: Quick Links */}
            {/* <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Canteens</a></li>
                <li><a href="#">Contact us</a></li>
              </ul>
            </div> */}
    
            {/* Column 3: Contact Info */}
            <div className="footer-column">
              <h3>Contact Us</h3>
              <p>Email: <a href="mailto:info@moraclick.com">info@moraclick.com</a></p>
              <p>Phone: +94 123 456 789</p>
              <p>Address: University of Moratuwa</p>
            </div>
    
            {/* Column 4: Social Media */}
            <div className="footer-column">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
    
          {/* Bottom Footer */}
          <div className="footer-bottom">
            <p>&copy; 2024 Mora Click. All Rights Reserved.</p>
          </div>
        </footer>
      );
}
