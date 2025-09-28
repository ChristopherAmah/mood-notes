import React, { useState } from 'react';
import { Heart, Save, X } from 'lucide-react';

const moodOptions = [
  // Simplified list for brevity; full list remains in your original file
  { name: 'Ecstatic', emoji: '😃', color: 'bg-green-100 text-green-700 border-green-300' },
  { name: 'Happy', emoji: '😊', color: 'bg-green-100 text-green-700 border-green-300' },
  { name: 'Stressed', emoji: '😩', color: 'bg-red-100 text-red-700 border-red-300' },
  { name: 'Peaceful', emoji: '😌', color: 'bg-purple-100 text-purple-700 border-purple-300' },
];

// 🎨 NOTE: The component now accepts an 'onSave' function (from the parent)
const MoodEntryForm = ({ onCancel, onSave }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [noteContent, setNoteContent] = useState('');

  const handleSave = () => {
    if (selectedMood && noteContent.trim()) {
      // 🚀 Call the onSave function provided by the parent (Dashboard)
      onSave({ 
        mood: selectedMood.name,
        emoji: selectedMood.emoji,
        content: noteContent.trim(),
        moodColor: selectedMood.color,
      });
      
      // Clear and close the form
      setSelectedMood(null);
      setNoteContent('');
      onCancel(); 
    } else {
      alert('Please select a mood and write something!');
    }
  };

  return (
    <div className="p-6">
      
      {/* Share Your Thoughts Section */}
      <div className="mb-6">
        <label className="flex items-center text-lg text-gray-800 mb-2">
          Share Your Thoughts <Heart className="w-4 h-4 text-pink-500 ml-1" fill="currentColor" />
        </label>
        <textarea
          placeholder="What's on your mind? Describe your thoughts, feelings, or what happened today... ✨"
          rows="4"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)} // Capture text input
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 resize-none transition duration-150"
          style={{ minHeight: '100px' }}
        ></textarea>
      </div>

      {/* Mood Selection Section (Updated to use selectedMood object) */}
      <div className="mb-8">
        <h2 className="flex items-center text-lg  text-gray-800 mb-4">
          How would you describe your mood? <Heart className="w-4 h-4 text-pink-500 ml-1" fill="currentColor" />
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {moodOptions.map((mood) => (
            <div
              key={mood.name}
              onClick={() => setSelectedMood(mood)} // Store the full mood object
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition duration-200
                ${selectedMood && selectedMood.name === mood.name
                  ? 'bg-purple-100 border-purple-500 shadow-md transform scale-105'
                  : 'bg-white border-gray-100 hover:border-purple-300'
                }
              `}
            >
              <span className="text-3xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-gray-700">{mood.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          disabled={!selectedMood || !noteContent.trim()} // Disable if no mood or content
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-lg transition duration-200
            ${selectedMood && noteContent.trim()
              ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white hover:opacity-90'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
        >
          {/* <Save className="w-4 h-4" /> */}
          <span>Save Note</span>
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 text-gray-600  rounded-lg hover:bg-gray-100 transition duration-200 flex items-center space-x-2"
        >
           {/* <X className="w-4 h-4" /> */}
           <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default MoodEntryForm;