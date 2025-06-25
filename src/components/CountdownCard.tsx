import React from 'react';

interface CountdownCardProps {
  value: number;
  label: string;
  index: number;
}

export const CountdownCard: React.FC<CountdownCardProps> = ({ value, label, index }) => {
  return (
    <div 
      className="countdown-card group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:bg-white/15">
        <div className="text-center">
          <div className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 font-mono tracking-tight">
            {value.toString().padStart(2, '0')}
          </div>
          <div className="text-purple-200 text-sm md:text-base lg:text-lg font-semibold uppercase tracking-widest">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};