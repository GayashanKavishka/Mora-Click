import React from "react";
import "./Login.css"; // Create a CSS file for styling
import logo from "../assets/logo.png"; // Add your logo image here

const LoginPage = () => {
  return (
    <div className="login-page-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="logo-container">
          <img
            src= {logo}
            alt="Mora-Click Logo"
            className="logo-image"
          />
        </div>
        <h1 className="wel">Welcome to Mora-Click!</h1>
        {/* <p className="intro-text">
          Your one-stop solution for seamless campus engagement. Log in to
          access personalized resources, manage your academic activities, and
          stay updated with the latest university news.
        </p> */}
        {/* <p className="intro-text">
          Empowering students and enriching the university experience with
          innovation and connectivity.
        </p> */}
        <p className="cta-text">Login to explore your journey at Mora!</p>
      </div>

      {/* Right Section */}
    <div className="login-right-container">
      <div className="login-right">
        <h2>LOGIN</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username" className=" te">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter the username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                placeholder="Enter the password"
              />
            </div>
          </div>
          <button type="submit" className="login_button">
            Login
          </button>
        </form>
        <p className="signup-text">
          Do you haven’t account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
