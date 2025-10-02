import React, { useState, useRef } from "react";
import {
  Mail,
  Lock,
  LogOut,
  Edit3,
  Phone,
  TrendingUp,
  Download,
  X, 
} from "lucide-react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";

// --- Data & Constants ---
const moodPatternData = [
  { name: "Mon", happy: 4, stressed: 1, excited: 1, peaceful: 1, neutral: 1 },
  { name: "Tue", happy: 2, stressed: 2, excited: 1, peaceful: 1, neutral: 2 },
  { name: "Wed", happy: 3, stressed: 0, excited: 2, peaceful: 2, neutral: 1 },
  { name: "Thu", happy: 5, stressed: 0, excited: 1, peaceful: 2, neutral: 0 },
  { name: "Fri", happy: 3, stressed: 1, excited: 2, peaceful: 1, neutral: 1 },
  { name: "Sat", happy: 1, stressed: 2, excited: 1, peaceful: 2, neutral: 2 },
  { name: "Sun", happy: 2, stressed: 0, excited: 1, peaceful: 3, neutral: 2 },
];

const moodColors = {
  happy: "#4CAF50",
  stressed: "#F44336",
  excited: "#FFC107",
  peaceful: "#9C27B0",
  neutral: "#2196F3",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow text-sm">
        <p className="font-bold text-gray-800 mb-1">{`Day: ${label}`}</p>
        {sortedPayload.map((item, index) => (
          <p key={index} style={{ color: item.color }}>
            {`${item.dataKey.charAt(0).toUpperCase() + item.dataKey.slice(1)}: ${
              item.value
            }`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 🖼️ DEDICATED EXPORT CARD COMPONENT
const ExportSummaryCard = ({ stats, date, socialTag, topMoods }) => {
  // Define a default/fallback set 
  const defaultMoods = [
    { name: "Happy", emoji: "😊" }, 
    { name: "Neutral", emoji: "😐" }, 
    { name: "Sad", emoji: "😭" }
  ];
  const displayMoods = topMoods && topMoods.length === 3 ? topMoods : defaultMoods;
  
  return (
    <div 
      className="w-full h-full p-8 relative overflow-hidden text-white rounded-3xl"
      style={{
        background: 'radial-gradient(circle at 50% 10%, #FFD54F, #FF9800)', 
        paddingTop: '6rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}
    >
      {/* Dynamic Emojis/Header Area based on top moods */}
      <div className="absolute top-0 left-0 w-full h-48 flex justify-around items-start pt-10 opacity-70">
        {displayMoods.map((mood, index) => (
            <div key={index} 
                 className={`text-9xl transform ${index === 1 ? 'translate-y-0' : 'translate-y-[-10px]'}`}
                 style={{ fontSize: '7rem', zIndex: 10 }}
            >
                {mood.emoji}
            </div>
        ))}
      </div>
      
      <div className="relative z-10 text-center mb-6">
        <h1 className="text-4xl font-bold mb-8 pt-12" style={{textShadow: '0 2px 4px rgba(0,0,0,0.4)'}}>
          top moods
        </h1>
        {/* Dynamic Mood Names */}
        <div className="flex justify-around text-lg font-semibold text-gray-800">
            {displayMoods.map((mood, index) => (
                <span key={index} className="text-white font-medium text-lg">
                    {mood.name}
                </span>
            ))}
        </div>
      </div>


      {/* Stats Cards Section (using dynamic data) */}
      <div className="relative z-20 grid grid-cols-3 gap-3 mt-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 rounded-xl shadow-lg"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                backdropFilter: 'blur(10px)', 
                color: 'black',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            }}
          >
            <span className="text-sm">
                {stat.label === "Total Notes" ? "📄" : stat.label === "Day Streak" ? "⚡" : "😊"}
            </span>
            <span className="text-3xl font-bold">{stat.value}</span>
            <p className="text-xs text-center mt-1 text-gray-800">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="relative z-20 flex justify-between items-end mt-12 pt-4 border-t border-white border-opacity-50 text-sm">
        <div>
          <p className="font-semibold text-gray-800 text-lg">
            {date}
          </p>
          <p className="text-gray-900 text-lg">{socialTag}</p>
        </div>
        <p className="font-semibold text-gray-800 text-lg">
          moodnotes.vercel
        </p>
      </div>
    </div>
  );
};


const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [exportFormat, setExportFormat] = useState("JPEG");

  // NEW STATES for Preview Modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profile, setProfile] = useState({
    username: "user",
    email: "user@fifthlab.com",
    phone: "+234 805 678 6758",
  });
  const [tempProfile, setTempProfile] = useState(profile);

  // Hardcoded stats for the export card (match the provided data)
  const exportStats = [
    { label: "Total Notes", value: 49 },
    { label: "Day Streak", value: 7 },
    { label: "Happy Days", value: "45%" },
  ];

  // Function to calculate top moods and their emojis
  const getTopMoods = () => {
    // Aggregate total counts for each mood across the week
    const moodTotals = moodPatternData.reduce((acc, day) => {
      Object.keys(moodColors).forEach(mood => {
        // Exclude the 'name' key and only sum numeric mood values
        if (day.hasOwnProperty(mood)) {
          acc[mood] = (acc[mood] || 0) + day[mood];
        }
      });
      return acc;
    }, {});

    // Convert to array and sort by count (descending)
    const sortedMoods = Object.entries(moodTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3); // Take the top 3

    // Map mood key to display name and large emoji
    const moodMap = {
      happy: { name: "Happy", emoji: "😊" },
      neutral: { name: "Neutral", emoji: "😐" },
      excited: { name: "Excited", emoji: "🤩" },
      peaceful: { name: "Peaceful", emoji: "😌" },
      stressed: { name: "Sad", emoji: "😭" }, // Using "Sad" label and crying emoji for stressed as per your image
    };

    return sortedMoods.map(([mood, count]) => ({
      key: mood,
      count: count,
      ...moodMap[mood]
    }));
  };

  const topMoods = getTopMoods();
  
  // --- Handlers ---
  const handleChange = (e) => {
    setTempProfile({
      ...tempProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
    // 🔗 TODO: Call API to update profile
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditing(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("❌ New passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://moodnote-jbpm.onrender.com/auth/change-password",
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(res.data.msg || "✅ Password updated successfully");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordModal(false);
    } catch (err) {
      setMessage(err.response?.data?.msg || "❌ Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };
  
  // 📤 UPDATED: Capture image of the HIDDEN CARD and show preview modal
  const handleExportData = async () => {
    // Target the hidden card wrapper by its ID
    const targetElement = document.getElementById('export-card-wrapper'); 

    if (targetElement) {
      setLoading(true);
      setMessage(""); 
      try {
        const canvas = await html2canvas(targetElement, {
          scale: 2, 
          useCORS: true, 
          backgroundColor: null, // Allow component background to show through
        });

        const imageType = exportFormat === "JPEG" ? "image/jpeg" : "image/png";
        const dataUrl = canvas.toDataURL(imageType);

        // Set the image source and open the modal for preview
        setPreviewImageSrc(dataUrl);
        setShowPreviewModal(true);

      } catch (error) {
        console.error("Error exporting card:", error);
        setMessage("❌ Failed to create export preview.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("❌ Export card component not found. Check the 'export-card-wrapper' ID.");
    }
  };

  // ⬇️ Function to handle the actual file download from the modal
  const handleDownload = () => {
    if (previewImageSrc) {
      const filename = `mood_summary_${new Date().toLocaleDateString('en-US').replace(/\//g, '-')}.${exportFormat.toLowerCase()}`;
      const link = document.createElement('a');
      link.href = previewImageSrc;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close the modal after download
      setShowPreviewModal(false);
      setPreviewImageSrc("");
    }
  };


  // --- UI Components (Bar Chart and Stats) ---
  const MoodDistribution = () => ( 
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h3 className="flex items-center text-[14px] font-sans text-[#0A0A0A] mb-4">
        Mood Distribution <TrendingUp className="w-4 h-4 ml-2" />
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {[
          { mood: "Happy", emoji: "😊", notes: 22 },
          { mood: "Peaceful", emoji: "😌", notes: 15 },
          { mood: "Excited", emoji: "🤩", notes: 8 },
          { mood: "Stressed", emoji: "😩", notes: 4 },
        ].map((item) => (
          <div
            key={item.mood}
            className="p-3 rounded-[10px] border border-[#FAF5FF] bg-[#FAF5FF] shadow-md"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span>{item.emoji}</span>
                <span className="text-[#0A0A0A] text-[14px] font-sans">
                  {item.mood}
                </span>
              </div>
              <span className="text-xs text-gray-500">{item.notes} notes</span>
            </div>
            <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#AD46FF] to-[#F6339A]"
                style={{ width: `${(item.notes / 50) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MoodPatternsChart = () => (
    <div className="bg-white p-6 rounded-[14px] shadow-md mb-6"> 
      <h3 className="text-[14px] font-sans text-[#0A0A0A] mb-4">
        This Week's Mood Patterns
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={moodPatternData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} domain={[0, 8]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="happy" stackId="a" fill={moodColors.happy} />
          <Bar dataKey="stressed" stackId="a" fill={moodColors.stressed} />
          <Bar dataKey="excited" stackId="a" fill={moodColors.excited} />
          <Bar dataKey="peaceful" stackId="a" fill={moodColors.peaceful} />
          <Bar dataKey="neutral" stackId="a" fill={moodColors.neutral} />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Export Section UI */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end items-center space-x-3">
        <span className="text-sm text-gray-600">Export Format</span>
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="JPEG">JPEG</option>
          <option value="PNG">PNG</option>
        </select>
        <button
          onClick={handleExportData}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50"
        >
          <span>Export Data</span>
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Download className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );

  const ProfileStats = () => (
    <div className="grid grid-cols-3 gap-4">
      {exportStats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center p-4 rounded-[14px] bg-gradient-to-r from-[#FEF2F2] to-[#DCFCE7] border border-[#B9F8CF]"
        >
          <span className="text-[14px]">
            {stat.label === "Total Notes" ? "📝" : stat.label === "Day Streak" ? "🔥" : "😊"}
          </span>
          <span className="text-[14px] font mt-1">{stat.value}</span>
          <p className={`text-xs font-sans mt-1 text-[#0A0A0A]`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF2F2] via-[#FEF2F2] to-[#FAF5FF] p-6 md:p-10 lg:p-12 lg:px-26">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card (left column) */}
        <div className="bg-white p-8 rounded-[14px] shadow flex flex-col items-center">
          {/* Avatar and Profile Info... */}
          <div className="relative w-28 h-28 mb-4">
            <div
              className="w-full h-full rounded-full flex items-center justify-center text-[14px] font-bold text-white"
              style={{
                backgroundImage: "linear-gradient(to right top, #AD46FF, #F6339A)",
              }}
            >
              U
            </div>
          </div>

          <div className="flex items-center mb-6 space-x-2">
            <p className="text-[14px] font-sans text-[#0A0A0A]">Profile</p>
            <button
              onClick={() => setEditing(true)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Edit3 className="w-4 h-4 text-purple-600" />
            </button>
          </div>

          <div className="w-full space-y-4">
            {/* Input fields */}
            <div className="flex items-center p-3 border rounded-lg bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                name="username"
                value={editing ? tempProfile.username : profile.username}
                onChange={handleChange}
                readOnly={!editing}
                className={`w-full bg-transparent text-sm text-gray-700 focus:outline-none ${
                  editing ? "border-b border-purple-400" : ""
                }`}
              />
            </div>

            <div className="flex items-center p-3 border rounded-lg bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                value={editing ? tempProfile.email : profile.email}
                onChange={handleChange}
                readOnly={!editing}
                className={`w-full bg-transparent text-sm text-gray-700 focus:outline-none ${
                  editing ? "border-b border-purple-400" : ""
                }`}
              />
            </div>

            <div className="flex items-center p-3 border rounded-lg bg-gray-50">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="tel"
                name="phone"
                value={editing ? tempProfile.phone : profile.phone}
                onChange={handleChange}
                readOnly={!editing}
                className={`w-full bg-transparent text-sm text-gray-700 focus:outline-none ${
                  editing ? "border-b border-purple-400" : ""
                }`}
              />
            </div>
            {/* Save / Cancel buttons */}
            {editing && (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="w-1/2 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="w-1/2 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            )}
            {/* Action buttons */}
            {!editing && (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 font-sans rounded-[8px] hover:bg-gray-100 transition"
              >
                <span>Change Password</span>
                <Lock className="w-4 h-4" />
              </button>
            )}
            {!editing && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#D4183D] text-white font-sans rounded-[8px] shadow hover:bg-red-700 transition"
              >
                <span>Logout</span>
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Insights (right column) */}
        <div className="lg:col-span-2 space-y-6">
          <MoodDistribution />
          <MoodPatternsChart />
          <ProfileStats />
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                {message && (
                  <p
                    className={`text-sm mb-2 text-center ${
                      message.startsWith("✅") ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {message}
                  </p>
                )}
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowPasswordModal(false)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
            </div>
        </div>
      )}

      {/* 🖼️ Hidden component to generate the image data */}
      <div 
        id="export-card-wrapper" 
        // Use transform to move it off-screen for reliable rendering
        className="fixed top-0 left-0 -z-50"
        style={{ 
            width: '400px', 
            height: '650px',
            transform: 'translateX(-9999px)' 
        }} 
      >
        <ExportSummaryCard
          stats={exportStats}
          date="September 2025"
          socialTag={`@${profile.username || 'user'}`}
          topMoods={topMoods} // Passed the dynamically calculated moods
        />
      </div>

      {/* 🖼️ Image Preview Modal */}
      {showPreviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all duration-300">
                  <div className="p-6 flex justify-between items-center border-b border-gray-200">
                      <h2 className="text-xl font-bold">Export Preview ({exportFormat})</h2>
                      <button onClick={() => setShowPreviewModal(false)} className="text-gray-500 hover:text-gray-900">
                          <X className="w-6 h-6" />
                      </button>
                  </div>
                  
                  {/* Image Container */}
                  <div className="p-4 overflow-y-auto max-h-[80vh]">
                      {previewImageSrc ? (
                          <img 
                              src={previewImageSrc} 
                              alt="Export Preview" 
                              className="w-full h-auto border border-gray-300 rounded-lg shadow-inner"
                          />
                      ) : (
                          <p className="text-center py-10 text-gray-500">Generating preview...</p>
                      )}
                  </div>

                  {/* Actions */}
                  <div className="p-4 flex justify-end space-x-3 border-t border-gray-200">
                      <button
                          onClick={() => {
                              setShowPreviewModal(false);
                              setPreviewImageSrc("");
                          }}
                          className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                      >
                          Cancel
                      </button>
                      <button
                          onClick={handleDownload}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center space-x-2"
                      >
                          <Download className="w-4 h-4" />
                          <span>Confirm Download</span>
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ProfilePage;