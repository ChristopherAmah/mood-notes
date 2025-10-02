import React, { useState } from "react";
import axios from "axios";
import navlogo from "../assets/navlogo.png"; 
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://moodnote-jbpm.onrender.com/auth/forgot", 
        { email }
      );

      setMessage(response.data.msg || "Password reset link sent to your email.");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg || "Failed to send reset link");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#EEF2FF] via-[#EEF2FF] to-[#FAF5FF] flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        
        {/* Header - Logo and Title */}
        <div className="flex items-center space-x-2 mb-2">
          <img src={navlogo} alt="Logo" className="w-8 h-8 object-contain" />
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

        <p className="text-[16px] text-[#4A5565] mb-8 font-sans">
          Reset your password
        </p>

        <div className="bg-white p-8 rounded-[14px] shadow-2xl w-full">
          <h2 className="text-[16px] font-sans text-[#0A0A0A] mb-1 text-center">Forgot Password</h2>
          <p className="text-[#717182] mb-6 text-center font-sans text-[16px]">
            Enter your email to reset your password
          </p>

          {message && (
            <div className="mb-4 text-green-600 text-sm text-center">{message}</div>
          )}
          {errorMessage && (
            <div className="mb-4 text-red-600 text-sm text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleForgotPassword} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-[14px] font-sans text-[#0A0A0A] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-[#00000040] rounded-[8px] focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-2.5 text-white font-sans rounded-[8px] mt-6 
                         bg-gradient-to-r from-[#9810FA] to-[#E60076] 
                         hover:from-fuchsia-600 hover:to-purple-700 transition duration-200"
            >
              Send Reset Link
            </button>
          </form>

          <p className="mt-4 text-center text-[14px] font-sans">
            <Link to="/" className="text-[#9810FA] hover:text-purple-600 transition duration-150">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
