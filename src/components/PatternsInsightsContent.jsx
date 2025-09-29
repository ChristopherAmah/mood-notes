import React from 'react';
import { Sun, Calendar, Zap, Smile, Moon } from 'lucide-react';

const PatternsInsightsContent = () => {
  return (
    <div className="p-6 min-h-screen">
      
      {/* Top Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Best Days */}
        <div className="bg-white p-8 rounded-[14px] min-h-[220px] flex flex-col border border-[#0000001A]">
          <div className="flex items-start text-[14px] font-sans text-[#0A0A0A] mb-5">
            Best Days <Sun className="w-5 h-5 text-[#EFB100] ml-2" />
          </div>
          <span className="text-[14px] font-sans mb-4 justify-center items-center text-center">😊</span>
          <p className="text-[14px] font-sans text-[#0A0A0A] mb-1 justify-center items-center text-center">
            Fridays are your happiest!
          </p>
          <p className="text-[#4A5565] text-[14px] font-sans px-4 justify-center items-center text-center">
            You tend to feel most positive towards the end of the week
          </p>
        </div>

        {/* Evening Reflection */}
        <div className="bg-white p-8 rounded-[14px] min-h-[220px] flex flex-col  border border-[#0000001A]">
          <div className="flex items-start text-[14px] font-sans text-[#0A0A0A] mb-5">
            Evening Reflection <Moon className="w-5 h-5 text-[#2B7FFF] ml-2" />
          </div>
          <span className="text-[14px] font-sans mb-4 justify-center items-center text-center">🌅</span>
          <p className="text-[14px] font-sans text-[#0A0A0A] mb-1 justify-center items-center text-center">
            You write most in the evening
          </p>
          <p className="text-[#4A5565] text-[14px] px-4 justify-center items-center text-center">
            Evening reflections help you process the day
          </p>
        </div>
      </div>

      <div className='bg-[#FFFFFF] rounded-[14px] p-8 border border-[#0000001A]'>
        {/* Recent Insights */}
      <h3 className="text-[14px] font-sans text-[#0A0A0A] mb-4">
        Recent Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Positive Trend */}
        <div className="bg-[#FEF2F2] p-5 rounded-[10px] border border-[#B9F8CF]">
          <div className="flex items-center mb-2">
            <div className='grid'>
              <Smile className="w-5 h-5 text-[#00A63E] mb-2" />
            <span className="font-sans text-[#00A63E] text-[14px]">
              Positive Trend
            </span>
            </div>
          </div>
          <p className="text-[#008236] text-[14px] font-sans">
            Your mood has been improving over the past week!
          </p>
        </div>

        {/* Consistency Win */}
        <div className="bg-[#FEF2F2] p-5 rounded-[10px] border border-[#BEDBFF]">
          <div className="flex items-center mb-2">
            <div className='grid'>
              <Calendar className="w-5 h-5 text-[#155DFC] mb-2" />
            <span className="font-sans text-[#193CB8] text-[14px]">
              Consistency Win
            </span>
            </div>
          </div>
          <p className="text-[#1447E6] text-[14px] font-sans">
            You&apos;ve been journaling regularly. Great habit!
          </p>
        </div>

        {/* Self-Awareness */}
        <div className="bg-[#FAF5FF] p-5 rounded-[10px] border border-[#E9D4FF]">
          <div className="flex items-center mb-2">
            <div className='grid'>
              <Zap className="w-5 h-5 text-[#9810FA] mb-2" />
            <span className="font-sans text-[#6E11B0] text-[14px]">
              Self-Awareness
            </span>
            </div>
          </div>
          <p className="text-[#8200DB] text-[14px] font-sans">
            Your notes show great emotional insight.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PatternsInsightsContent;
