import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Users, Smile } from 'lucide-react';

const hugMessages = [
  "You're wrapped in good thoughts right now",
  "Sending you warmth and comfort from afar",
  "You are loved, valued, and never alone",
  "This hug carries all the strength you need",
  "Breathe in peace, breathe out worry",
  "You're doing better than you think",
  "Someone believes in you today",
  "This moment of comfort is just for you",
  "You deserve all the kindness in the world",
  "Let this hug remind you of your worth",
  "You're stronger than any storm you face",
  "Wrapped in virtual arms that care deeply",
  "Your heart is safe here, always",
  "This hug holds infinite possibilities",
  "You bring light to this world"
];

function App() {
  const [isHugging, setIsHugging] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const savedCount = localStorage.getItem('hugCount');
    if (savedCount) {
      setHugCount(parseInt(savedCount, 10));
    }
  }, []);

  const generateHug = () => {
    if (isHugging) return;

    setIsHugging(true);
    setShowMessage(false);
    
    // Generate random message
    const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    setCurrentMessage(randomMessage);
    
    // Create floating particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);

    // Animation sequence
    setTimeout(() => {
      setShowMessage(true);
    }, 800);

    setTimeout(() => {
      setIsHugging(false);
      setParticles([]);
      const newCount = hugCount + 1;
      setHugCount(newCount);
      localStorage.setItem('hugCount', newCount.toString());
    }, 4000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/30 via-transparent to-purple-200/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,113,133,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(196,181,253,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-400 floating-heart" />
          </div>
        ))}
      </div>

      {/* Hug Particles */}
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-ping"
              style={{
                top: `${particle.y}%`,
                left: `${particle.x}%`,
                animationDuration: '2s',
              }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full opacity-70"></div>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Container with Squeeze Effect */}
      <div 
        className={`relative z-10 min-h-screen flex items-center justify-center px-4 py-8 transition-all duration-1000 ease-in-out ${
          isHugging ? 'scale-95 px-8' : 'scale-100'
        }`}
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Users className={`w-16 h-16 md:w-20 md:h-20 text-rose-500 transition-all duration-500 ${
                  isHugging ? 'scale-110 text-rose-600' : ''
                }`} />
                {isHugging && (
                  <div className="absolute inset-0 bg-rose-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                )}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4">
              Hug Generator
            </h1>
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl font-light">
              Click for an instant virtual hug
            </p>
          </div>

          {/* Hug Button */}
          <div className="mb-12">
            <button
              onClick={generateHug}
              disabled={isHugging}
              className={`group relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-12 py-6 rounded-full font-semibold text-xl shadow-2xl transition-all duration-500 ${
                isHugging 
                  ? 'scale-110 shadow-rose-500/50 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-rose-500/30 active:scale-95'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Heart className={`w-6 h-6 transition-all duration-300 ${
                  isHugging ? 'animate-pulse text-rose-200' : 'group-hover:scale-110'
                }`} />
                <span className="text-xl md:text-2xl">
                  {isHugging ? 'Hugging...' : 'Give Me a Hug'}
                </span>
                <Sparkles className={`w-6 h-6 transition-all duration-300 ${
                  isHugging ? 'animate-pulse text-purple-200' : 'group-hover:scale-110'
                }`} />
              </div>
              
              {/* Button glow effect during hug */}
              {isHugging && (
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
              )}
            </button>
          </div>

          {/* Hug Message */}
          <div className={`transition-all duration-1000 ${
            showMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}>
            {currentMessage && (
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-rose-200/50 shadow-2xl">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-rose-400 to-pink-400 p-4 rounded-full animate-pulse">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-800 text-xl md:text-2xl leading-relaxed font-medium">
                    {currentMessage}
                  </p>
                  <div className="mt-6 flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles 
                        key={i} 
                        className="w-5 h-5 text-rose-400 animate-pulse" 
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hug Counter */}
          {hugCount > 0 && (
            <div className="mt-8">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-rose-200/50">
                <Smile className="w-5 h-5 text-rose-500" />
                <span className="text-gray-700 font-medium">
                  {hugCount} hug{hugCount !== 1 ? 's' : ''} shared
                </span>
                <Heart className="w-5 h-5 text-rose-500" />
              </div>
            </div>
          )}

          {/* Footer Message */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-base md:text-lg">
              Sometimes we all need a reminder that we're cared for
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Glow Effects */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl transition-all duration-1000 ${
        isHugging ? 'animate-pulse scale-110' : ''
      }`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl transition-all duration-1000 ${
        isHugging ? 'animate-pulse scale-110' : ''
      }`} style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
}

export default App;