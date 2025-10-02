import React from 'react';
import { BookOpen, Calendar, Clock, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

// Map moods to emoji + colors
const moodConfig = {
  ecstatic: { emoji: "😄", color: "bg-pink-100 text-pink-700 border-pink-300" },
  happy: { emoji: "😊", color: "bg-green-100 text-green-700 border-green-300" },
  peaceful: { emoji: "😌", color: "bg-blue-100 text-blue-700 border-blue-300" },
  stressed: { emoji: "😫", color: "bg-red-100 text-red-700 border-red-300" },
};

const RecentNotesList = ({ notes }) => {
  // Render a single note card
  const NoteCard = ({ note }) => {
    const mood = moodConfig[note.mood] || { emoji: "🙂", color: "bg-gray-100 text-gray-700 border-gray-300" };

    // Format timestamp
    const createdAt = new Date(note.createdAt);
    const date = createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const time = createdAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

    return (
      <div className="bg-white p-6 rounded-xl shadow-md border-t-2 border-b-2 border-gray-100">
        <div className="flex justify-between items-start mb-3">
          {/* Mood Tag */}
          <div className="flex items-center space-x-2">
            <span className="text-xl">{mood.emoji}</span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${mood.color}`}>
              {note.mood}
            </span>
          </div>
          {/* More Options Icon */}
          <button className="text-gray-400 hover:text-gray-600 transition duration-150">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Optional content if backend provides it */}
        {note.content && (
          <p className="text-gray-800 leading-relaxed mb-3">
            {note.content.length > 200 ? note.content.substring(0, 200) + '...' : note.content}
          </p>
        )}

        {/* Date and Time */}
        <div className="flex space-x-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4">
        <h2 className="flex items-center text-[20px] font-sans text-[#0A0A0A] space-x-2">
          <BookOpen className="w-6 h-6 text-[#9810FA]" />
          <span>Your Recent Notes</span>
        </h2>
        <Link to={'/insights'}>
          <button 
            className="px-4 py-2 text-[14px] font-sans rounded-[8px] border border-[#E9D4FF]
                       bg-[#FFFFFF] text-[#9810FA] hover:bg-purple-100 transition duration-150"
          >
            View All Insights
          </button>
        </Link>
      </div>

      {/* Notes List */}
      <div className="space-y-6">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note._id || note.id} note={note} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">
            No moods tracked yet! Start by checking in above.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentNotesList;
