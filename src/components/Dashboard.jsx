import React, { useState } from 'react';
import { Lightbulb, X, Calendar, Award, Book, Target, Plus, Sparkles } from 'lucide-react';
import MoodEntryForm from './MoodEntryForm'; 
import RecentNotesList from './RecentNotesList';
import { BsArrowRepeat } from "react-icons/bs";

// 1. Define your array of possible prompts
const dailyPrompts = [
    "Describe a person who positively impacted your day.",
    "What is one small thing you can do for yourself today?",
    "Write about a goal you're working toward and why it matters.",
    "What are three things you are genuinely grateful for right now?",
    "If you could have a conversation with your future self, what would you ask?",
    "Describe a challenge you faced recently and how you overcame it."
];

// Function to get a random prompt from the array
const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * dailyPrompts.length);
    return dailyPrompts[randomIndex];
};


const Dashboard = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [recentNotes, setRecentNotes] = useState([]);
    // 2. State for the currently displayed prompt
    const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt()); 

    const handleCancel = () => {
        setIsFormOpen(false);
    };
    
    // Function to handle fetching a new prompt
    const handleNewPrompt = () => {
        // Keep generating a new prompt until it's different from the current one
        let newPrompt = getRandomPrompt();
        while (newPrompt === currentPrompt && dailyPrompts.length > 1) {
            newPrompt = getRandomPrompt();
        }
        setCurrentPrompt(newPrompt);
    };

    /**
     * Function to add a new note received from the MoodEntryForm.
     */
    const addNote = (newNoteData) => {
        const now = new Date();
        const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        
        const newNote = {
            id: Date.now(),
            ...newNoteData,
            date: now.toLocaleDateString('en-US', dateOptions),
            time: now.toLocaleTimeString('en-US', timeOptions),
            readMoreLink: '#',
        };

        setRecentNotes([newNote, ...recentNotes]);
        setIsFormOpen(false);
    };

    const QuickMoodCheckButton = () => (
        <div className="p-6">
            <h2 className="flex items-center text-[16px] font-sans text-[#0A0A0A] space-x-2 mb-4">
                <Plus className="w-5 h-5 text-[#0A0A0A]" />
                <span>Quick Mood Check</span>
            </h2>
            <button 
                onClick={() => setIsFormOpen(true)} 
                className="w-full py-3 text-white rounded-[8px]
                            bg-gradient-to-r from-[#9810FA] to-[#E60076] 
                            hover:from-purple-700 hover:to-fuchsia-600 transition duration-200 flex items-center justify-center space-x-2"
            >
                <Sparkles className="w-5 h-5" />
                <span className='text-[14px]'>How are you feeling right now?</span>
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] via-[#F0FDF4] to-[#FAF5FF] p-6 sm:p-8 md:p-10 lg:p-20 lg:px-26 font-sans">
            
            {/* Welcome Section (Good Morning, User!) */}
            <div className="mb-8">
                <h1 className="text-3xl font-sans text-[#0A0A0A] mb-2">Good Morning, User!</h1>
                <p className="text-[16px] text-[#4A5565]">Ready to capture your thoughts and feelings today?</p>
            </div>

            {/* Daily Writing Prompt Card (UPDATED) */}
            <div className="relative bg-gradient-to-r from-[#FFF7ED] to-[#F3E8FF] p-6 rounded-[14px] shadow-md mb-8 border border-[#FFF085]">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <Lightbulb className="w-7 h-7 text-[#E17100] bg-[#FEF3C6] rounded-full p-1" />
                        <h2 className="text-[16px] font-bold text-gray-800 font-sans">Daily Writing Prompt</h2>
                    </div>
                    <X className="w-5 h-5 text-[#E17100] cursor-pointer hover:text-gray-600 transition duration-150" />
                </div>
                {/* 3. Display the currentPrompt state */}
                <p className="text-[16px] text-[#BB4D00] mb-5">
                    {currentPrompt}
                </p>
                {/* 4. Add the onClick handler to the button */}
                <button 
                    onClick={handleNewPrompt}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#FFFFFF] border border-[#FFF085] text-[#BB4D00] text-[14px] rounded-[8px] hover:bg-yellow-200 transition duration-150"
                >
                    <BsArrowRepeat className="w-4 h-4" />
                    <span>New Prompt</span>
                </button>
                {/* Subtle background gradient layer */}
                <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right top, #fff3c9, #ffecb300)', opacity: 0.3 }}></div>
            </div>

            {/* Stats Cards Section (No changes here) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Today's Entries */}
                <div className="bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] p-5 rounded-[14px] border border-[#BEDBFF]">
                    <div className="flex items-center mb-2">
                        <Calendar className="w-6 h-6 text-[#155DFC] mr-2" />
                        <span className="text-[14px] font-sans text-[#155DFC]">Today's Entries</span>
                    </div>
                    <p className="text-[24px] font-bold text-[#193CB8]">0</p>
                </div>
                {/* Current Streak */}
                <div className="bg-gradient-to-r from-[#F0FDF4] to-[#DCFCE7] p-5 rounded-[14px] border border-[#B9F8CF]">
                    <div className="flex items-center mb-2">
                        <Award className="w-6 h-6 text-[#00A63E] mr-2" />
                        <span className="text-[14px] text-[#00A63E] font-sans">Current Streak</span>
                    </div>
                    <p className="text-[24px] font-bold text-[#016630]">0</p>
                </div>
                {/* Total Notes (Dynamically linked to state) */}
                <div className="bg-gradient-to-r from-[#FAF5FF] to-[#F3E8FF] p-5 rounded-[14px] border border-[#E9D4FF]">
                    <div className="flex items-center mb-2">
                        <Book className="w-6 h-6 text-[#9810FA] mr-2" />
                        <span className="text-[14px] font-sans text-[#9810FA]">Total Notes</span>
                    </div>
                    <p className="text-[24px] font-bold text-[#6E11B0]">{recentNotes.length}</p> 
                </div>
                {/* Week Progress */}
                <div className="bg-gradient-to-r from-[#FFF7ED] to-[#E9D4FF] p-5 rounded-[14px] border border-[#FFD6A7]">
                    <div className="flex items-center mb-2">
                        <Target className="w-6 h-6 text-[#F54900] mr-2" />
                        <span className="text-[14px] font-sans text-[#F54900]">Week Progress</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="w-full bg-[#03021333] rounded-full h-2.5 mr-2">
                            <div 
                                className="bg-[#030213] h-2.5 rounded-full" 
                                style={{ width: 'calc(5/7 * 100%)' }}
                            ></div>
                        </div>
                        <span className="text-[14px] font-sans font-bold text-[#9F2D00]">5/7</span>
                    </div>
                </div>
            </div>

            {/* Quick Mood Check / Mood Entry Form Toggle Area */}
            <div className="bg-white rounded-xl shadow-md mb-8">
                {isFormOpen ? (
                    <MoodEntryForm onCancel={handleCancel} onSave={addNote} />
                ) : (
                    <QuickMoodCheckButton />
                )}
            </div>
            
            {/* Recent Notes List: Displays the state-managed notes */}
            <RecentNotesList notes={recentNotes} />
            
        </div>
    );
};

export default Dashboard;