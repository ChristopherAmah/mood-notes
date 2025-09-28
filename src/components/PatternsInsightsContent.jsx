import React from 'react';
// Changed RefreshCw to Moon to better match the 'Evening Reflection' theme
import { Sun, Calendar, Zap, Smile, Moon } from 'lucide-react'; 

const PatternsInsightsContent = () => {
  
  // NOTE: The entire component should be wrapped in a main Insights page component
  // which provides the light pink/purple background.

  return (
    <div className="p-6">
      
      {/* Top Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Best Days Card (Top Left) - Styled to match image: White background, no complex borders/shadows */}
        <div className="bg-white p-8 rounded-xl shadow-md min-h-[250px] flex flex-col justify-center items-center text-center">
          {/* Title and Icon */}
          <div className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            Best Days <Sun className="w-5 h-5 text-yellow-500 ml-2" />
          </div>
          {/* Emoji */}
          <span className="text-5xl mb-4">
            😊 {/* Changed to simple happy emoji */}
          </span> 
          {/* Main Text */}
          <p className="text-xl font-bold text-gray-800 mb-2">
            Fridays are your happiest!
          </p>
          {/* Description */}
          <p className="text-gray-600 px-4">
            You tend to feel most positive towards the end of the week
          </p>
        </div>

        {/* Evening Reflection Card (Top Right) - Styled to match image: White background, no complex borders/shadows */}
        <div className="bg-white p-8 rounded-xl shadow-md min-h-[250px] flex flex-col justify-center items-center text-center">
          {/* Title and Icon */}
          <div className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            Evening Reflection <Moon className="w-5 h-5 text-blue-500 ml-2" /> 
          </div>
          {/* Emoji */}
          <span className="text-5xl mb-4">
            📝 {/* Changed to writing/reflection emoji */}
          </span> 
          {/* Main Text */}
          <p className="text-xl font-bold text-gray-800 mb-2">
            You write most in the evening
          </p>
          {/* Description */}
          <p className="text-gray-600 px-4">
            Evening reflections help you process the day
          </p>
        </div>
      </div>

      {/* Recent Insights Header */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Insights
      </h3>

      {/* Recent Insights Cards Grid (Bottom Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Card 1: Positive Trend (Green accents) */}
        {/* Key change: simplified shadow, using light color border for the outline */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-green-200">
          <div className="flex items-center mb-2">
            <Smile className="w-6 h-6 text-green-500 mr-2" />
            <span className="text-md font-bold text-gray-800">Positive Trend</span>
          </div>
          <p className="text-green-600">
            Your mood has been improving over the past week!
          </p>
        </div>

        {/* Card 2: Consistency Win (Blue/Purple accents, matching the image's calendar icon/text) */}
        {/* Key change: simplified shadow, using light color border for the outline */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-blue-200">
          <div className="flex items-center mb-2">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <span className="text-md font-bold text-gray-800">Consistency Win</span>
          </div>
          <p className="text-blue-600">
            You've been journaling regularly. Great habit!
          </p>
        </div>

        {/* Card 3: Self-Awareness (Purple accents) */}
        {/* Key change: simplified shadow, using light color border for the outline */}
        <div className="bg-white p-5 rounded-xl shadow-sm border-2 border-purple-200">
          <div className="flex items-center mb-2">
            <Zap className="w-6 h-6 text-purple-500 mr-2" />
            <span className="text-md font-bold text-gray-800">Self-Awareness</span>
          </div>
          <p className="text-purple-600">
            Your notes show great emotional insight.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PatternsInsightsContent;