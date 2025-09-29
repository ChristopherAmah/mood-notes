import React from 'react';
import { BookOpen, Calendar, Clock, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

// 🗑️ Removed fallbackNotes. Component relies entirely on the 'notes' prop.

const RecentNotesList = ({ notes }) => {
  
  // Renders a single note card based on the note object structure
  const NoteCard = ({ note }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border-t-2 border-b-2 border-gray-100">
      <div className="flex justify-between items-start mb-3">
        {/* Mood Tag */}
        <div className="flex items-center space-x-2">
          <span className="text-xl">{note.emoji}</span>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${note.moodColor}`}>
            {note.mood}
          </span>
        </div>
        {/* More Options Icon */}
        <button className="text-gray-400 hover:text-gray-600 transition duration-150">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Note Content */}
      <p className="text-gray-800 leading-relaxed mb-3">
        {/* Truncate content for list view if necessary */}
        {note.content.length > 200 ? note.content.substring(0, 200) + '...' : note.content}
      </p>

      {/* Read More link */}
      {note.content.length > 200 && (
        <a href={note.readMoreLink} className="text-sm text-purple-600 font-medium hover:underline mb-3 block">
          Read more
        </a>
      )}

      {/* Date and Time */}
      <div className="flex space-x-4 text-sm text-gray-500 mt-2">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{note.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{note.time}</span>
        </div>
      </div>
    </div>
  );

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
            <NoteCard key={note.id} note={note} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">
            No notes yet! Start by checking your mood above.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentNotesList;