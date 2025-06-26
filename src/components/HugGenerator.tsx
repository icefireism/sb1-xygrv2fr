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

interface HandPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  isLeft: boolean;
  delay: number;
}

export const HugGenerator: React.FC = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [handPrints, setHandPrints] = useState<HandPrint[]>([]);
  const [screenSqueeze, setScreenSqueeze] = useState(false);

  useEffect(() => {
    const savedCount = localStorage.getItem('july12th-hugCount');
    if (savedCount) {
      setHugCount(parseInt(savedCount, 10));
    }
  }, []);

  const generateHandPrints = (): HandPrint[] => {
    const prints: HandPrint[] = [];
    
    // Left side hand prints (right hands reaching from left)
    for (let i = 0; i < 4; i++) {
      prints.push({
        id: i,
        x: Math.random() * 25, // Left 25% of screen
        y: 20 + Math.random() * 60, // Middle area
        rotation: -15 + Math.random() * 30,
        isLeft: false, // Right hand from left side
        delay: i * 0.2
      });
    }
    
    // Right side hand prints (left hands reaching from right)
    for (let i = 0; i < 4; i++) {
      prints.push({
        id: i + 4,
        x: 75 + Math.random() * 25, // Right 25% of screen
        y: 20 + Math.random() * 60, // Middle area
        rotation: -15 + Math.random() * 30,
        isLeft: true, // Left hand from right side
        delay: i * 0.2 + 0.1
      });
    }
    
    // Top hand prints
    for (let i = 0; i < 3; i++) {
      prints.push({
        id: i + 8,
        x: 25 + Math.random() * 50, // Center area
        y: Math.random() * 20, // Top 20%
        rotation: 45 + Math.random() * 90,
        isLeft: Math.random() > 0.5,
        delay: i * 0.15 + 0.3
      });
    }
    
    // Bottom hand prints
    for (let i = 0; i < 3; i++) {
      prints.push({
        id: i + 11,
        x: 25 + Math.random() * 50, // Center area
        y: 80 + Math.random() * 20, // Bottom 20%
        rotation: -45 + Math.random() * 90,
        isLeft: Math.random() > 0.5,
        delay: i * 0.15 + 0.4
      });
    }
    
    return prints;
  };

  const generateHug = () => {
    if (isHugging) return;

    setIsHugging(true);
    setShowMessage(false);
    setScreenSqueeze(true);
    
    // Generate random message
    const randomMessage = hugMessages[Math.floor(Math.random() * hugMessages.length)];
    setCurrentMessage(randomMessage);
    
    // Generate hand prints
    const prints = generateHandPrints();
    setHandPrints(prints);

    // Animation sequence
    setTimeout(() => {
      setShowMessage(true);
    }, 1200);

    setTimeout(() => {
      setIsHugging(false);
      setHandPrints([]);
      setScreenSqueeze(false);
      const newCount = hugCount + 1;
      setHugCount(newCount);
      localStorage.setItem('july12th-hugCount', newCount.toString());
    }, 5000);
  };

  const HandPrintSVG: React.FC<{ isLeft: boolean; className?: string }> = ({ isLeft, className = "" }) => (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      className={className}
      style={{ transform: isLeft ? 'scaleX(-1)' : 'none' }}
    >
      {/* Palm */}
      <ellipse
        cx="30"
        cy="45"
        rx="18"
        ry="25"
        fill="rgba(255, 255, 255, 0.15)"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
      />
      
      {/* Thumb */}
      <ellipse
        cx="15"
        cy="35"
        rx="8"
        ry="15"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        transform="rotate(-20 15 35)"
      />
      
      {/* Index finger */}
      <ellipse
        cx="25"
        cy="15"
        rx="6"
        ry="18"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
      />
      
      {/* Middle finger */}
      <ellipse
        cx="32"
        cy="12"
        rx="6"
        ry="20"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
      />
      
      {/* Ring finger */}
      <ellipse
        cx="39"
        cy="15"
        rx="5"
        ry="18"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
      />
      
      {/* Pinky */}
      <ellipse
        cx="45"
        cy="20"
        rx="4"
        ry="15"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
      />
      
      {/* Palm lines for realism */}
      <path
        d="M 20 40 Q 30 45 40 40"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 22 50 Q 30 52 38 50"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 relative">
      {/* Hand Prints Overlay */}
      {handPrints.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {handPrints.map((print) => (
            <div
              key={print.id}
              className="absolute hand-print-appear"
              style={{
                top: `${print.y}%`,
                left: `${print.x}%`,
                transform: `translate(-50%, -50%) rotate(${print.rotation}deg)`,
                animationDelay: `${print.delay}s`,
              }}
            >
              <HandPrintSVG 
                isLeft={print.isLeft} 
                className="drop-shadow-lg opacity-0 animate-hand-appear"
              />
            </div>
          ))}
        </div>
      )}

      {/* Screen Squeeze Effect */}
      <div 
        className={`transition-all duration-1000 ease-in-out ${
          screenSqueeze ? 'scale-95 blur-[0.5px]' : 'scale-100'
        }`}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Users className={`w-8 h-8 md:w-10 md:h-10 text-pink-300 transition-all duration-500 ${
                isHugging ? 'scale-110 text-pink-200' : ''
              }`} />
              {isHugging && (
                <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              )}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white ml-3">
              Need a Hug?
            </h3>
          </div>

          {/* Hug Button */}
          <div className="mb-6">
            <button
              onClick={generateHug}
              disabled={isHugging}
              className={`group relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl transition-all duration-500 ${
                isHugging 
                  ? 'scale-110 shadow-pink-500/50 cursor-not-allowed' 
                  : 'hover:scale-105 hover:shadow-pink-500/30 active:scale-95'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <Heart className={`w-5 h-5 transition-all duration-300 ${
                  isHugging ? 'animate-pulse text-pink-200' : 'group-hover:scale-110'
                }`} />
                <span>
                  {isHugging ? 'Hugging...' : 'Give Me a Hug'}
                </span>
                <Sparkles className={`w-5 h-5 transition-all duration-300 ${
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
            showMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            {currentMessage && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-3 rounded-full animate-pulse">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-white text-lg md:text-xl leading-relaxed font-medium">
                    {currentMessage}
                  </p>
                  <div className="mt-4 flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Sparkles 
                        key={i} 
                        className="w-4 h-4 text-pink-300 animate-pulse" 
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
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Smile className="w-4 h-4 text-pink-300" />
                <span className="text-white/80 text-sm font-medium">
                  {hugCount} hug{hugCount !== 1 ? 's' : ''} shared
                </span>
                <Heart className="w-4 h-4 text-pink-300" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};