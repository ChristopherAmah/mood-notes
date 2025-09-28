import React from 'react';
// FIX: Added TrendingUp to the import list
import { Mail, Lock, LogOut, Edit3, TrendingUp } from 'lucide-react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Sample Data for the Stacked Bar Chart (Mood Patterns) ---
const moodPatternData = [
  { name: 'Mon', happy: 4, stressed: 1, excited: 1, peaceful: 1, neutral: 1 },
  { name: 'Tue', happy: 2, stressed: 2, excited: 1, peaceful: 1, neutral: 2 },
  { name: 'Wed', happy: 3, stressed: 0, excited: 2, peaceful: 2, neutral: 1 },
  { name: 'Thu', happy: 5, stressed: 0, excited: 1, peaceful: 2, neutral: 0 },
  { name: 'Fri', happy: 3, stressed: 1, excited: 2, peaceful: 1, neutral: 1 },
  { name: 'Sat', happy: 1, stressed: 2, excited: 1, peaceful: 2, neutral: 2 },
  { name: 'Sun', happy: 2, stressed: 0, excited: 1, peaceful: 3, neutral: 2 },
];

// --- Mood Colors for the Stacked Bar Chart ---
const moodColors = {
  happy: '#4CAF50',    // Green
  stressed: '#F44336', // Red
  excited: '#FFC107',  // Orange
  peaceful: '#9C27B0', // Purple
  neutral: '#2196F3',  // Blue (using basic shades for clarity in chart)
};

// --- Custom Tooltip Content for Stacked Bar Chart ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Sort the moods by value descending to show the most dominant first
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
        <p className="font-bold text-gray-800 mb-1">{`Day: ${label}`}</p>
        {sortedPayload.map((item, index) => (
          <p key={index} style={{ color: item.color }}>
            {`${item.dataKey.charAt(0).toUpperCase() + item.dataKey.slice(1)}: ${item.value}`}
          </p>
        ))}
        <p className="text-gray-500 mt-1">Total Notes: {payload.reduce((sum, entry) => sum + entry.value, 0)}</p>
      </div>
    );
  }
  return null;
};


const ProfilePage = () => {
  
  // --- Mood Distribution Component (Top Right) ---
  const MoodDistribution = () => (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        Mood Distribution <TrendingUp className="w-5 h-5 text-purple-600 ml-2" />
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Simplified display of top 4 moods */}
        {[
          { mood: 'Happy', emoji: '😊', notes: 22, color: 'bg-green-100' },
          { mood: 'Peaceful', emoji: '😌', notes: 15, color: 'bg-purple-100' },
          { mood: 'Excited', emoji: '🤩', notes: 8, color: 'bg-orange-100' },
          { mood: 'Stressed', emoji: '😩', notes: 4, color: 'bg-red-100' },
        ].map((item) => (
          <div key={item.mood} className={`p-3 rounded-lg flex items-center justify-between ${item.color}`}>
            <div className="flex items-center space-x-2">
              <span className="text-xl">{item.emoji}</span>
              <span className="font-medium text-gray-700">{item.mood}</span>
            </div>
            <span className="text-sm font-semibold">{item.notes} notes</span>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Week's Mood Patterns Component (Middle Right) ---
  const MoodPatternsChart = () => (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        This Week's Mood Patterns
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart 
          data={moodPatternData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="20%" // Adds space between the bar groupings
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} domain={[0, 8]} /> {/* Set fixed domain for better comparison */}
          <Tooltip content={<CustomTooltip />} />
          
          {/* Stacked Bars - Order matters for visual consistency */}
          <Bar dataKey="happy" stackId="a" fill={moodColors.happy} />
          <Bar dataKey="stressed" stackId="a" fill={moodColors.stressed} />
          <Bar dataKey="excited" stackId="a" fill={moodColors.excited} />
          <Bar dataKey="peaceful" stackId="a" fill={moodColors.peaceful} />
          <Bar dataKey="neutral" stackId="a" fill={moodColors.neutral} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  // --- Profile Stats Component (Bottom Right) ---
  const ProfileStats = () => (
    <div className="grid grid-cols-3 gap-4">
      
      {/* Total Notes */}
      <div className="flex flex-col items-center justify-center p-4 rounded-xl text-center border-t-4 border-b-4 border-green-200 bg-green-50">
        <span className="text-3xl font-bold text-green-700">49</span>
        <p className="text-sm text-green-700 font-semibold mt-1">Total Notes</p>
      </div>

      {/* Day Streak */}
      <div className="flex flex-col items-center justify-center p-4 rounded-xl text-center border-t-4 border-b-4 border-orange-200 bg-orange-50">
        <span className="text-3xl font-bold text-orange-700">7</span>
        <p className="text-sm text-orange-700 font-semibold mt-1">Day Streak</p>
      </div>

      {/* Happy Days */}
      <div className="flex flex-col items-center justify-center p-4 rounded-xl text-center border-t-4 border-b-4 border-purple-200 bg-purple-50">
        <span className="text-3xl font-bold text-purple-700">45%</span>
        <p className="text-sm text-purple-700 font-semibold mt-1">Happy Days</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-50 p-6 sm:p-8 md:p-10 lg:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 1. Profile Card (Left Column) */}
        <div className="lg:col-span-1 bg-white p-8 rounded-xl shadow-2xl">
          
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-28 h-28 mb-3">
              {/* This is a placeholder for the gradient avatar */}
              <div 
                className="w-full h-full rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg"
                style={{ backgroundImage: 'linear-gradient(to right top, #a78bfa, #d8b4fe)' }}
              >
                U
              </div>
              <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full border border-gray-300 shadow-md hover:bg-gray-100 transition">
                <Edit3 className="w-4 h-4 text-purple-600" />
              </button>
            </div>
            <p className="text-lg font-medium text-gray-800">Profile</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Name</h3>
            <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                value="user" 
                readOnly 
                className="w-full bg-transparent text-gray-700 focus:outline-none"
              />
            </div>
            
            <h3 className="text-sm font-semibold text-gray-500 uppercase pt-2">Email</h3>
            <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="email" 
                value="user@fifthlab.com" 
                readOnly 
                className="w-full bg-transparent text-gray-700 focus:outline-none"
              />
            </div>
            
            {/* Change Password Button */}
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-50 text-purple-700 font-semibold rounded-lg hover:bg-purple-100 transition duration-150 mt-6">
              <Lock className="w-5 h-5" />
              <span>Change Password</span>
            </button>
            
            {/* Logout Button */}
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-150">
              <span>Logout</span>
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Insights Column (Right Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <MoodDistribution />
          <MoodPatternsChart />
          <ProfileStats />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;