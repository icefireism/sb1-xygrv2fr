import React, { useState, useEffect } from 'react';
import { Fish, Waves, Anchor, Shell, Star } from 'lucide-react';

interface TimeOfDay {
  period: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'lateNight';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  elements: React.ReactNode[];
}

export const CoralReefBackground: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    let period: TimeOfDay['period'];

    if (hour >= 5 && hour < 7) {
      period = 'dawn';
    } else if (hour >= 7 && hour < 12) {
      period = 'morning';
    } else if (hour >= 12 && hour < 17) {
      period = 'afternoon';
    } else if (hour >= 17 && hour < 20) {
      period = 'evening';
    } else if (hour >= 20 && hour < 23) {
      period = 'night';
    } else {
      period = 'lateNight';
    }

    const timeConfigs: Record<TimeOfDay['period'], Omit<TimeOfDay, 'period'>> = {
      dawn: {
        colors: {
          primary: 'from-cyan-900 via-teal-800 to-blue-700',
          secondary: 'from-pink-800/30 via-orange-700/20 to-cyan-600/30',
          accent: 'from-coral-500/20 via-orange-400/15 to-cyan-300/20'
        },
        elements: [
          // Dawn underwater sun rays
          <div key="dawn-rays" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bg-gradient-to-b from-yellow-300/40 to-transparent"
                style={{
                  left: `${40 + i * 2.5}%`,
                  width: '2px',
                  height: '60%',
                  transform: `rotate(${-20 + i * 5}deg)`,
                  transformOrigin: 'top center',
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>,
          // Swimming fish
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`dawn-fish-${i}`}
              className="absolute animate-float opacity-70"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              <Fish className="w-8 h-8 text-cyan-300 transform" style={{ transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})` }} />
            </div>
          )),
          // Floating bubbles
          ...Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`dawn-bubble-${i}`}
              className="absolute animate-float opacity-60"
              style={{
                top: `${60 + Math.random() * 40}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="w-3 h-3 bg-cyan-200/40 rounded-full border border-cyan-300/60" />
            </div>
          ))
        ]
      },
      morning: {
        colors: {
          primary: 'from-blue-800 via-cyan-700 to-teal-600',
          secondary: 'from-blue-700/40 via-cyan-600/30 to-teal-500/30',
          accent: 'from-cyan-400/25 via-teal-400/20 to-blue-300/15'
        },
        elements: [
          // Coral formations
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`morning-coral-${i}`}
              className="absolute bottom-0 opacity-80"
              style={{
                left: `${20 + i * 30}%`,
                height: `${40 + Math.random() * 20}%`,
                width: '60px',
              }}
            >
              <div className="relative h-full">
                <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-pink-500 via-coral-400 to-orange-400 rounded-t-full opacity-70" />
                <div className="absolute bottom-0 left-2 w-8 h-1/2 bg-gradient-to-t from-red-400 to-pink-300 rounded-t-full opacity-60" />
                <div className="absolute bottom-0 right-2 w-6 h-2/3 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-t-full opacity-60" />
              </div>
            </div>
          )),
          // School of fish
          ...Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`morning-school-${i}`}
              className="absolute animate-float opacity-80"
              style={{
                top: `${20 + Math.random() * 30}%`,
                left: `${Math.random() * 70}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <Fish className="w-6 h-6 text-blue-300" />
            </div>
          )),
          // Seaweed
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`morning-seaweed-${i}`}
              className="absolute bottom-0 animate-float opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-32 bg-gradient-to-t from-green-600 via-green-400 to-green-300 rounded-t-full opacity-70 transform origin-bottom animate-pulse" />
            </div>
          ))
        ]
      },
      afternoon: {
        colors: {
          primary: 'from-blue-600 via-cyan-500 to-teal-400',
          secondary: 'from-blue-500/40 via-cyan-400/30 to-teal-300/30',
          accent: 'from-cyan-300/25 via-teal-300/20 to-blue-200/15'
        },
        elements: [
          // Vibrant coral reef
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`afternoon-reef-${i}`}
              className="absolute bottom-0 opacity-90"
              style={{
                left: `${10 + i * 25}%`,
                height: `${50 + Math.random() * 30}%`,
                width: '80px',
              }}
            >
              <div className="relative h-full">
                <div className="absolute bottom-0 w-full h-4/5 bg-gradient-to-t from-pink-600 via-coral-500 to-orange-500 rounded-t-3xl opacity-80" />
                <div className="absolute bottom-0 left-3 w-10 h-3/5 bg-gradient-to-t from-red-500 to-pink-400 rounded-t-2xl opacity-70" />
                <div className="absolute bottom-0 right-3 w-8 h-4/5 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-t-2xl opacity-70" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1/2 bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-full opacity-60" />
              </div>
            </div>
          )),
          // Tropical fish
          ...Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`afternoon-tropical-${i}`}
              className="absolute animate-float opacity-90"
              style={{
                top: `${15 + Math.random() * 50}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              <Fish className={`w-7 h-7 ${['text-yellow-400', 'text-orange-400', 'text-pink-400', 'text-purple-400', 'text-blue-400'][i % 5]} transform`} 
                    style={{ transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})` }} />
            </div>
          )),
          // Sea anemones
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`afternoon-anemone-${i}`}
              className="absolute bottom-0 animate-pulse opacity-70"
              style={{
                left: `${30 + i * 20}%`,
                animationDelay: `${i * 1}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-radial from-pink-400 via-purple-400 to-blue-400 rounded-full opacity-80" />
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={j}
                    className="absolute top-1/2 left-1/2 w-1 h-8 bg-gradient-to-t from-pink-300 to-transparent rounded-full animate-pulse"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${j * 45}deg)`,
                      transformOrigin: 'bottom center',
                      animationDelay: `${j * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))
        ]
      },
      evening: {
        colors: {
          primary: 'from-indigo-800 via-purple-700 to-blue-800',
          secondary: 'from-purple-700/30 via-pink-600/20 to-indigo-600/30',
          accent: 'from-pink-400/20 via-purple-300/15 to-indigo-400/20'
        },
        elements: [
          // Bioluminescent elements
          ...Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`evening-bio-${i}`}
              className="absolute animate-pulse opacity-80"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-cyan-300 rounded-full blur-sm" />
            </div>
          )),
          // Jellyfish
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`evening-jellyfish-${i}`}
              className="absolute animate-float opacity-70"
              style={{
                top: `${20 + Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <div className="relative">
                <div className="w-16 h-12 bg-gradient-to-b from-purple-300/60 via-pink-300/40 to-transparent rounded-full" />
                {Array.from({ length: 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="absolute top-full left-1/2 w-0.5 bg-gradient-to-b from-purple-300/60 to-transparent rounded-full animate-pulse"
                    style={{
                      height: `${20 + Math.random() * 15}px`,
                      transform: `translateX(${-8 + j * 3}px)`,
                      animationDelay: `${j * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )),
          // Deep sea coral
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`evening-deep-coral-${i}`}
              className="absolute bottom-0 opacity-60"
              style={{
                left: `${25 + i * 25}%`,
                height: `${30 + Math.random() * 20}%`,
              }}
            >
              <div className="w-12 h-full bg-gradient-to-t from-purple-800 via-indigo-600 to-purple-400 rounded-t-full opacity-70" />
            </div>
          ))
        ]
      },
      night: {
        colors: {
          primary: 'from-indigo-900 via-blue-900 to-purple-900',
          secondary: 'from-indigo-800/30 via-blue-800/20 to-purple-800/30',
          accent: 'from-cyan-600/20 via-blue-500/15 to-purple-600/20'
        },
        elements: [
          // Deep sea bioluminescence
          ...Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`night-glow-${i}`}
              className="absolute animate-pulse opacity-60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            >
              <div className={`w-1 h-1 rounded-full blur-sm ${['bg-cyan-400', 'bg-blue-400', 'bg-purple-400'][Math.floor(Math.random() * 3)]}`} />
            </div>
          )),
          // Night fish with glowing eyes
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`night-fish-${i}`}
              className="absolute animate-float opacity-80"
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            >
              <div className="relative">
                <Fish className="w-6 h-6 text-indigo-300" />
                <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" />
              </div>
            </div>
          )),
          // Deep coral silhouettes
          ...Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`night-silhouette-${i}`}
              className="absolute bottom-0 opacity-40"
              style={{
                left: `${15 + i * 20}%`,
                height: `${40 + Math.random() * 20}%`,
              }}
            >
              <div className="w-10 h-full bg-gradient-to-t from-indigo-900 to-indigo-700 rounded-t-2xl" />
            </div>
          ))
        ]
      },
      lateNight: {
        colors: {
          primary: 'from-slate-900 via-blue-950 to-indigo-950',
          secondary: 'from-slate-800/30 via-blue-900/20 to-indigo-900/30',
          accent: 'from-blue-700/20 via-indigo-800/15 to-slate-700/20'
        },
        elements: [
          // Minimal deep sea life
          ...Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`late-glow-${i}`}
              className="absolute animate-pulse opacity-40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            >
              <div className="w-0.5 h-0.5 bg-blue-300 rounded-full blur-sm" />
            </div>
          )),
          // Sleeping fish
          ...Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`late-fish-${i}`}
              className="absolute animate-float opacity-50"
              style={{
                top: `${50 + Math.random() * 30}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${15 + Math.random() * 5}s`,
              }}
            >
              <Fish className="w-5 h-5 text-slate-400" />
            </div>
          )),
          // Dark coral formations
          ...Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`late-coral-${i}`}
              className="absolute bottom-0 opacity-30"
              style={{
                left: `${30 + i * 20}%`,
                height: `${25 + Math.random() * 15}%`,
              }}
            >
              <div className="w-8 h-full bg-gradient-to-t from-slate-800 to-slate-600 rounded-t-xl" />
            </div>
          ))
        ]
      }
    };

    setTimeOfDay({
      period,
      ...timeConfigs[period]
    });
  }, [currentTime]);

  if (!timeOfDay) return null;

  return (
    <div className="absolute inset-0 overflow-hidden transition-all duration-[2000ms] ease-in-out">
      {/* Primary Ocean Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${timeOfDay.colors.primary} transition-all duration-[2000ms] ease-in-out`} />
      
      {/* Secondary Water Layer */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${timeOfDay.colors.secondary} transition-all duration-[2000ms] ease-in-out`} />
      
      {/* Accent Shimmer Layer */}
      <div className={`absolute inset-0 bg-gradient-to-bl ${timeOfDay.colors.accent} transition-all duration-[2000ms] ease-in-out`} />
      
      {/* Water Surface Effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-300/10 via-transparent to-transparent animate-pulse" />
      
      {/* Underwater Light Rays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)] transition-opacity duration-[2000ms]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,200,255,0.05),transparent_50%)] transition-opacity duration-[2000ms]" />
      </div>
      
      {/* Ocean Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-900/40 via-yellow-800/20 to-transparent" />
      
      {/* Time-specific Ocean Elements */}
      <div className="absolute inset-0 transition-all duration-[2000ms] ease-in-out">
        {timeOfDay.elements}
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <div className="w-1 h-1 bg-cyan-200 rounded-full" />
          </div>
        ))}
      </div>
      
      {/* Ocean Theme Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-cyan-300/20">
          <div className="flex items-center space-x-2">
            <Waves className="w-4 h-4 text-cyan-300" />
            <span className="text-cyan-100 text-sm font-medium capitalize">
              Ocean {timeOfDay.period === 'lateNight' ? 'Late Night' : timeOfDay.period}
            </span>
            <span className="text-cyan-200/60 text-xs">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};