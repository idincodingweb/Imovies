import React from 'react';
import '../assets/style/About.css';
import Images from '../assets/images/profile.png';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container-fluid">
          <div className="profile-section mt-5 text-center">
          <img src={Images} alt="Profile" className="profile-image"/>
          <h3 className="profile-name">Idin Code</h3>
          <p className="profile-title">Front End Development</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-text">
                <h2>Experience Cinema Like Never Before</h2>
                <p className="lead">Welcome to IH MOVIES, where movie magic comes to life.</p>
                <p>Since our establishment, we've been committed to providing the ultimate cinematic experience to our valued patrons. Our state-of-the-art facilities and cutting-edge technology ensure that every visit is memorable.</p>
                
                <div className="features mt-5">
                  <div className="feature-item">
                    <h3>IMOVIES Technology</h3>
                    <p>Experience movies in breathtaking clarity and sound with our IMOVIES screens.</p>
                  </div>
                  <div className="feature-item">
                    <h3>Dolby Atmos</h3>
                    <p>Immerse yourself in 360° sound with our advanced audio system.</p>
                  </div>
                  <div className="feature-item">
                    <h3>VIP Experience</h3>
                    <p>Luxury seating and exclusive amenities for the ultimate comfort.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">IMOVIES Screens</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50k+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Movies Monthly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;