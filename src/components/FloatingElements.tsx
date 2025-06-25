import React from 'react';
import { Calendar, Clock, Star, Sparkles } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  const elements = [
    { Icon: Calendar, delay: '0s', duration: '20s', position: 'top-1/4 left-1/4' },
    { Icon: Clock, delay: '5s', duration: '25s', position: 'top-3/4 right-1/4' },
    { Icon: Star, delay: '10s', duration: '18s', position: 'top-1/2 left-1/6' },
    { Icon: Sparkles, delay: '15s', duration: '22s', position: 'bottom-1/4 right-1/6' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map(({ Icon, delay, duration, position }, index) => (
        <div
          key={index}
          className={`absolute ${position} animate-pulse opacity-20`}
          style={{
            animationDelay: delay,
            animationDuration: duration,
          }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12 text-white floating-element" />
        </div>
      ))}
    </div>
  );
};