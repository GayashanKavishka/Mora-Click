// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
// import axios from 'axios';
// import {jwtDecode} from "jwt-decode";

// const AccountDetails = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [decodedToken, setDecodedToken] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decoded = jwtDecode(token);
//       console.log("Decoded token:", decoded);
//       setDecodedToken(decoded);
//       setIsLoggedIn(decoded.role !== "canteen");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (decodedToken?.user_id) {
//         try {
//           const response = await axios.get(`http://localhost:5000/user/getuser?_id=${decodedToken.user_id}`);
//           console.log("User data received:", response.data);
//           setUserData(response.data);  // Make sure response contains the expected data structure
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [decodedToken]);

  

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg">
          
//           {/* Circular Avatar */}
//           <div className="flex justify-center">
//             <div className="w-20 h-20 flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full shadow-lg">
//               {userData ? userData.data.firstName.charAt(0) : "?"}
//             </div>
//           </div>

//           {/* User Details */}
//           <div className="text-center mt-4">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {userData ? `${userData.data.firstName} ${userData.data.lastName}` : "Loading..."}
//             </h2>
//             <p className="text-gray-500">{userData ? `${userData.data.role} | ${userData.data.faculty}` : ""}</p>
//           </div>

//           <div className="mt-6 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-medium text-gray-600">Email:</span>
//               <span className="text-gray-700">{userData?.data.e_mail || "N/A"}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium text-gray-600">Contact:</span>
//               <span className="text-gray-700">{userData?.data.contact || "N/A"}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium text-gray-600">Gender:</span>
//               <span className="text-gray-700">{userData?.data.gender || "N/A"}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium text-gray-600">Department:</span>
//               <span className="text-gray-700">{userData?.data.depernment || "N/A"}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-medium text-gray-600">Date of Birth:</span>
//               <span className="text-gray-700">{userData?.data.dob.split('T')[0]|| "N/A"}</span>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => navigate("/edit-account", { state: { userData } })}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//               disabled={!userData}
//             >
//               Edit Profile
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AccountDetails;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import bgphoto from "../assets/bgi.jpg";

const AccountDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (decodedToken?.user_id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/user/getuser?_id=${decodedToken.user_id}`
          );
          setUserData(response.data);
          setFormData(response.data.data); // Store in form state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, [decodedToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/user/updateuser?_id=${decodedToken.user_id}`,
        formData
      );
      setUserData({ data: formData }); // Update local state
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{ backgroundImage: `url(${bgphoto})` }}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <div className="bg-black opacity-30 absolute inset-0"></div>
        <div className="relative bg-white shadow-xl rounded-lg p-6 w-full max-w-lg">
          {/* Circular Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full shadow-lg">
              {userData ? userData.data.firstName.charAt(0) : "?"}
            </div>
          </div>

          {/* User Details */}
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {isEditing ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                    placeholder="Last Name"
                  />
                </div>
              ) : (
                `${userData?.data.firstName || ""} ${userData?.data.lastName || ""}`
              )}
            </h2>
            <p className="text-gray-500">
              {userData ? `${userData.data.role} | ${userData.data.faculty}` : ""}
            </p>
          </div>

          {/* Editable Fields */}
          <div className="mt-6 space-y-4">
            {[
              { label: "Email", key: "e_mail" },
              { label: "Contact", key: "contact" },
              { label: "Gender", key: "gender" },
              { label: "Department", key: "depernment" },
            ].map(({ label, key }) => (
              <div className="flex justify-between" key={key}>
                <span className="font-medium text-gray-600">{label}:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  <span className="text-gray-700">
                    {formData[key] || "N/A"}
                  </span>
                )}
              </div>
            ))}

            {/* Date of Birth with Calendar */}
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Date of Birth:</span>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob ? formData.dob.split("T")[0] : ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                />
              ) : (
                <span className="text-gray-700">
                  {formData.dob ? formData.dob.split("T")[0] : "N/A"}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;

