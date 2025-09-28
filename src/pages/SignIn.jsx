import React, { useState } from 'react';
// Assuming 'love.png' is your heart icon
import love from '../assets/love.png'; 
// Import icons from react-icons/fa
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
    <section className='min-h-screen bg-indigo-50 flex items-center justify-center p-4'>
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        
        {/* Header - Logo and Title */}
        <div className="flex items-center space-x-2 mb-2">
          {/* Logo */}
          <img src={love} alt="Sparkling Heart" className="w-8 h-8 object-contain" />
          
          {/* Title with Gradient */}
          <h1 
            className="text-3xl font-extrabold"
            style={{ 
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundImage: 'linear-gradient(to right, #6b46c1, #ff4c94)', // Purple to Pink
            }}
          >
            Mood Notes
          </h1>
        </div>
        
        {/* Tagline */}
        <p className="text-md text-gray-700 mb-8 font-medium">
          Track your emotions, one note at a time
        </p>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full">
          
          {/* Welcome Message */}
          <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-6 text-center text-sm">Sign in to continue tracking your moods</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email/Username Input */}
            <div>
              <label htmlFor="loginId" className="block text-sm font-medium text-gray-700 mb-1">
                Email/Username
              </label>
              <input
                type="text"
                id="loginId"
                name="loginId"
                placeholder="Enter email/username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                required
              />
            </div>

            {/* Password Input with Toggle */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 pr-10 transition duration-150" 
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-purple-600 transition duration-150"
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
              className="w-full py-2.5 text-white font-semibold rounded-lg shadow-lg mt-6 
                         bg-gradient-to-r from-fuchsia-500 to-purple-600 
                         hover:from-fuchsia-600 hover:to-purple-700 transition duration-200"
            >
              Sign In
            </button>
           </Link>
          </form>
          
          {/* Forgot Password Link */}
          <p className="mt-4 text-center text-sm">
            <a href="/forgot-password" className="font-medium text-gray-600 hover:text-purple-600 transition duration-150">
              Forgot your password?
            </a>
          </p>

          {/* Sign Up Link */}
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account? 
            <a href="/signup" className="font-medium text-purple-600 hover:text-purple-800 transition duration-150 ml-1">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;