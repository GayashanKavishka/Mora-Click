import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Pages/Welcome';
import AboutUs from './Pages/AboutUs';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ContactUs from './Pages/ContactUs';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs/>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
