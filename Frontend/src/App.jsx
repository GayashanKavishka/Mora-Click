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
import Home from './Canteen_Level/Home/home';

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

          {/*----------------------canteeen level----------------------*/}
          <Route path= "/canteen/home" element = {<Home/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
