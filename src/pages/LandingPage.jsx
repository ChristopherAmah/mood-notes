import React from 'react';
import navlogo from '../assets/navlogo.png'; // heart icon with sparkle
import circles from '../assets/circles.png'; // your background circle image
import { Link } from 'react-router-dom';

const MoodNotesLandingPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#EEF2FF] via-[#EEF2FF] to-[#FAF5FF] flex items-center justify-center p-4 lg:p-26">
      <div className="relative w-full h-full  flex items-center justify-center">
        
        {/* Background Circles as Images */}
        <img 
          src={circles} 
          alt="Circle Background Left" 
          className="absolute  opacity-70 hidden lg:block"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
          
          {/* Title/Logo */}
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src={navlogo} 
              alt="Sparkling Heart" 
              className="w-10 h-10 md:w-30 md:h-30 object-contain"
            />
            <h1
              className="text-4xl md:text-[120px] font-bold font-sans"
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
          <p className="text-sm lg:text-lg md:text-[32px] text-[#4A5565] mb-10 font-medium">
            Track your emotions, one note at a time
          </p>

          {/* CTA Button */}
          <Link to='/signup'>
            <button className="bg-white text-[#9810FA] px-6 py-2 text-[10px] md:text-[14px] rounded-[8px] hover:shadow-md transition">
              Proceed to Sign In to Your Account &gt;&gt;&gt;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoodNotesLandingPage;
