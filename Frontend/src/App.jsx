// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';
// import Welcome from './Pages/Welcome';
// import AboutUs from './Pages/AboutUs';
// import ContactUs from './Pages/ContactUs';
// import GodaYata from './Pages/GodaYata';
// import GodaUda from './Pages/GodaUda';
// import StaffCanteen from './Pages/StaffCanteen';
// import CivilCanteen from './Pages/CivilCanteen';
// import Home from './Canteen_Level/home/home';
// import Login from './Pages/Login';
// import Menu from './Pages/Menu';
// import SignUp from './Pages/SignUp';
// import EditAccount from './Canteen_Level/account/account';
// import ProtectedCanteenRoute from './Auth/protectedCanteenRoutes';
// // import '@fortawesome/fontawesome-free/css/all.min.css';
// // import "slick-carousel/slick/slick.css"; 
// // import "slick-carousel/slick/slick-theme.css";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import Loading from './Components/Loading';
// import EditPage from './Canteen_Level/Editpage';


// // This component handles navigation with loading
// function AppContent() {
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation(); // Use location inside Router context
//   const [prevRoute, setPrevRoute] = useState(null);


//   const noLoadingPaths = ["/login", "/sign-up","/editmenu"]; // Add paths where loading should not be shown

//   const skipLoadingTransitions = [
//     { from: "/editmenu", to: "/canteen/Home" },
//     // { from: "/canteen/Home", to: "/canteen/account/:id" },
//   ];

//   useEffect(() => {
//     // Trigger loading effect on route change

//     const shouldSkipLoading = skipLoadingTransitions.some(
//       (transition) =>
//         transition.from === prevRoute && transition.to === location.pathname
//     );

//     if (shouldSkipLoading) {
//       setIsLoading(false);
//       setPrevRoute(location.pathname);
//       return;
//     }


//     if (noLoadingPaths.includes(location.pathname)) {
//       setIsLoading(false);
//       setPrevRoute(location.pathname);
//       return;
//     }
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false); // Set loading to false after the backend data is simulated loaded
//       setPrevRoute(location.pathname);
//     }, 2000); // Adjust this timer to fit your backend response time (or use data fetching logic here)
    
//     return () => clearTimeout(timer);

//     // setPrevRoute(location.pathname);
    

//   }, [location]);

  

//   return (
//     <>
//       {isLoading && <Loading />} {/* Show loading only when isLoading is true */}
//       {!isLoading && (
//         <main>
//           <Routes>
//             <Route path="/" element={<Welcome />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/contact" element={<ContactUs />} />
//             <Route path="/godayata" element={<GodaYata />} />
//             <Route path="/godauda" element={<GodaUda />} />
//             <Route path="/staff" element={<StaffCanteen />} />
//             <Route path="/civil" element={<CivilCanteen />} />
//             <Route path="/menu" element={<Menu />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path = "/editmenu" element ={<EditPage/>}/>

//             {/*----------------------canteen level----------------------*/}
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/canteen/Home"
//               element={<ProtectedCanteenRoute><Home /></ProtectedCanteenRoute>}
//             />
//             <Route
//               path="/canteen/account/:id"
//               element={<ProtectedCanteenRoute><EditAccount /></ProtectedCanteenRoute>}
//             />
//           </Routes>
//         </main>
//       )}
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Welcome from "./Pages/Welcome";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import GodaYata from "./Pages/GodaYata";
import GodaUda from "./Pages/GodaUda";
import StaffCanteen from "./Pages/StaffCanteen";
import CivilCanteen from "./Pages/CivilCanteen";
import Home from "./Canteen_Level/home/home";
import Login from "./Pages/Login";
import Menu from "./Pages/Menu";
import SignUp from "./Pages/SignUp";
import EditAccount from "./Canteen_Level/account/account";
import ProtectedCanteenRoute from "./Auth/protectedCanteenRoutes";
import Loading from "./Components/Loading";
import EditPage from "./Canteen_Level/Editpage";

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [prevRoute, setPrevRoute] = useState(null);

  const noLoadingPaths = ["/login", "/sign-up", "/editmenu"];
  const skipLoadingTransitions = [
    { from: "/editmenu", to: "/canteen/Home" },
  ];

  useEffect(() => {
    const currentRoute = location.pathname;

    // Check if we should skip loading
    const shouldSkipLoading = skipLoadingTransitions.some(
      (transition) => transition.from === prevRoute && transition.to === currentRoute
    );

    if (shouldSkipLoading || noLoadingPaths.includes(currentRoute)) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Always update previous route after checking
    setPrevRoute(currentRoute);

  }, [location]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/godayata" element={<GodaYata />} />
            <Route path="/godauda" element={<GodaUda />} />
            <Route path="/staff" element={<StaffCanteen />} />
            <Route path="/civil" element={<CivilCanteen />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/editmenu" element={<EditPage />} />

            {/*----------------------canteen level----------------------*/}
            <Route path="/login" element={<Login />} />
            <Route path="/canteen/Home" element={<ProtectedCanteenRoute><Home /></ProtectedCanteenRoute>} />
            <Route path="/canteen/account/:id" element={<ProtectedCanteenRoute><EditAccount /></ProtectedCanteenRoute>} />
          </Routes>
        </main>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
