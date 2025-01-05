// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged, logOutUser } from '../firebaseConfig';
import { User, LogOut } from 'lucide-react';
import '../assets/style/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">IMOVIE.CO</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#movies">Movies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#news">News</a>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <button className="btn btn-danger me-2" onClick={handleLogout}>
                <LogOut size={20} />
              </button>
              <a href="/profile" className="nav-link">
                <User size={20} />
              </a>
            </div>
          ) : (
            <button className="btn btn-danger">
              <a className="nav-link" href="login">Sign In</a>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;