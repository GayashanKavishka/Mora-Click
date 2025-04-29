import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import bg from "../assets/bgi.jpg";

const SignUp = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    faculty: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(""); // Success or error message
  const [error, setError] = useState(""); // Password mismatch error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError(""); // Clear previous errors

    const userData = {
      FName: formData.firstName,
      LName: formData.lastName,
      DOB: formData.dob,
      Email: formData.email,
      Password: formData.password,
      Role: formData.role,
      PNumber: formData.phone,
      Gender: formData.gender,
      Depernment: formData.department,
      Faculty: formData.faculty,
    };

    try {
      const response = await axios.post("https://mora-click-7.onrender.com/user/insertUser", userData);
      setMessage("User registered successfully!");

      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000); // Delay to show the success message

      console.log("Success:", response.data);
    } catch (error) {
      setMessage("This user already exists.");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Sign Up</h2>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Faculty</label>
          <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Non Academic Staff">Non Academic Staff</option>
          </select>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
