import React, { useState, useEffect } from 'react';
import { Scroll, Sparkles } from 'lucide-react';

const prophecies = [
  "The moon whispers secrets of chocolate cake and endless giggles",
  "Crystal visions reveal a day painted in golden laughter and sweet surprises",
  "The ancient spirits decree: today shall overflow with magical moments",
  "Starlight prophecy unfolds: your heart will dance with pure joy",
  "The mystic winds carry news of adventures wrapped in birthday wishes",
  "Sacred flames illuminate a path of wonder and delightful chaos",
  "The oracle's mirror shows reflections of happiness multiplied infinitely",
  "Celestial guardians have blessed this day with extraordinary magic",
  "The cosmic tapestry weaves threads of celebration through your destiny",
  "Ancient wisdom speaks: today you shall collect memories like precious gems"
];

const getDailyProphecy = (): string => {
  const now = new Date();
  const referenceDate = new Date('2025-01-01');
  const daysDifference = Math.floor((now.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
  const prophecyIndex = daysDifference % prophecies.length;
  return prophecies[prophecyIndex];
};

export const BirthdayProphecyScroll: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isUnrolling, setIsUnrolling] = useState(false);
  const [showText, setShowText] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const prophecy = getDailyProphecy();

  useEffect(() => {
    // Prevent scrolling when scroll is visible
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  useEffect(() => {
    // Show scroll after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Start unrolling animation
      setTimeout(() => {
        setIsUnrolling(true);
        // Show text after unroll
        setTimeout(() => {
          setShowText(true);
          // Allow closing after text appears
          setTimeout(() => {
            setCanClose(true);
          }, 2000);
        }, 1200);
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (!canClose) return;
    setShowText(false);
    setTimeout(() => {
      setIsUnrolling(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Scroll Container */}
      <div className={`relative transform transition-all duration-1000 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        
        {/* Magical Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-3 h-3 text-yellow-300 opacity-70" />
            </div>
          ))}
        </div>

        {/* Scroll Shadow */}
        <div className="absolute inset-0 bg-gradient-radial from-amber-900/20 via-transparent to-transparent blur-2xl scale-110" />
        
        {/* Main Scroll */}
        <div className="relative w-80 md:w-96">
          
          {/* Top Scroll Rod */}
          <div className="relative z-10 mx-8">
            <div className="h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-full shadow-lg border-2 border-amber-900">
              <div className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full opacity-60" />
              {/* Rod ends */}
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full border-2 border-amber-950 shadow-lg" />
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full border-2 border-amber-950 shadow-lg" />
            </div>
          </div>

          {/* Parchment Body */}
          <div className={`relative mx-4 transition-all duration-1200 ease-out ${
            isUnrolling ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            
            {/* Parchment Background */}
            <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-2xl">
              
              {/* Parchment texture overlay */}
              <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-amber-200/50 via-transparent to-amber-300/50" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
                                 radial-gradient(circle at 80% 70%, rgba(139, 69, 19, 0.1) 1px, transparent 1px),
                                 radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.1) 1px, transparent 1px)`,
                backgroundSize: '30px 30px, 25px 25px, 35px 35px'
              }} />
              
              {/* Aged edges */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-transparent to-amber-200/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-amber-200/30 via-transparent to-amber-200/30" />
              
              {/* Burn marks and stains */}
              <div className="absolute top-4 right-6 w-8 h-8 bg-amber-800/20 rounded-full blur-sm" />
              <div className="absolute bottom-8 left-4 w-6 h-6 bg-amber-700/15 rounded-full blur-sm" />
              <div className="absolute top-1/2 right-2 w-4 h-12 bg-amber-600/10 rounded-full blur-sm transform rotate-12" />
              
              {/* Content Area */}
              <div className="relative p-8 md:p-12">
                
                {/* Decorative Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent" />
                    <Scroll className="w-8 h-8 text-amber-800 mx-4" />
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent" />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2" style={{
                    fontFamily: 'Cinzel, serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    Birthday Prophecy
                  </h2>
                  
                  <div className="text-amber-700 text-sm tracking-widest" style={{
                    fontFamily: 'Cinzel, serif'
                  }}>
                    ✦ REVEALED BY THE ANCIENT STARS ✦
                  </div>
                </div>

                {/* Prophecy Text */}
                <div className={`transition-all duration-1000 delay-300 ${
                  showText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  
                  {/* Decorative border */}
                  <div className="border-2 border-amber-300 rounded-lg p-6 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 shadow-inner">
                    
                    {/* Corner decorations */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-amber-400" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-amber-400" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-amber-400" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-amber-400" />
                    
                    <blockquote className="text-center text-amber-900 text-lg md:text-xl leading-relaxed font-medium italic relative" style={{
                      fontFamily: 'Cinzel, serif',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}>
                      <span className="text-4xl text-amber-700 absolute -top-2 -left-2">"</span>
                      {prophecy}
                      <span className="text-4xl text-amber-700 absolute -bottom-4 -right-2">"</span>
                    </blockquote>
                  </div>

                  {/* Signature */}
                  <div className="mt-6 text-center">
                    <div className="text-amber-700 text-sm italic" style={{
                      fontFamily: 'Cinzel, serif'
                    }}>
                      — Foretold by the Cosmic Oracle —
                    </div>
                    <div className="mt-2 flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Sparkles 
                          key={i} 
                          className="w-3 h-3 text-amber-600 animate-pulse" 
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Close instruction */}
                {canClose && (
                  <div className={`mt-6 text-center transition-all duration-500 ${
                    canClose ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <p className="text-amber-600 text-xs italic" style={{
                      fontFamily: 'Cinzel, serif'
                    }}>
                      Click anywhere to close the sacred scroll
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Scroll Rod */}
          <div className={`relative z-10 mx-8 transition-all duration-1200 delay-600 ${
            isUnrolling ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <div className="h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-full shadow-lg border-2 border-amber-900">
              <div className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full opacity-60" />
              {/* Rod ends */}
              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full border-2 border-amber-950 shadow-lg" />
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full border-2 border-amber-950 shadow-lg" />
            </div>
          </div>

          {/* Scroll strings/ribbons */}
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isUnrolling ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-px h-8 bg-gradient-to-b from-amber-700 to-amber-800 shadow-sm" />
          </div>
          
          {canClose && (
            <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
              canClose ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="w-px h-8 bg-gradient-to-b from-amber-700 to-amber-800 shadow-sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};