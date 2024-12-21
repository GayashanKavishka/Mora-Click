import React from 'react';
import './ContactUs.css';
import contact from '../assets/contact.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ContactUs() {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "c3794d33-5403-4aa1-9cec-6aa2b4260d1a");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          alert(res.message); // Display success message
        }
    };

    return (
      <>
      <Header />
        <div className="contact-container">
          <header className="contact-header">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Feel free to reach out using the form below.</p>
          </header>
          <section className="contact-content">
            <div className="contact-form">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Write your message" rows="5" required></textarea>
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
      <Footer />
      </>
    );
}
