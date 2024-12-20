import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Pages/Welcome';
import AboutUs from './Pages/AboutUs';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ContactUs from './Pages/ContactUs';
import GodaYata from './Pages/GodaYata';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/godayata" element={<GodaYata/>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
