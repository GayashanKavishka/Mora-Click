

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import "./App.css";
// import Welcome from "./Pages/Welcome";
// import AboutUs from "./Pages/AboutUs";
// import ContactUs from "./Pages/ContactUs";
// import GodaYata from "./Pages/GodaYata";
// import GodaUda from "./Pages/GodaUda";
// import StaffCanteen from "./Pages/StaffCanteen";
// import CivilCanteen from "./Pages/CivilCanteen";
// import Home from "./Canteen_Level/home/home";
// import Login from "./Pages/Login";
// import Menu from "./Pages/Menu";
// import SignUp from "./Pages/SignUp";
// import EditAccount from "./Canteen_Level/account/account";
// import ProtectedCanteenRoute from "./Auth/protectedCanteenRoutes";
// import Loading from "./Components/Loading";
// import EditPage from "./Canteen_Level/Editpage";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ProtectedUserRoute from "./Auth/protectedUserRoutes";
// import Account from "./Pages/Account";
// import { onMessageListener, requestFCMToken } from "./utils/firebaseUtils";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";



// // function AppContent() {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const location = useLocation();
// //   const [prevRoute, setPrevRoute] = useState(null);

// //   const noLoadingPaths = ["/login", "/sign-up", "/editmenu", "/canteen/account/:id"];
// //   const skipLoadingTransitions = [
// //     { from: "/editmenu", to: "/canteen/Home" },
// //   ];

// //   useEffect(() => {
// //     const currentRoute = location.pathname;

// //     // Check if we should skip loading
// //     const shouldSkipLoading = skipLoadingTransitions.some(
// //       (transition) => transition.from === prevRoute && transition.to === currentRoute
// //     );

// //     if (shouldSkipLoading || noLoadingPaths.includes(currentRoute)) {
// //       setIsLoading(false);
// //     } else {
// //       setIsLoading(true);
// //       const timer = setTimeout(() => {
// //         setIsLoading(false);
// //       }, 2000);
// //       return () => clearTimeout(timer);
// //     }

// //     // Always update previous route after checking
// //     setPrevRoute(currentRoute);

// //   }, [location]);

// //   return (
// //     <>
// //       {isLoading && <Loading />}
// //       {!isLoading && (
// //         <main>
// //           <Routes>
// //             <Route path="/" element={<Welcome />} />
// //             <Route path="/about" element={<AboutUs />} />
// //             <Route path="/contact" element={<ContactUs />} />
// //             <Route path="/godayata" element={<GodaYata />} />
// //             <Route path="/godauda" element={<GodaUda />} />
// //             <Route path="/staff" element={<StaffCanteen />} />
// //             <Route path="/civil" element={<CivilCanteen />} />
// //             <Route path="/menu" element={<Menu />} />
// //             <Route path="/sign-up" element={<SignUp />} />
// //             <Route path="/editmenu" element={<EditPage />} />
// //             {/*----------------------canteen level----------------------*/}
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/canteen/Home" element={<ProtectedCanteenRoute><Home /></ProtectedCanteenRoute>} />
// //             <Route path="/canteen/account/:id" element={<ProtectedCanteenRoute><EditAccount /></ProtectedCanteenRoute>} />
// //           </Routes>
// //         </main>
// //       )}
// //     </>
// //   );
// // }


// //-------Token handling functions-------  




// const loadScript = (src) => {
//   const script = document.createElement("script");
//   script.src = src;
//   script.async = true;
//   document.body.appendChild(script);
// };

// function AppContent() {
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   const [prevRoute, setPrevRoute] = useState(null);

//   // Token functions 

  

//   // Routes where loading should never be shown
//   const noLoadingPaths = ["/login", "/sign-up", "/editmenu", "/canteen/account/:id"];

//   // Define transitions where loading should be skipped
//   const skipLoadingTransitions = [
//     { from: "/editmenu", to: "/canteen/Home" },
//   ];

//   useEffect(() => {
//     const currentRoute = location.pathname;

//     console.log("Current route:", currentRoute);
//     console.log("Previous route:", prevRoute);

//     // Check if the transition should skip loading
//     const shouldSkipLoading = skipLoadingTransitions.some(
//       ({ from, to }) => prevRoute === from && currentRoute === to
//     );

//     // If the current route is in noLoadingPaths OR should skip loading, don't show loading
//     if (noLoadingPaths.includes(currentRoute) || shouldSkipLoading) {
//       setIsLoading(false);
//     } else {
//       setIsLoading(true);
//       const timer = setTimeout(() => {
//         setIsLoading(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }

//     // Always update the previous route AFTER processing
//     setPrevRoute(currentRoute);
//   }, [location.pathname]); // Only trigger effect when pathname changes

//   useEffect(() => {
//     console.log("Prev route:", prevRoute);
//   },[prevRoute]);
  

  

//   useEffect(() => {
//     loadScript(`./public/firebase-messaging-sw.js`);
//   }, []);



//   const [FCMToken, setFCMToken] = useState(null);
  


//   useEffect(() => {
//      console.log("Fetching FCM token...");
//      const FCMToken = async ()=>{
//       try{
//         console.log("Fetching FCM token inside try ...");
//         const fetchFCMToken = await requestFCMToken();
//         console.log("FCM", fetchFCMToken);
//         setFCMToken(fetchFCMToken);
//       }
//       catch(err){
//         console.log("error getting FCM token",err);
//       }
//      }

//     FCMToken();
//   },[]);


//   // onMessageListener()
//   // .then((payload) => {
//   //   toast(
//   //     <div>
//   //       <strong>{payload.notification.title}</strong>
//   //       <div>{payload.notification.body}</div>
//   //     </div>,
//   //     {
//   //       position: "top-right",
//   //       autoClose: 5000,
//   //       hideProgressBar: false,
//   //       closeOnClick: true,
//   //       pauseOnHover: true,
//   //       draggable: true,
//   //       progress: undefined
//   //     }
//   //   )
//   //   console.log("Message received. ", payload);
//   // })
//   // .catch((err) => console.log("No message received. ", err));

//   onMessageListener()
//   .then((payload) => {
//     console.log("Message received:", payload);

//     // Show browser notification
//     if (Notification.permission === "granted") {
//       new Notification(payload.notification.title, {
//         body: payload.notification.body,
//         icon: "/icon.png",  // Add an icon if needed
//       });
//     }

//     // Also show toast notification
//     toast(
//       <div>
//         <strong>{payload.notification.title}</strong>
//         <div>{payload.notification.body}</div>
//       </div>,
//       {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       }
//     );
//   })
//   .catch((err) => console.log("No message received.", err));

  
//   //----------------------------------------------------------------------------------------------------

//   // const[decodedToken,setDecodedToken] = useState(null);
//   // const[ID,setID] = useState("");


//   // useEffect(()=>{
//   //   const token = localStorage.getItem("token");
//   //   console.log("Token from App.js:",token);
//   //   if(token){
//   //     const decodedToken = jwtDecode(token);
//   //     setDecodedToken(decodedToken);
//   //     setID(decodedToken.ID);
//   //   }
//   // },[])

//   // useEffect(()=>{
     
//   //   if(decodedToken){
//   //     console.log("Decoded token from App.js:",decodedToken);
//   //     console.log("FCM token to update",FCMToken)
//   //     axios.post("http://localhost:5000/user/addFCM",
//   //     {
//   //       _id:decodedToken.ID,
//   //       FCMToken:FCMToken
//   //     })
//   //     .then((res)=>{
//   //       console.log("FCM token added to DB successfully");
//   //     })
//   //     .catch((err)=>{
//   //       console.log("Error adding FCM token to DB",err);
//   //     })
      
//   //   }
//   //   else{
//   //     console.log("no token to decode")
//   //   }
//   // },[decodedToken,FCMToken]);


  

//   return (
//     <>
//       {isLoading && <Loading />}
//       {!isLoading && (
//         <main>
//           <Routes>
//             <Route path="/" element={<ProtectedUserRoute><Welcome/></ProtectedUserRoute>}/>
//             <Route path="/about" element={<ProtectedUserRoute><AboutUs /></ProtectedUserRoute>} />
//             <Route path="/contact" element={<ProtectedUserRoute><ContactUs /></ProtectedUserRoute>} />
//             <Route path="/godayata" element={<ProtectedUserRoute><GodaYata /></ProtectedUserRoute>} />
//             <Route path="/godauda" element={<ProtectedUserRoute><GodaUda /></ProtectedUserRoute>} />
//             <Route path="/staff" element={<ProtectedUserRoute><StaffCanteen /></ProtectedUserRoute>} />
//             <Route path="/civil" element={<ProtectedUserRoute><CivilCanteen /></ProtectedUserRoute>} />
//             <Route path="/menu" element={<ProtectedUserRoute><Menu /></ProtectedUserRoute>} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/editmenu" element={<EditPage />} />
//             <Route path="/account" element={<ProtectedUserRoute><Account/></ProtectedUserRoute>} />

//             {/*----------------------canteen level----------------------*/}
//             <Route path="/login" element={<Login/>} />
//             <Route path="/canteen/Home" element={<ProtectedCanteenRoute><Home /></ProtectedCanteenRoute>} />
//             <Route path="/canteen/account/:id" element={<ProtectedCanteenRoute><EditAccount /></ProtectedCanteenRoute>} />
//           </Routes>
//         </main>
//       )}
//     </>
//   );
// }


// function App() {
//   return (
//     <Router>
//       <ToastContainer />
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedUserRoute from "./Auth/protectedUserRoutes";
import Account from "./Pages/Account";
import { onMessageListener, requestFCMToken } from "./utils/firebaseUtils";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import VerifyEmail from "./Pages/VerifyEmail";

// Token handling functions
const loadScript = (src) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [prevRoute, setPrevRoute] = useState(null);

  // Token functions 

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

  useEffect(() => {
    loadScript(`./public/firebase-messaging-sw.js`);
  }, []);

  // FCM token fetching
  const [FCMToken, setFCMToken] = useState(null);

  useEffect(() => {
    console.log("Fetching FCM token...");
    const FCMToken = async () => {
      try {
        console.log("Fetching FCM token inside try ...");
        const fetchFCMToken = await requestFCMToken();
        console.log("FCM", fetchFCMToken);
        setFCMToken(fetchFCMToken);
      } catch (err) {
        console.log("error getting FCM token", err);
      }
    };

    FCMToken();
  }, []);

  // Firebase messaging onMessageListener
  // onMessageListener()
  //   .then((payload) => {
  //     console.log("Message received:", payload);

  //     // Show browser notification
  //     if (Notification.permission === "granted") {
  //       new Notification(payload.notification.title, {
  //         body: payload.notification.body,
  //         icon: "/icon.png", // Add an icon if needed
  //       });
  //     }

  //     // Also show toast notification
  //     toast(
  //       <div>
  //         <strong>{payload.notification.title}</strong>
  //         <div>{payload.notification.body}</div>
  //       </div>,
  //       {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       }
  //     );
  //   })
  //   .catch((err) => console.log("No message received.", err));


  useEffect(()=>{
    onMessageListener()
    .then((payload) => {
      console.log("Message received:", payload);

      // Show browser notification
      if (Notification.permission === "granted") {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/icon.png", // Add an icon if needed
        });
      }

      // Also show toast notification
      toast(
        <div>
          <strong>{payload.notification.title}</strong>
          <div>{payload.notification.body}</div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    })
    .catch((err) => console.log("No message received.", err));
  })

  // Register service worker for Firebase messaging
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(function(registration) {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <main>
          <Routes>
            <Route path="/" element={<ProtectedUserRoute><Welcome /></ProtectedUserRoute>} />
            <Route path="/about" element={<ProtectedUserRoute><AboutUs /></ProtectedUserRoute>} />
            <Route path="/contact" element={<ProtectedUserRoute><ContactUs /></ProtectedUserRoute>} />
            <Route path="/godayata" element={<ProtectedUserRoute><GodaYata /></ProtectedUserRoute>} />
            <Route path="/godauda" element={<ProtectedUserRoute><GodaUda /></ProtectedUserRoute>} />
            <Route path="/staff" element={<ProtectedUserRoute><StaffCanteen /></ProtectedUserRoute>} />
            <Route path="/civil" element={<ProtectedUserRoute><CivilCanteen /></ProtectedUserRoute>} />
            <Route path="/menu" element={<ProtectedUserRoute><Menu /></ProtectedUserRoute>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/editmenu" element={<EditPage />} />
            <Route path="/account" element={<ProtectedUserRoute><Account /></ProtectedUserRoute>} />

            <Route path="/verify/:token" element={<VerifyEmail></VerifyEmail>}/>

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
      <ToastContainer />
      <AppContent />
    </Router>
  );
}

export default App;
