import React from 'react';
import { Waves, Calendar, Fish, Anchor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative overflow-hidden px-6 py-3 rounded-full font-semibold text-sm shadow-2xl transition-all duration-500 hover:scale-105 ${
        theme === 'coral-reef'
          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white hover:shadow-purple-500/25'
          : 'bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 text-white hover:shadow-cyan-500/25'
      }`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        theme === 'coral-reef'
          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600'
          : 'bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600'
      }`}></div>
      
      <div className="relative flex items-center space-x-2">
        {theme === 'coral-reef' ? (
          <>
            <Calendar className="w-4 h-4" />
            <span>Default Theme</span>
          </>
        ) : (
          <>
            <Waves className="w-4 h-4" />
            <span>Ocean Theme</span>
            <Fish className="w-4 h-4" />
          </>
        )}
      </div>
    </button>
  );
};