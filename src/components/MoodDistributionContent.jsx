import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// --- Data for Mood Categories Donut Chart ---
const moodCategoryData = [
  { name: 'positive', value: 70, color: '#10b981' }, // green
  { name: 'neutral', value: 10, color: '#6b7280' }, // gray
  { name: 'negative', value: 20, color: '#ef4444' }, // red
];

// --- Data for Individual Moods Progress Bars ---
const individualMoodsData = [
  { name: 'happy', percentage: 20, color: '#10b981' },
  { name: 'stressed', percentage: 20, color: '#ef4444' },
  { name: 'peaceful', percentage: 20, color: '#a78bfa' },
  { name: 'excited', percentage: 20, color: '#f59e0b' },
  { name: 'content', percentage: 20, color: '#4f46e5' },
];

const MoodDistributionContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      
      {/* Mood Categories (Donut Chart) Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-[14px] font-sans text-[#0A0A0A] mb-6">Mood Categories</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={moodCategoryData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {moodCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: '14px', marginTop: '12px' }}
              formatter={(value, entry) => (
                <span className="text-gray-700 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Moods (Progress Bars) Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-[14px] font-sans text-[#0A0A0A] mb-6">Individual Moods</h3>
        <div className="space-y-4">
          {individualMoodsData.map((mood) => (
            <div key={mood.name} className="flex items-center">
              {/* Color dot */}
              <span 
                className="inline-block w-3 h-3 rounded-full mr-3" 
                style={{ backgroundColor: mood.color }}
              ></span>

              {/* Mood name */}
              <span className="text-gray-800 text-sm capitalize w-20">{mood.name}</span>

              {/* Progress bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                <div 
                  className="h-2 rounded-full" 
                  style={{ width: `${mood.percentage}%`, backgroundColor: mood.color }}
                ></div>
              </div>

              {/* Percentage */}
              <span className="text-gray-800 text-sm font-medium w-10 text-right">
                {mood.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodDistributionContent;
