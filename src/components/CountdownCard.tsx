import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CountdownCardProps {
  value: number;
  label: string;
  index: number;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ value, label, index }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className="countdown-card group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`backdrop-blur-lg rounded-2xl p-6 md:p-8 border shadow-2xl transition-all duration-500 hover:scale-105 ${
        theme === 'coral-reef' 
          ? 'bg-cyan-500/10 border-cyan-300/20 hover:shadow-cyan-500/25 hover:bg-cyan-500/15'
          : 'bg-white/10 border-white/20 hover:shadow-purple-500/25 hover:bg-white/15'
      }`}>
        <div className="text-center">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 font-mono tracking-tight">
            {value.toString().padStart(2, '0')}
          </div>
          <div className={`text-sm md:text-base lg:text-lg font-semibold uppercase tracking-widest ${
            theme === 'coral-reef' ? 'text-cyan-200' : 'text-purple-200'
          }`}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};