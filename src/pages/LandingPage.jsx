import React from 'react';
import love from '../assets/love.png'; // heart icon with sparkle
import { Link } from 'react-router-dom';

const MoodNotesLandingPage = () => {
  return (
    <section className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        
        {/* Background Circles */}
        <svg
          className="absolute inset-0 w-full h-full opacity-80"
          viewBox="0 0 1400 800"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="400" r="330" fill="none" stroke="#b794f4" strokeWidth="3" />
          <circle cx="700" cy="400" r="330" fill="none" stroke="#b794f4" strokeWidth="3" />
          <circle cx="1300" cy="400" r="330" fill="none" stroke="#b794f4" strokeWidth="3" />
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
          
          {/* Title/Logo */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={love} 
              alt="Sparkling Heart" 
              className="w-14 h-14 md:w-16 md:h-16 object-contain"
            />
            <h1
              className="text-5xl md:text-6xl font-extrabold"
              style={{
                color: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                backgroundImage: 'linear-gradient(to right, #9333ea, #ec4899)',
              }}
            >
              Mood Notes
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 font-medium">
            Track your emotions, one note at a time
          </p>

          {/* CTA Button */}
          <Link to='/signin'>
          <button className="bg-white text-purple-600 px-6 py-2 text-sm rounded-md shadow-sm hover:shadow-md transition">
            Proceed to Sign In to Your Account &gt;&gt;&gt;
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoodNotesLandingPage;
