

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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedUserRoute from "./Auth/protectedUserRoutes";
import Account from "./Pages/Account";

// function AppContent() {
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   const [prevRoute, setPrevRoute] = useState(null);

//   const noLoadingPaths = ["/login", "/sign-up", "/editmenu", "/canteen/account/:id"];
//   const skipLoadingTransitions = [
//     { from: "/editmenu", to: "/canteen/Home" },
//   ];

//   useEffect(() => {
//     const currentRoute = location.pathname;

//     // Check if we should skip loading
//     const shouldSkipLoading = skipLoadingTransitions.some(
//       (transition) => transition.from === prevRoute && transition.to === currentRoute
//     );

//     if (shouldSkipLoading || noLoadingPaths.includes(currentRoute)) {
//       setIsLoading(false);
//     } else {
//       setIsLoading(true);
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }

//     // Always update previous route after checking
//     setPrevRoute(currentRoute);

//   }, [location]);

//   return (
//     <>
//       {isLoading && <Loading />}
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
//             <Route path="/editmenu" element={<EditPage />} />
//             {/*----------------------canteen level----------------------*/}
//             <Route path="/login" element={<Login />} />
//             <Route path="/canteen/Home" element={<ProtectedCanteenRoute><Home /></ProtectedCanteenRoute>} />
//             <Route path="/canteen/account/:id" element={<ProtectedCanteenRoute><EditAccount /></ProtectedCanteenRoute>} />
//           </Routes>
//         </main>
//       )}
//     </>
//   );
// }

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [prevRoute, setPrevRoute] = useState(null);

  // Routes where loading should never be shown
  const noLoadingPaths = ["/login", "/sign-up", "/editmenu", "/canteen/account/:id"];

  // Define transitions where loading should be skipped
  const skipLoadingTransitions = [
    { from: "/editmenu", to: "/canteen/Home" },
  ];

  useEffect(() => {
    const currentRoute = location.pathname;

    console.log("Current route:", currentRoute);
    console.log("Previous route:", prevRoute);

    // Check if the transition should skip loading
    const shouldSkipLoading = skipLoadingTransitions.some(
      ({ from, to }) => prevRoute === from && currentRoute === to
    );

    // If the current route is in noLoadingPaths OR should skip loading, don't show loading
    if (noLoadingPaths.includes(currentRoute) || shouldSkipLoading) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Always update the previous route AFTER processing
    setPrevRoute(currentRoute);
  }, [location.pathname]); // Only trigger effect when pathname changes

  useEffect(() => {
    console.log("Prev route:", prevRoute);
  },[prevRoute]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <main>
          <Routes>
            <Route path="/" element={<ProtectedUserRoute><Welcome/></ProtectedUserRoute>}/>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/godayata" element={<GodaYata />} />
            <Route path="/godauda" element={<GodaUda />} />
            <Route path="/staff" element={<StaffCanteen />} />
            <Route path="/civil" element={<CivilCanteen />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/editmenu" element={<EditPage />} />
            <Route path="/account" element={<Account/>} />
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
      <ToastContainer position="top-right" autoClose={2000} />
      <AppContent />
    </Router>
  );
}

export default App;
