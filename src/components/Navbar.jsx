import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import navlogo from '../assets/navlogo.png';
import { Home, BarChart, User, Settings } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: Home, href: '/home' },
  { name: 'Insights', icon: BarChart, href: '/insights' },
  { name: 'Profile', icon: User, href: '/profile' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

const Navbar = () => {
  const location = useLocation();

  const activeBgClass =
    'bg-gradient-to-r from-[#9810FA] to-[#E60076] text-white text-[14px] font-sans';
  const inactiveClass = 'text-black text-[14px] hover:text-[#9810FA]';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm p-4 px-26 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={navlogo}
          alt="Mood Notes"
          className="w-6 h-6 object-contain"
        />
        <span
          className="text-[20px] font-sans font-bold tracking-tight"
          style={{
            color: 'transparent',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            backgroundImage: 'linear-gradient(to right, #9810FA, #E60076)',
          }}
        >
          Mood Notes
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex ms-auto space-x-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center space-x-1 px-4 py-2 rounded-[8px] transition duration-200
                ${isActive ? activeBgClass : inactiveClass}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* User Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center  text-white text-[14px] font-sans cursor-pointer ml-4"
        style={{
          backgroundImage: 'linear-gradient(to right, #d946ef, #9333ea)', // fixed invalid gradient
          boxShadow:
            '0 0 0 2px rgba(255, 255, 255, 0.8), 0 0 0 4px rgba(167, 85, 240, 0.3)',
        }}
      >
        A
      </div>
    </nav>
  );
};

export default Navbar;
