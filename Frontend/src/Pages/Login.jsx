import React from "react";
import { useState  } from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Login.css"; // Create a CSS file for styling
import logo from "../assets/logo.png"; // Add your logo image here



const LoginPage = () => {
    
   const [userName, setUserName] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/login", {
      username: userName,
      password: password,
    }).then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
      // alert("Login Successful");
      toast.success("Login Successful!", { autoClose: 2000 });
      setTimeout(()=>{
        const decoded = jwtDecode(response.data.token);
        if(decoded.role === "canteen") navigate("/canteen/home");
        else navigate("/");
      },2000);
      // const decoded = jwtDecode(response.data.token);
      // if(decoded.role === "canteen") navigate("/canteen/home");
      // else navigate("/");
    }).catch((error) => {
      console.log(error);
      // alert("Login Failed");
      toast.error("Login Failed");
    });
  
   }


  return (
    <div className="login-page-container">
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
    <div className="login-right-container" style={{}}>
      <div className="login-right">
        <h2>LOGIN</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username" className=" te">Email</label>
            <input
              type="text"
              id="username"
              placeholder="Enter the username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="login_button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p className="signup-text">
          Do you haven’t account? <a href="/sign-up">Sign up</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
