import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/style/Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser(email, password);
      toast.success('Pendaftaran berhasil!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 5 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-fluid auth-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1 className="auth-logo">I MOVIES</h1>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join the ultimate Movies experience</p>
          </div>

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <input 
                type="text" 
                className="auth-input" 
                placeholder="Full Name"
                required 
              />
            </div>

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

            <div className="form-group password-group">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="auth-input" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="form-group">
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkbox-text">
                  I agree to the <a href="#" className="auth-link">Terms of Service</a> and <a href="#" className="auth-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button type="submit" className="auth-button">Create Account</button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <a href="/login" className="auth-link">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;