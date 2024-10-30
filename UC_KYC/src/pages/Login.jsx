import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { motion, AnimatePresence } from 'framer-motion';
import LoginLogo from '../../public/uckyc.png';
import LoginBg from '../assets/bg.avif';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    gender: ''
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      if (username === 'admin@gmail.com' && password === 'Admin@123') {
        navigate("/dashboard");
      } else {
        alert('Invalid username or password!');
      }
    } else {
      // Registration logic here
      alert('Registration successful!');
    }
  };

  return (
    <div 
      className="flex justify-center items-center  bg-center bg-cover py-8" 
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-md w-full animate-fadeIn">
        <div className="flex flex-col justify-center items-center gap-2 mb-6">
          <img src={LoginLogo} alt="Credo Logo" className="w-32" />
          <h1 className='text-2xl'>Universal KYC</h1>
        </div>
        <h2 className="mb-5 text-2xl font-semibold">{isLogin ? 'Welcome!' : 'Register'}</h2>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
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
                <button 
                  type="submit" 
                  className="w-full py-3 bg-[#011452] text-white rounded-lg text-lg font-semibold hover:bg-[#007bfef5] transition duration-300"
                >
                  Login
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-center items-center gap-2 ">
                <input
                  type="text"
                  placeholder="First Name"
                  value={registrationData.firstName}
                  onChange={(e) => setRegistrationData({ ...registrationData, firstName: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={registrationData.lastName}
                  onChange={(e) => setRegistrationData({ ...registrationData, lastName: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
                />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={registrationData.username}
                  onChange={(e) => setRegistrationData({ ...registrationData, username: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={registrationData.email}
                  onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={registrationData.password}
                  onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
                />
                <select
                  value={registrationData.gender}
                  onChange={(e) => setRegistrationData({ ...registrationData, gender: e.target.value })}
                  className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg text-lg"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-[#011452] text-white rounded-lg text-lg font-semibold hover:bg-[#007bfef5] transition duration-300"
                >
                  Register
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="mt-4 text-[#011452] hover:underline"
        >
          {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
        </button>
      </div>
    </div>
  );
};

export default Login;
