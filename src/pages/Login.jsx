// Login.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/style/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success('Login berhasil!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/'), 5000); // Redirect to home page after 5 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1 className="auth-logo">I MOVIES</h1>
            <h2 className="auth-title">Sign In</h2>
            <p className="auth-subtitle">Welcome back to the world of cinema</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="email" 
                className="auth-input" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group password-group">
              <input 
                type={showPassword ? "text" : "password"} 
                className="auth-input" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="form-group d-flex justify-content-between align-items-center">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkbox-text">Remember me</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="auth-button">Sign In</button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <a href="/register" className="auth-link">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;