import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { CoralReefBackground } from './components/CoralReefBackground';
import { useCountdown } from './hooks/useCountdown';
import { CountdownCard } from './components/CountdownCard';
import { FloatingElements } from './components/FloatingElements';
import { DailyQuote } from './components/DailyQuote';
import { VirtualCakeBuilder } from './components/VirtualCakeBuilder';
import { HugGenerator } from './components/HugGenerator';
import { PolaroidOfTheDay } from './components/PolaroidOfTheDay';
import { SpotifyPlayer } from './components/SpotifyPlayer';
import { DynamicBackground } from './components/DynamicBackground';
import { Calendar, Clock } from 'lucide-react';

function AppContent() {
  const { theme, isTransitioning } = useTheme();
  // Target date: July 12, 2025, 00:00:00 IST
  const targetDate = new Date('2025-07-12T00:00:00+05:30');
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const [showPolaroid, setShowPolaroid] = React.useState(false);

  const countdownItems = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ];

  // Show polaroid after a delay when component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowPolaroid(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePolaroidClose = () => {
    setShowPolaroid(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Ripple effect from center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="theme-transition-ripple-1" />
            <div className="theme-transition-ripple-2" />
            <div className="theme-transition-ripple-3" />
          </div>
          
          {/* Enhanced particle burst effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-transition-particle"
                style={{
                  top: '50%',
                  left: '50%',
                  animationDelay: `${i * 0.02}s`,
                  '--angle': `${(i * 12)}deg`,
                  '--distance': `${150 + Math.random() * 400}px`,
                  '--size': `${2 + Math.random() * 4}px`
                } as React.CSSProperties}
              >
                <div 
                  className={`rounded-full transition-all duration-300 ${
                    theme === 'coral-reef' 
                      ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 shadow-lg shadow-cyan-400/50' 
                      : 'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 shadow-lg shadow-purple-400/50'
                  }`}
                  style={{
                    width: 'var(--size)',
                    height: 'var(--size)'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Spiral particle effect */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`spiral-${i}`}
                className="absolute animate-spiral-particle"
                style={{
                  top: '50%',
                  left: '50%',
                  animationDelay: `${i * 0.08}s`,
                  '--spiral-angle': `${i * 24}deg`,
                  '--spiral-radius': `${100 + i * 8}px`
                } as React.CSSProperties}
              >
                <div className={`w-3 h-3 rounded-full ${
                  theme === 'coral-reef' 
                    ? 'bg-gradient-to-r from-cyan-300 to-teal-300' 
                    : 'bg-gradient-to-r from-purple-300 to-pink-300'
                }`} />
              </div>
            ))}
          </div>
          
          {/* Wave expansion effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`wave-${i}`}
                className="absolute theme-transition-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  '--wave-color': theme === 'coral-reef' 
                    ? 'rgba(6, 182, 212, 0.3)' 
                    : 'rgba(147, 51, 234, 0.3)'
                } as React.CSSProperties}
              />
            ))}
          </div>
          
          {/* Starburst effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute animate-starburst"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  '--star-angle': `${i * 22.5}deg`
                } as React.CSSProperties}
              >
                <div className={`w-1 h-20 ${
                  theme === 'coral-reef' 
                    ? 'bg-gradient-to-t from-cyan-400 via-teal-300 to-transparent' 
                    : 'bg-gradient-to-t from-purple-400 via-pink-300 to-transparent'
                } rounded-full`} />
              </div>
            ))}
          </div>
          
          {/* Enhanced color wash overlay with multiple layers */}
          <div className={`absolute inset-0 theme-color-wash-1 ${
            theme === 'coral-reef' 
              ? 'bg-gradient-radial from-cyan-500/40 via-teal-400/25 to-transparent' 
              : 'bg-gradient-radial from-purple-500/40 via-pink-400/25 to-transparent'
          }`} />
          <div className={`absolute inset-0 theme-color-wash-2 ${
            theme === 'coral-reef' 
              ? 'bg-gradient-radial from-blue-400/30 via-cyan-300/15 to-transparent' 
              : 'bg-gradient-radial from-indigo-400/30 via-purple-300/15 to-transparent'
          }`} />
          
          {/* Shimmer overlay */}
          <div className="absolute inset-0 theme-shimmer">
            <div className={`absolute inset-0 ${
              theme === 'coral-reef'
                ? 'bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent'
                : 'bg-gradient-to-r from-transparent via-purple-200/20 to-transparent'
            }`} />
          </div>
          
          {/* Vortex effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`theme-vortex ${
              theme === 'coral-reef'
                ? 'border-cyan-400/40'
                : 'border-purple-400/40'
            }`} />
          </div>
        </div>
      )}
      
      {/* Enhanced transition blur overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 backdrop-blur-sm bg-black/10 transition-all duration-1000" />
        </div>
      )}
      
      {/* Transition completion flash */}
      {isTransitioning && (
        <div className="fixed inset-0 z-45 pointer-events-none">
          <div className={`absolute inset-0 theme-completion-flash ${
            theme === 'coral-reef'
              ? 'bg-gradient-radial from-cyan-300/30 to-transparent'
              : 'bg-gradient-radial from-purple-300/30 to-transparent'
          }`} />
        </div>
      )}
      {/* Polaroid of the Day */}
      <PolaroidOfTheDay isVisible={showPolaroid} onClose={handlePolaroidClose} />

      {/* Dynamic Time-Based Background */}
      <div className={`transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
        {theme === 'coral-reef' ? <CoralReefBackground /> : <DynamicBackground />}
      </div>

      {/* Floating Elements */}
      <div className={`transition-all duration-800 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <FloatingElements />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-1200 ${
        isTransitioning ? 'opacity-70 scale-98 blur-[2px]' : 'opacity-100 scale-100 blur-0'
      }`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggle />
        </div>
        
        <div className="max-w-6xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 md:w-12 md:h-12 text-purple-300 mr-4" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                July 12<sup className="text-2xl md:text-3xl">th</sup>
              </h1>
            </div>
            <p className="text-purple-200 text-lg md:text-xl lg:text-2xl font-light">
              Something amazing is coming
            </p>
            <div className="mt-4 flex items-center justify-center text-purple-300">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm md:text-base">IST (Indian Standard Time)</span>
            </div>
          </div>

          {/* Daily Quote */}
          {!isExpired && <DailyQuote />}

          {/* Hug Generator */}
          <HugGenerator />

          {/* Spotify Player */}
          <SpotifyPlayer />

          {/* Virtual Cake Builder */}
          <VirtualCakeBuilder isCountdownExpired={isExpired} />

          {/* Countdown Display */}
          {!isExpired ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12">
              {countdownItems.map((item, index) => (
                <CountdownCard
                  key={item.label}
                  value={item.value}
                  label={item.label}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                🎉 The Day Has Arrived! 🎉
              </h2>
              <p className="text-xl md:text-2xl text-white/90">
                July 12th is finally here!
              </p>
            </div>
          )}

          {/* Footer Message */}
          <div className="text-center">
            <p className="text-purple-200/80 text-base md:text-lg">
              Every second brings us closer to something extraordinary
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;