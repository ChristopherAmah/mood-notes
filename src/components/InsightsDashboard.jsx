import React, { useState } from 'react';
import { Brain, Award, Target, Heart, TrendingUp } from 'lucide-react'; 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MoodDistributionContent from './MoodDistributionContent'; 
import PatternsInsightsContent from './PatternsInsightsContent'; 

// --- Sample Data for the Mood Trend Graph (Recharts) ---
const moodTrendData = [
  { name: 'Fri', uv: 0, pv: 0, amt: 0 },
  { name: 'Sat', uv: 3, pv: 3, amt: 3 },
  { name: 'Sun', uv: 3, pv: 3, amt: 3 },
  { name: 'Mon', uv: 3, pv: 3, amt: 3 },
  { name: 'Tue', uv: 1, pv: 1, amt: 1 },
  { name: 'Wed', uv: 2.7, pv: 2.7, amt: 2.7 },
  { name: 'Thu', uv: 0, pv: 0, amt: 0 },
];

const InsightsDashboard = () => {
  // State for tab navigation, defaults to Mood Trends
  const [activeTab, setActiveTab] = useState('Mood Trends'); 
  
  // Component to render the Weekly Mood Trend Graph
  const WeeklyMoodTrendGraph = () => (
    <div className="p-6 bg-white rounded-[14px] shadow-lg">
      <h3 className="flex items-center text-[14px] font-sans text-[#0A0A0A] mb-4">
        Weekly Mood Trend <TrendingUp className="w-5 h-5 text-[#0A0A0A] ml-2" />
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={moodTrendData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Gradient fill for the area chart */}
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#8B5CF6CC" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#8B5CF61A" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const tabNames = ['Mood Trends', 'Mood Distribution', 'Patterns & Insights'];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FEF2F2] to-[#FAF5FF] p-6 sm:p-8 md:p-10 lg:p-20 lg:px-26">
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="flex items-center text-[14px] font-sans text-[#0A0A0A] mb-2">
          Your Mood Insights <Brain className="w-9 h-9 text-[#9810FA] ml-3" />
        </h1>
        <p className="text-[14px] font-sans text-[#4A5565]">
          Discover patterns and track your emotional well-being over time
        </p>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Current Streak */}
        <div className="bg-gradient-to-r from-[#FEF2F2] to-[#D0FAE5] p-5 rounded-[14px] border border-[#B9F8CF]">
          <div className="flex justify-between items-start mb-2">
            <Award className="w-6 h-6 text-[#00A63E]" />
            <span className="text-[14px] font-sans text-[#016630]">0 days</span>
          </div>
          <p className="text-[14px] font-sans text-[#008236]">Current Streak</p>
          <p className="text-[14px] font-sans text-[#008236]">Keep it going! 🔥</p>
        </div>

        {/* Best Streak */}
        <div className="bg-gradient-to-r from-[#FEF2F2] to-[#DCFCE7] p-5 rounded-[14px] border border-[#BEDBFF]">
          <div className="flex justify-between items-start mb-2">
            <Target className="w-6 h-6 text-[#155DFC]" />
            <span className="text-[14px] font-sans text-[#193CB8]">5 days</span>
          </div>
          <p className="text-[14px] font-sans text-[#193CB8]">Best Streak</p>
          <p className="text-[14px] font-sans text-[#193CB8]">Personal record 🏆</p>
        </div>

        {/* Positive Days */}
        <div className="bg-gradient-to-r from-[#FAF5FF] to-[#F3E8FF] p-5 rounded-[14px] border border-[#BEDBFF]">
          <div className="flex justify-between items-start mb-2">
            <Heart className="w-6 h-6 text-[#9810FA]" />
            <span className="text-[14px] font-sans text-[#6E11B0]">80%</span>
          </div>
          <p className="text-[14px] font-sans text-[#6E11B0]">Positive Days</p>
          <p className="text-[14px] font-sans text-[#6E11B0]">Great outlook! ✨</p>
        </div>

        {/* Total Entries */}
        <div className="bg-gradient-to-r from-[#F3F3F5] to-[#E9D4FF] p-5 rounded-[14px] border border-[#FFD6A7]">
          <div className="flex justify-between items-start mb-2">
            <TrendingUp className="w-6 h-6 text-[#F54900]" />
            <span className="text-[14px] font-sans text-[#9F2D00]">5</span>
          </div>
          <p className="text-[14px] font-sans text-[#9F2D00]">Total Entries</p>
          <p className="text-[14px] font-sans text-[#9F2D00]">Keep writing! 📝</p>
        </div>
      </div>

      {/* Tabs and Content Area */}
        {/* Tab Navigation Container */}
        <div className="flex justify-between p-1 rounded-[14px] bg-[#DCFCE7] w-full max-w-7xl mx-auto mb-6">
          {tabNames.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 text-center py-1 px-4 text-[14px] font-sans transition-all duration-200
                  ${isActive
                    ? 'bg-white text-[#0A0A0A] rounded-[14px]'
                    : 'text-gray-700 hover:text-gray-900'
                  }
                `}
              >
                {tab}
              </button>
            );
          })}
        </div>

      <div className="rounded-xl">
        {/* Tab Content Renders */}
        <div className="p-4">
          {activeTab === 'Mood Trends' && <WeeklyMoodTrendGraph />}
          {activeTab === 'Mood Distribution' && <MoodDistributionContent />}
          {activeTab === 'Patterns & Insights' && <PatternsInsightsContent />}
        </div>
      </div>

    </div>
  );
};

export default InsightsDashboard;