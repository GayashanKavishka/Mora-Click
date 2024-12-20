import React from 'react'
import './ContactUs.css';
import contact from '../assets/contact.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ContactUs() {
    return (
      <>
      <Header/>
        <div className="contact-container">
          <header className="contact-header">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Feel free to reach out using the form below.</p>
          </header>
          <section className="contact-content">
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" placeholder="Write your message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
            <div className="contact-details">
              <h2>Our Address</h2>
              <p>University of Moratuwa</p>
              <h2>Phone</h2>
              <p>+94 123 456 789</p>
              <h2>Email</h2>
              <p>info@moraclick.com</p>
            </div>
          </section>
        </div>
        <Footer/>
        </>
      );
}
