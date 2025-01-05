// Contact.jsx
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import '../assets/style/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="page-title">CONTACT US</h1>
        </div>
      </div>

      {/* Contact Content */}
      <div className="contact-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p className="lead mb-5">Have questions? We'd love to hear from you.</p>

                <div className="info-items">
                  <div className="info-item">
                    <MapPin className="icon" />
                    <div>
                      <h3>Location</h3>
                      <p>123 Cinema Street, Movie District, 12345</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Phone className="icon" />
                    <div>
                      <h3>Phone</h3>
                      <p>+38 (099) 01 01 001</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Mail className="icon" />
                    <div>
                      <h3>Email</h3>
                      <p>info@imagixcinema.com</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <Clock className="icon" />
                    <div>
                      <h3>Working Hours</h3>
                      <p>Daily: 10:00 AM - 12:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-form">
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Your Name" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Your Email" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Subject" />
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="5" placeholder="Your Message"></textarea>
                  </div>
                  <button type="submit" className="btn btn-danger btn-lg">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;