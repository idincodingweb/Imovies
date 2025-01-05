import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import DetailMovie from './pages/DetailMovie';
import Dashboard from './components/Dashboard';
import Banner from './components/Banner';
import Footer from './components/Footer';

const AppContent = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/detailmovie/:id" element={<DetailMovie />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppContent;