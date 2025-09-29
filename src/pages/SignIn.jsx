import React, { useState } from 'react';
import navlogo from '../assets/navlogo.png'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, handle sign-in/authentication logic here.
    console.log('Attempting to sign in...');
  };

  return (
    // Main Section: Full height, centers the content block.
    <section className='min-h-screen bg-gradient-to-b from-[#EEF2FF] via-[#EEF2FF] to-[#FAF5FF] flex items-center justify-center p-4'>
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        
        {/* Header - Logo and Title */}
        <div className="flex items-center space-x-2 mb-2">
          {/* Logo */}
          <img src={navlogo} alt="Sparkling Heart" className="w-8 h-8 object-contain" />
          
          {/* Title with Gradient */}
          <h1 
            className="text-[36px] font-bold font-sans"
            style={{ 
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(to right, #9810FA, #E60076)',
            }}
          >
            Mood Notes
          </h1>
        </div>
        
        {/* Tagline */}
        <p className="text-[16px] text-[#4A5565] mb-8 font-sans">
          Track your emotions, one note at a time
        </p>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-[14px] shadow-2xl w-full">
          
          {/* Welcome Message */}
          <h2 className="text-[16px] font-sans text-[#0A0A0A] mb-1 text-center">Welcome Back</h2>
          <p className="text-[#717182] mb-6 text-center font-sans text-[16px]">Sign in to continue tracking your moods</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email/Username Input */}
            <div>
              <label htmlFor="loginId" className="block text-[14px] font-sans text-[#0A0A0A] mb-1">
                Email/Username
              </label>
              <input
                type="text"
                id="loginId"
                name="loginId"
                placeholder="Enter email/username"
                className="w-full px-4 py-2 border border-[#00000040] rounded-[8px] focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div>
              <label htmlFor="password" className="block text-[14px] font-sans text-[#0A0A0A] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-[#00000040] rounded-[8px] focus:ring-purple-500 focus:border-purple-500 pr-10 transition duration-150" 
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#00000040] hover:text-purple-600 transition duration-150"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button with Gradient */}
           <Link to='/home'>
            <button 
              type="submit" 
              className="w-full py-2.5 text-white font-sans rounded-[8px] mt-6 
                         bg-gradient-to-r from-[#9810FA] to-[#E60076] 
                         hover:from-fuchsia-600 hover:to-purple-700 transition duration-200"
            >
              Sign In
            </button>
           </Link>
          </form>
          
          {/* Forgot Password Link */}
          <p className="mt-4 text-center text-[14px]">
            <a href="/forgot-password" className="font-sans text-[#9810FA] hover:text-purple-600 transition duration-150">
              Forgot your password?
            </a>
          </p>

          {/* Sign Up Link */}
          <p className="mt-2 text-center text-[14px] font-sans text-[#4A5565]">
            Don't have an account? 
            <Link to="/signup" className="font-sans text-[#9810FA] hover:text-purple-800 transition duration-150 ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;