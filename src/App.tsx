import React from 'react';
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

function App() {
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
      {/* Polaroid of the Day */}
      <PolaroidOfTheDay isVisible={showPolaroid} onClose={handlePolaroidClose} />

      {/* Dynamic Time-Based Background */}
      <DynamicBackground />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
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

export default App;