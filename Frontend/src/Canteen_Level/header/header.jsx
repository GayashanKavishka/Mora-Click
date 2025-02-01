// import React, { useState, useEffect, useRef } from 'react';
// import './header.css';
// import logo from '../../assets/logo.jpg';
// import user_icon from '../../assets/user.png';
// import { useNavigate } from 'react-router-dom';
// import {Link} from 'react-router-dom';

// export default function Canteen_header({canteenName, canteenId}) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const closeDropdown = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setIsDropdownOpen(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   }

//   useEffect(() => {
//     document.addEventListener('click', closeDropdown);
//     return () => {
//       document.removeEventListener('click', closeDropdown);
//     };
//   }, []);

//   return (
//     <header className="navbar">
//       {/* Logo Section */}
//       <div className="logo">
//         <img src={logo} alt="logo" />
//       </div>

//       {/* User Section */}
//       <div className="user_section">
//         <h2 className="canteen-name"><span style={{color :"yellow"}}>Logged as:</span> {canteenName}</h2>
//         <div className="user-icon-container" ref={dropdownRef}>
//           <img
//             src={user_icon}
//             alt="User Icon"
//             className="user-icon"
//             onClick={toggleDropdown}
//           />
//           {isDropdownOpen && (
//             <div className="dropdown-menus">
//               <ul>
//                 <li><Link to = { `/canteen/account/${canteenId}`}  style={{color:"#ffff",textDecoration:"none"}}>Account Details</Link></li>
//                 <li><Link to = "/about" style={{color:"#ffff",textDecoration:"none"}} >About Us</Link></li>
//               </ul>
//             </div>
//           )}
//         </div>
//         <button className="login-button" onClick={logout}>Logout</button>
//       </div>
//     </header>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import logo from '../../assets/logo.jpg';
import user_icon from '../../assets/user.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Canteen_header({ canteenName, canteenId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <header className="navbar">
      {/* Navigation Buttons (Visible Only on Mobile & Tablet) */}
      {/* <div className="mobile-nav-buttons ">
        <button onClick={() => navigate(-1)} className="nav-btn">◀</button>
        <button onClick={() => navigate(1)} className="nav-btn">▶</button>
      </div> */}

      {/* Logo Section */}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      {/* User Section */}
      <div className="user_section">
        <h2 className="canteen-name">
          <span style={{ color: 'yellow' }}>Logged as:</span> {canteenName}
        </h2>
        <div className="user-icon-container" ref={dropdownRef}>
          <img
            src={user_icon}
            alt="User Icon"
            className="user-icon"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menus">
              <ul>
                <li>
                  <Link
                    to={`/canteen/account/${canteenId}`}
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    Account Details
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <button className="login-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
