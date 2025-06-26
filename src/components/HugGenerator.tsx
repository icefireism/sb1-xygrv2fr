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
  size: number;
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
    
    // Left side hand prints (right hands reaching from left) - More visible
    for (let i = 0; i < 6; i++) {
      prints.push({
        id: i,
        x: Math.random() * 30, // Left 30% of screen
        y: 15 + Math.random() * 70, // Spread across height
        rotation: -25 + Math.random() * 50,
        isLeft: false, // Right hand from left side
        delay: i * 0.15,
        size: 0.8 + Math.random() * 0.6 // Varied sizes
      });
    }
    
    // Right side hand prints (left hands reaching from right) - More visible
    for (let i = 0; i < 6; i++) {
      prints.push({
        id: i + 6,
        x: 70 + Math.random() * 30, // Right 30% of screen
        y: 15 + Math.random() * 70, // Spread across height
        rotation: -25 + Math.random() * 50,
        isLeft: true, // Left hand from right side
        delay: i * 0.15 + 0.1,
        size: 0.8 + Math.random() * 0.6
      });
    }
    
    // Top hand prints - More prominent
    for (let i = 0; i < 4; i++) {
      prints.push({
        id: i + 12,
        x: 20 + Math.random() * 60, // Center area
        y: Math.random() * 25, // Top 25%
        rotation: 60 + Math.random() * 60,
        isLeft: Math.random() > 0.5,
        delay: i * 0.12 + 0.3,
        size: 0.9 + Math.random() * 0.4
      });
    }
    
    // Bottom hand prints - More prominent
    for (let i = 0; i < 4; i++) {
      prints.push({
        id: i + 16,
        x: 20 + Math.random() * 60, // Center area
        y: 75 + Math.random() * 25, // Bottom 25%
        rotation: -60 + Math.random() * 60,
        isLeft: Math.random() > 0.5,
        delay: i * 0.12 + 0.4,
        size: 0.9 + Math.random() * 0.4
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

  const HandPrintSVG: React.FC<{ isLeft: boolean; size: number; className?: string }> = ({ isLeft, size, className = "" }) => (
    <svg
      width={80 * size}
      height={100 * size}
      viewBox="0 0 80 100"
      className={className}
      style={{ transform: isLeft ? 'scaleX(-1)' : 'none' }}
    >
      {/* Hand shadow/depth */}
      <g transform="translate(2, 2)" opacity="0.3">
        {/* Palm shadow */}
        <ellipse
          cx="40"
          cy="55"
          rx="22"
          ry="30"
          fill="rgba(0, 0, 0, 0.4)"
        />
        {/* Finger shadows */}
        <ellipse cx="30" cy="20" rx="7" ry="22" fill="rgba(0, 0, 0, 0.3)" />
        <ellipse cx="40" cy="15" rx="7" ry="25" fill="rgba(0, 0, 0, 0.3)" />
        <ellipse cx="50" cy="20" rx="6" ry="22" fill="rgba(0, 0, 0, 0.3)" />
        <ellipse cx="58" cy="28" rx="5" ry="18" fill="rgba(0, 0, 0, 0.3)" />
        <ellipse cx="20" cy="42" rx="9" ry="18" fill="rgba(0, 0, 0, 0.3)" transform="rotate(-25 20 42)" />
      </g>
      
      {/* Main hand */}
      {/* Palm */}
      <ellipse
        cx="40"
        cy="55"
        rx="22"
        ry="30"
        fill="rgba(255, 255, 255, 0.35)"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="2"
      />
      
      {/* Palm gradient overlay */}
      <ellipse
        cx="40"
        cy="55"
        rx="18"
        ry="25"
        fill="url(#palmGradient)"
        opacity="0.7"
      />
      
      {/* Thumb */}
      <ellipse
        cx="20"
        cy="42"
        rx="9"
        ry="18"
        fill="rgba(255, 255, 255, 0.32)"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="2"
        transform="rotate(-25 20 42)"
      />
      
      {/* Index finger */}
      <ellipse
        cx="30"
        cy="20"
        rx="7"
        ry="22"
        fill="rgba(255, 255, 255, 0.32)"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="2"
      />
      
      {/* Middle finger */}
      <ellipse
        cx="40"
        cy="15"
        rx="7"
        ry="25"
        fill="rgba(255, 255, 255, 0.32)"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="2"
      />
      
      {/* Ring finger */}
      <ellipse
        cx="50"
        cy="20"
        rx="6"
        ry="22"
        fill="rgba(255, 255, 255, 0.32)"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="2"
      />
      
      {/* Pinky */}
      <ellipse
        cx="58"
        cy="28"
        rx="5"
        ry="18"
        fill="rgba(255, 255, 255, 0.32)"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="2"
      />
      
      {/* Palm lines for ultra realism */}
      <path
        d="M 25 50 Q 40 55 55 50"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 28 62 Q 40 65 52 62"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 30 70 Q 40 72 50 70"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Finger creases */}
      <path d="M 27 30 Q 30 32 33 30" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" fill="none" />
      <path d="M 37 25 Q 40 27 43 25" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" fill="none" />
      <path d="M 47 30 Q 50 32 53 30" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" fill="none" />
      
      {/* Gradient definitions */}
      <defs>
        <radialGradient id="palmGradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
          <stop offset="70%" stopColor="rgba(255, 255, 255, 0.1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
        </radialGradient>
      </defs>
    </svg>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 relative">
      {/* Hand Prints Overlay - Much more visible */}
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
                size={print.size}
                className="drop-shadow-2xl opacity-0 animate-hand-appear filter brightness-110"
              />
            </div>
          ))}
        </div>
      )}

      {/* Screen Squeeze Effect - More dramatic */}
      <div 
        className={`transition-all duration-1000 ease-in-out ${
          screenSqueeze ? 'scale-90 blur-[1px] brightness-95' : 'scale-100'
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