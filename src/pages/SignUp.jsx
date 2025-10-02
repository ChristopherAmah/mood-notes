import React, { useState } from 'react';
import axios from 'axios';
import navlogo from '../assets/navlogo.png'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';

const CreateAccountForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        'https://moodnote-jbpm.onrender.com/auth/signup',
        formData
      );

      console.log('Signup Success:', res.data);

      // Save token in localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to home/dashboard
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong, try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F5F7FF] flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        
        {/* Header */}
        <div className="flex items-center space-x-2 mb-2">
          <img src={navlogo} alt="Logo" className="w-8 h-8 object-contain" />
          <h1 
            className="text-3xl font-extrabold"
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

        <p className="text-md text-gray-700 mb-8 font-medium">
          Track your emotions, one note at a time
        </p>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center">Create Account</h2>
          <p className="text-gray-500 mb-6 text-center text-sm">Start your mood tracking journey today</p>

          {error && (
            <p className="text-red-500 text-center text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              required
            />

            {/* Username */}
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-purple-600"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
              </button>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 text-white font-semibold rounded-lg shadow-lg mt-6 
                         bg-gradient-to-r from-[#9810FA] to-[#E60076] 
                         hover:from-fuchsia-600 hover:to-purple-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? 
            <Link to="/signin" className="font-medium text-purple-600 hover:text-purple-800 ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreateAccountForm;
