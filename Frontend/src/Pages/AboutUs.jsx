import React from 'react'
import './AboutUs.css'
import about from '../assets/about.jpg'
import yasith from '../assets/yasith.png'
import gaya from '../assets/gaya.jpg'
import dineth from '../assets/dineth.jpg'
import sethna from '../assets/sethna.jpg'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import DIAK from '../assets/DIAK.png'


export default function AboutUs() {
    return (

        <div className="about-us-container">
          <Header/>
          <header className="about-header">
            <h1>About Us</h1>
            <p>We are team DIAK with passionable for explouring and innovating the future.</p>
            <div className="diak-logo">
              <img src={DIAK} alt="DIAK Logo" />
            </div>
          </header>

          <section className="about-content">
            <div className="about-text">
              <h1>Our Story</h1>
              <p>
                At Mora Click, we believe that food brings people together. Our journey started with a shared passion
                for high-quality, delicious meals. From humble beginnings to becoming a well-known name in the food industry,
                we've always focused on quality, service, and community.
              </p>
            </div>
            
          </section>
    
          <section className="team-section">
            <h2>Meet Our Team</h2>
            <div className="team-members">
              <div className="team-member">
                <img src={gaya} alt="Team Member 1" />
                <h3>Kavishka Gayashan</h3>
                <p>Founder & CEO</p>
              </div>
              <div className="team-member">
                <img src={dineth} alt="Team Member 2" />
                <h3>Dineth Danurdha</h3>
                <p>Main Architecture</p>
              </div>
              <div className="team-member">
                <img src={yasith} alt="Team Member 3" />
                <h3>Yasith Imalka</h3>
                <p>System Designer</p>
              </div>
              <div className="team-member">
                <img src={sethna} alt="Team Member 4" />
                <h3>Sethna Amanethmi</h3>
                <p>System Designer</p>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      );
}
