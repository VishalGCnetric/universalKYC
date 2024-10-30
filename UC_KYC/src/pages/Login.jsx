import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import LoginLogo from '../../public/uckyc.png';
import LoginBg from '../assets/bg.avif';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(username)) {
      toast.error('Please enter a valid email address!');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('Password should be at least 8 characters long and include uppercase, lowercase, number, and special character!');
      return;
    }

    if (username === 'admin@gmail.com' && password === 'Admin@123') {
      toast.success('Login successful!');
      navigate("/dashboard");
    } else {
      toast.error('Invalid username or password!');
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-center bg-cover" 
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-md w-full animate-fadeIn">
        <div className="flex justify-center mb-6">
          <img src={LoginLogo} alt="Credo Logo" className="w-48" />
        </div>
        <h1 className="text-2xl -mt-6">UNIVERSAL KYC</h1>
        <h2 className="mb-5  text-2xl font-semibold">Welcome!</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
          />
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#007AFE]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* <div className="flex items-center justify-start mb-6">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleToggle} 
                className="sr-only"
              />
              <div 
                className={`w-12 h-6 bg-gray-300 rounded-full transition-colors duration-300 ${isChecked ? 'bg-[#007AFE]' : ''}`}
              >
                <div 
                  className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 transform ${isChecked ? 'translate-x-6' : 'translate-x-1'}`}
                ></div>
              </div>
              <span className="ml-3">Remember Me</span>
            </label>
          </div> */}
          <button 
            type="submit" 
            className="w-full py-3 bg-[#007AFE] text-white rounded-lg text-lg font-semibold hover:bg-[#007bfef5]  transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
