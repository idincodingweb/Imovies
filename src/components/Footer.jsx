// Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import '../assets/style/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Logo */}
          {/* Social Media & Copyright */}
          <div className="col-md-12">
            <div className="footer-right">
              {/* Social Media Links */}
              <div className="social-links">
                <a href="#" className="social-link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link">
                  <Instagram size={20} />
                </a>
              </div>
              
              {/* Copyright */}
              <div className="copyright">
               IdinCode 2024 © IMOVIE.CO
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;