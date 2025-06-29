import React, { useState, useEffect } from 'react';
import { Scroll, Sparkles, Star, Crown } from 'lucide-react';
import { PolaroidOfTheDay } from './PolaroidOfTheDay';

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
  const [scrollPhase, setScrollPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed');
  const [showText, setShowText] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [showPolaroid, setShowPolaroid] = useState(false);
  const prophecy = getDailyProphecy();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Start opening sequence
      setTimeout(() => {
        setScrollPhase('opening');
        
        // Gradually increase scroll height
        let height = 0;
        const maxHeight = 500;
        const increment = maxHeight / 60; // 60 frames for smooth animation
        
        const heightInterval = setInterval(() => {
          height += increment;
          setScrollHeight(height);
          
          if (height >= maxHeight) {
            clearInterval(heightInterval);
            setScrollHeight(maxHeight);
            setScrollPhase('open');
            
            // Show text after scroll is fully open
            setTimeout(() => {
              setShowText(true);
              
              // Allow closing after text appears
              setTimeout(() => {
                setCanClose(true);
              }, 2500);
            }, 800);
          }
        }, 16); // ~60fps
        
      }, 1000);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (!canClose) return;
    
    setShowText(false);
    setScrollPhase('closing');
    
    // Gradually decrease scroll height
    let height = scrollHeight;
    const decrement = height / 40; // Faster closing
    
    const heightInterval = setInterval(() => {
      height -= decrement;
      setScrollHeight(Math.max(0, height));
      
      if (height <= 0) {
        clearInterval(heightInterval);
        setScrollHeight(0);
        setTimeout(() => {
          setIsVisible(false);
          // Show polaroid after scroll closes
          setTimeout(() => {
            setShowPolaroid(true);
          }, 500);
        }, 500);
      }
    }, 16);
  };

  const handlePolaroidClose = () => {
    setShowPolaroid(false);
  };

  if (!isVisible && !showPolaroid) return null;

  return (
    <>
      {/* Birthday Prophecy Scroll */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Enhanced Backdrop with mystical effects */}
          <div 
            className={`absolute inset-0 transition-all duration-1500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleClose}
            style={{
              background: `
                radial-gradient(circle at 30% 20%, rgba(139, 69, 19, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(160, 82, 45, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)
              `
            }}
          >
            {/* Mystical fog effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            </div>
          </div>
          
          {/* Floating mystical particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float opacity-60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              >
                {i % 4 === 0 ? (
                  <Sparkles className="w-2 h-2 text-amber-300" />
                ) : i % 4 === 1 ? (
                  <Star className="w-2 h-2 text-yellow-400" />
                ) : i % 4 === 2 ? (
                  <div className="w-1 h-1 bg-amber-400 rounded-full" />
                ) : (
                  <div className="w-1 h-1 bg-orange-300 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>

          {/* Main Scroll Container */}
          <div className={`relative transform transition-all duration-1500 ease-out ${
            isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}>
            
            {/* Scroll Shadow and Glow */}
            <div className="absolute inset-0 scale-110">
              <div className="absolute inset-0 bg-gradient-radial from-amber-600/30 via-amber-800/20 to-transparent blur-2xl" />
              <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-xl" />
            </div>
            
            {/* Scroll Structure */}
            <div className="relative w-96 md:w-[28rem]">
              
              {/* Top Scroll Rod with enhanced details */}
              <div className="relative z-20 mx-8 mb-2">
                <div className="relative h-6 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 rounded-full shadow-2xl border-2 border-amber-950">
                  {/* Rod shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-full" />
                  <div className="absolute top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent rounded-full" />
                  
                  {/* Ornate rod ends */}
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-full border-3 border-amber-950 shadow-xl">
                    <div className="absolute inset-1 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full" />
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-60" />
                  </div>
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-full border-3 border-amber-950 shadow-xl">
                    <div className="absolute inset-1 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full" />
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-60" />
                  </div>
                  
                  {/* Decorative engravings on rod */}
                  <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-1 h-1 bg-amber-300 rounded-full opacity-80" />
                  <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-1 h-1 bg-amber-300 rounded-full opacity-80" />
                </div>
              </div>

              {/* Parchment Body with realistic unfurling */}
              <div 
                className="relative mx-4 overflow-hidden transition-all duration-100 ease-out"
                style={{ 
                  height: `${scrollHeight}px`,
                  opacity: scrollPhase === 'closed' ? 0 : 1
                }}
              >
                
                {/* Parchment Background with enhanced texture */}
                <div className="relative min-h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-2xl border-l-4 border-r-4 border-amber-200">
                  
                  {/* Multiple texture layers for realism */}
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/60 via-transparent to-amber-300/60" />
                    <div className="absolute inset-0" style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.08) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.06) 1px, transparent 1px),
                        radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.04) 3px, transparent 3px)
                      `,
                      backgroundSize: '40px 40px, 30px 30px, 60px 60px'
                    }} />
                  </div>
                  
                  {/* Aged and weathered edges */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-amber-300/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-amber-300/40 to-transparent" />
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-amber-300/40 to-transparent" />
                    <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-amber-300/40 to-transparent" />
                  </div>
                  
                  {/* Realistic stains and aging marks */}
                  <div className="absolute top-8 right-8 w-12 h-12 bg-amber-800/15 rounded-full blur-sm" />
                  <div className="absolute bottom-12 left-6 w-8 h-8 bg-amber-700/12 rounded-full blur-sm" />
                  <div className="absolute top-1/3 right-4 w-6 h-16 bg-amber-600/8 rounded-full blur-sm transform rotate-12" />
                  <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-amber-900/10 rounded-full blur-sm" />
                  
                  {/* Ink blots */}
                  <div className="absolute top-16 left-12 w-3 h-3 bg-indigo-900/20 rounded-full blur-[1px]" />
                  <div className="absolute bottom-20 right-16 w-2 h-2 bg-indigo-800/15 rounded-full blur-[1px]" />
                  
                  {/* Content Area */}
                  <div className="relative p-8 md:p-12 min-h-full">
                    
                    {/* Ornate Header with enhanced decorations */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800 to-amber-600" />
                          <Crown className="w-6 h-6 text-amber-800" />
                          <Scroll className="w-10 h-10 text-amber-800" />
                          <Crown className="w-6 h-6 text-amber-800" />
                          <div className="w-16 h-px bg-gradient-to-r from-amber-600 via-amber-800 to-transparent" />
                        </div>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-3" style={{
                        fontFamily: 'Cinzel, serif',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        letterSpacing: '0.05em'
                      }}>
                        ✦ Birthday Prophecy ✦
                      </h2>
                      
                      <div className="text-amber-700 text-sm tracking-[0.2em] mb-4" style={{
                        fontFamily: 'Cinzel, serif'
                      }}>
                        REVEALED BY THE ANCIENT STARS
                      </div>
                      
                      {/* Decorative flourish */}
                      <div className="flex justify-center space-x-2 mb-4">
                        <Star className="w-3 h-3 text-amber-600" />
                        <div className="w-8 h-px bg-amber-600 self-center" />
                        <Sparkles className="w-4 h-4 text-amber-700" />
                        <div className="w-8 h-px bg-amber-600 self-center" />
                        <Star className="w-3 h-3 text-amber-600" />
                      </div>
                    </div>

                    {/* Prophecy Text with enhanced styling */}
                    <div className={`transition-all duration-1500 delay-500 ${
                      showText ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                    }`}>
                      
                      {/* Ornate border with corner decorations */}
                      <div className="relative border-4 border-amber-400/60 rounded-xl p-8 bg-gradient-to-br from-amber-50/80 to-yellow-50/80 shadow-inner">
                        
                        {/* Corner decorations */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-amber-600 rounded-tl-lg" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-amber-600 rounded-tr-lg" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-amber-600 rounded-bl-lg" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-amber-600 rounded-br-lg" />
                        
                        {/* Inner decorative elements */}
                        <div className="absolute top-2 left-2 w-3 h-3 border border-amber-500 rounded-full opacity-60" />
                        <div className="absolute top-2 right-2 w-3 h-3 border border-amber-500 rounded-full opacity-60" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border border-amber-500 rounded-full opacity-60" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border border-amber-500 rounded-full opacity-60" />
                        
                        <blockquote className="text-center text-amber-900 text-xl md:text-2xl leading-relaxed font-medium italic relative" style={{
                          fontFamily: 'Cinzel, serif',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                        }}>
                          <span className="text-5xl text-amber-700 absolute -top-4 -left-4 opacity-80">"</span>
                          {prophecy}
                          <span className="text-5xl text-amber-700 absolute -bottom-8 -right-4 opacity-80">"</span>
                        </blockquote>
                      </div>

                      {/* Enhanced Signature */}
                      <div className="mt-8 text-center">
                        <div className="flex items-center justify-center mb-3">
                          <div className="w-12 h-px bg-amber-600" />
                          <Crown className="w-4 h-4 text-amber-700 mx-3" />
                          <div className="w-12 h-px bg-amber-600" />
                        </div>
                        <div className="text-amber-700 text-base font-medium mb-2" style={{
                          fontFamily: 'Cinzel, serif'
                        }}>
                          Foretold by the Cosmic Oracle
                        </div>
                        <div className="text-amber-600 text-sm" style={{
                          fontFamily: 'Cinzel, serif'
                        }}>
                          Keeper of Ancient Wisdom
                        </div>
                        <div className="mt-4 flex justify-center space-x-2">
                          {[...Array(7)].map((_, i) => (
                            <Sparkles 
                              key={i} 
                              className="w-3 h-3 text-amber-600 animate-pulse" 
                              style={{ animationDelay: `${i * 0.3}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Close instruction */}
                    {canClose && (
                      <div className={`mt-8 text-center transition-all duration-1000 ${
                        canClose ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="bg-amber-100/50 border border-amber-300/50 rounded-lg p-3">
                          <p className="text-amber-700 text-sm font-medium" style={{
                            fontFamily: 'Cinzel, serif'
                          }}>
                            ✦ Click anywhere to close the sacred scroll ✦
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Scroll Rod */}
              {scrollPhase !== 'closed' && (
                <div className={`relative z-20 mx-8 mt-2 transition-all duration-1000 ${
                  scrollPhase === 'open' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                }`}>
                  <div className="relative h-6 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 rounded-full shadow-2xl border-2 border-amber-950">
                    {/* Rod shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-full" />
                    <div className="absolute top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent rounded-full" />
                    
                    {/* Ornate rod ends */}
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-full border-3 border-amber-950 shadow-xl">
                      <div className="absolute inset-1 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full" />
                      <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-60" />
                    </div>
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-full border-3 border-amber-950 shadow-xl">
                      <div className="absolute inset-1 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full" />
                      <div className="absolute inset-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-60" />
                    </div>
                    
                    {/* Decorative engravings on rod */}
                    <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-1 h-1 bg-amber-300 rounded-full opacity-80" />
                    <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-1 h-1 bg-amber-300 rounded-full opacity-80" />
                  </div>
                </div>
              )}

              {/* Scroll strings/ribbons with physics */}
              {scrollPhase !== 'closed' && (
                <>
                  <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                    scrollPhase === 'open' ? 'opacity-100' : 'opacity-60'
                  }`}>
                    <div className="w-0.5 bg-gradient-to-b from-amber-700 to-amber-800 shadow-sm rounded-full" 
                         style={{ height: `${Math.min(scrollHeight * 0.15, 40)}px` }} />
                  </div>
                  
                  {scrollPhase === 'open' && (
                    <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                      canClose ? 'opacity-100' : 'opacity-0'
                    }`} style={{ bottom: '40px' }}>
                      <div className="w-0.5 h-10 bg-gradient-to-b from-amber-700 to-amber-800 shadow-sm rounded-full" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Polaroid of the Day */}
      <PolaroidOfTheDay isVisible={showPolaroid} onClose={handlePolaroidClose} />
    </>
  );
};