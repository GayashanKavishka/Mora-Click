import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import bg from "../assets/bgi.jpg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate(); // Hook for navigation

  ///-----------

  

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


  const Faculties = [
    "Engineering",
    "Architecture",
    "Business",
    "Medicine",
    "Information Technology",
  ]

  const Departments = {
    Engineering: ["Computer Science", "Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering", "Biomedical Engineering","Electronics Engineering","Materials Engineering","Textile Engineering","EarthResources Engineering", "Transportation Engineering","Fashion Design"],
    Architecture: ["Architecture", "Intergrated Design","BESS","Town and Country Planning","Facility Management"],
    Business: ["Business Administration", "Marketing"],
    Medicine: ["Medicine"],
    "Information Technology": ["ITM", "IT","AI"],
  }

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
      setMessage(response.data.message);
      toast.success("We’ve sent a verification link to your email. Please check your inbox(Spam also). If not, please check your email again and submit.", {
        autoClose: false, // Alert will stay until user closes it
        closeOnClick: true,
        draggable: true,
      });

      // Add this component to your JSX to render the toast notifications
      <ToastContainer />


      // setTimeout(() => {
      //   navigate("/login"); // Redirect to login page
      // }, 2000); // Delay to show the success message

      // console.log("Success:", response.data);
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
          <label>Faculty</label>
          <select name="faculty" value={formData.faculty} onChange={handleChange} required>
            <option value="">Select Faculty</option>
            {Faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {formData.faculty &&
              Departments[formData.faculty].map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
          </select>
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
