import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const EditAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (location.state && location.state.userData) {
      console.log("User data received:", location.state.userData.data.data);
      setFormData(location.state.userData.data);
    }
  } ,[])


  useEffect(() => {
    if (formData) {
      console.log("User data ", formData);
    }
    
  }, [formData]);
 


 
//   const [formData, setFormData] = useState({});


//   // console.log("User data received:", state.userData);
//   useEffect(() => {
//     if (state && state.userData) {
//         console.log("User data received:", state.userData.data);
//         setFormData(state.userData.data); 
//        // Populate form with user data
//     }
//   }, [state]);


// useEffect(()=>{
//   console.log("User data ", formData);
//   if(formData){
//     console.log("User data ", formData.data);
//   }
// },[formData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., update user data
    console.log(formData);
    navigate("/account"); // Redirect back to account details page
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg">
          <form className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-500 text-white text-3xl font-bold rounded-full shadow-lg">
                {formData ? formData.firstName.charAt(0) : "?"}
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Profile</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="firstName">First Name:</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData ? formData.firstName : ""}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="lastName">Last Name:</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData ? formData.lastName : ""}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="e_mail">Email:</label>
                <input
                  id="e_mail"
                  type="email"
                  name="e_mail"
                  value={formData ? formData.e_mail : ""}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="contact">Contact:</label>
                <input
                  id="contact"
                  type="text"
                  name="contact"
                  value={formData ? formData.contact : ""}
                  onChange={handleChange}
                  placeholder="Enter Contact Number"
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="gender">Gender:</label>
                <input
                  id="gender"
                  type="text"
                  name="gender"
                  value={formData ? formData.gender : ""}
                  onChange={handleChange}
                  placeholder="Enter Gender"
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="department">Department:</label>
                <input
                  id="department"
                  type="text"
                  name="department"
                  value={formData ? formData.depernment : ""}
                  onChange={handleChange}
                  placeholder="Enter Department"
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <label className="font-medium text-gray-600" htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData ? formData.dob.split('T')[0] : ""}
                  onChange={handleChange}
                  className="text-gray-700 p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Save Changes
              </button>
              <button
                onClick={() => navigate("/account")}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditAccount;
