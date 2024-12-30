import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Pages/Welcome';
import AboutUs from './Pages/AboutUs';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ContactUs from './Pages/ContactUs';
import GodaYata from './Pages/GodaYata';
import GodaUda from './Pages/GodaUda';
import StaffCanteen from './Pages/StaffCanteen';
import CivilCanteen from './Pages/CivilCanteen';
import Home from './Canteen_Level/home/home';
import Login from './Pages/Login';
import Menu from './Pages/Menu';
import EditAccount from './Canteen_Level/account/account';
import ProtectedCanteenRoute from './Auth/protectedCanteenRoutes';
// import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/godayata" element={<GodaYata/>} />
          <Route path="/godauda" element={<GodaUda/>} />
          <Route path="/staff" element={<StaffCanteen/>} />
          <Route path="/civil" element={<CivilCanteen/>} />
          <Route path="/menu" element={<Menu/>} />

          {/*----------------------canteeen level----------------------*/}
          <Route path="/login" element={<Login/>} />
          <Route path= "/canteen/Home" element = {<ProtectedCanteenRoute><Home/></ProtectedCanteenRoute>} />
          <Route path="/canteen/account/:id" element={<ProtectedCanteenRoute><EditAccount/></ProtectedCanteenRoute>} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
