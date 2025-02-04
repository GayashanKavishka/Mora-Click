import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import bg from "../assets/bgi.jpg"; // Import background image

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "Kavishka",
    lastName: "Gayashan",
    dob: "2001-09-18",
    username: "gayashankavishka2@gmail.com",
    password: "********",
    role: "Student",
    faculty: "Engineering",
    email: "gayashankavishka2@gmail.com",
    contact: "0717661477",
    gender: "Male",
    department: "CSE",
  });

  // Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes (can be connected to a backend API)
  const handleSave = () => {
    console.log("Updated User Data:", user);
    setIsEditing(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }} // Apply background image
    >
      <div className="bg-gray-900 bg-opacity-50 p-4 mt-[60px]">
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white bg-opacity-90 shadow-lg rounded-2xl p-6 w-full max-w-md transition-all duration-300 hover:shadow-2xl">
            
            {/* Profile Circle */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-800 text-white text-2xl font-bold rounded-full shadow-md border-4 border-[#f1c40f]">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              {isEditing ? "Edit Profile" : "Account Details"}
            </h2>
            <div className="border-b-2 border-gray-200 mb-4"></div>

            <div className="space-y-3">
              {Object.entries(user).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <span className="font-medium text-gray-600 capitalize">
                    {key.replace("_", " ")}:
                  </span>
                  
                  {isEditing ? (
                    key === "role" ? (
                      // Dropdown for "Role" field
                      <select
                        name={key}
                        value={user[key]}
                        onChange={handleChange}
                        className="text-gray-800 font-semibold border border-gray-300 rounded-md p-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Student">Student</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Non Academic Staff">Non Academic Staff</option>
                      </select>
                    ) : key === "gender" ? (
                      // Dropdown for "Gender" field
                      <select
                        name={key}
                        value={user[key]}
                        onChange={handleChange}
                        className="text-gray-800 font-semibold border border-gray-300 rounded-md p-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      // Input fields for other fields
                      <input
                        type="text"
                        name={key}
                        value={user[key]}
                        onChange={handleChange}
                        placeholder={`Enter ${key}`}
                        className="text-gray-800 font-semibold border border-gray-300 rounded-md p-1 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )
                  ) : (
                    <span className="text-gray-800 font-semibold">{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons Section */}
            <div className="flex justify-center mt-6 space-x-4">
              {isEditing ? (
                <>
                  <button
                    className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded shadow-md transition-all duration-300 hover:bg-yellow-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-6 py-2 bg-red-600 text-white font-semibold rounded shadow-md transition-all duration-300 hover:bg-red-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    onClick={toggleEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="px-6 py-2 bg-blue-950 text-white font-semibold rounded shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={toggleEdit}
                >
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
