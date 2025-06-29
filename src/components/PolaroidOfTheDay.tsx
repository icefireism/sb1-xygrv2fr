import React, { useState, useEffect } from 'react';
import { Camera, Heart, Star, Sparkles, RotateCcw, X } from 'lucide-react';

const polaroidImages = [
  {
    url: '/custom-polaroid.png',
    caption: 'Living my best life with style ✨',
    mood: 'Main Character Energy'
  },
  {
    url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Chasing sunsets and dreams ✨',
    mood: 'Golden Hour Magic'
  },
  {
    url: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Coffee and contemplation ☕',
    mood: 'Cozy Vibes'
  },
  {
    url: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Adventure awaits around every corner 🌟',
    mood: 'Wanderlust'
  },
  {
    url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Finding beauty in simple moments 🌸',
    mood: 'Peaceful Bliss'
  },
  {
    url: 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Dancing through life with joy 💃',
    mood: 'Pure Happiness'
  },
  {
    url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Ocean waves and salty dreams 🌊',
    mood: 'Seaside Serenity'
  },
  {
    url: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'City lights and midnight thoughts 🌃',
    mood: 'Urban Explorer'
  },
  {
    url: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Nature\'s masterpiece in bloom 🌺',
    mood: 'Garden Paradise'
  },
  {
    url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Sweet treats and sweeter memories 🧁',
    mood: 'Sugar Rush'
  },
  {
    url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Books, blankets, and beautiful stories 📚',
    mood: 'Cozy Corner'
  },
  {
    url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
    caption: 'Mountain peaks and endless possibilities ⛰️',
    mood: 'Summit Dreams'
  }
];

const getDailyPolaroid = () => {
  const now = new Date();
  const referenceDate = new Date('2025-01-01');
  const daysDifference = Math.floor((now.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
  const polaroidIndex = daysDifference % polaroidImages.length;
  return polaroidImages[polaroidIndex];
};

interface PolaroidOfTheDayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PolaroidOfTheDay: React.FC<PolaroidOfTheDayProps> = ({ isVisible, onClose }) => {
  const [polaroidPhase, setPolaroidPhase] = useState<'hidden' | 'dropping' | 'developing' | 'revealed' | 'closing'>('hidden');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const polaroid = getDailyPolaroid();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      
      // Start the sequence
      setTimeout(() => {
        setPolaroidPhase('dropping');
        
        // Flash effect when polaroid "takes the photo"
        setTimeout(() => {
          setFlashEffect(true);
          setTimeout(() => setFlashEffect(false), 200);
        }, 800);
        
        // Start developing phase
        setTimeout(() => {
          setPolaroidPhase('developing');
          
          // Shake effect during development
          setTimeout(() => {
            setShowShake(true);
            setTimeout(() => setShowShake(false), 1000);
          }, 500);
          
          // Reveal the image
          setTimeout(() => {
            setPolaroidPhase('revealed');
            setCanClose(true);
          }, 3000);
        }, 1500);
      }, 300);
    } else {
      document.body.style.overflow = 'unset';
      setPolaroidPhase('hidden');
      setImageLoaded(false);
      setShowShake(false);
      setFlashEffect(false);
      setCanClose(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    if (!canClose) return;
    
    setPolaroidPhase('closing');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Flash Effect */}
      {flashEffect && (
        <div className="absolute inset-0 bg-white animate-pulse z-60" style={{ animationDuration: '0.2s' }} />
      )}
      
      {/* Retro Backdrop */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.85) 100%)
          `
        }}
      >
        {/* Retro grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating retro elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {i % 3 === 0 ? (
                <Camera className="w-4 h-4 text-yellow-300" />
              ) : i % 3 === 1 ? (
                <Star className="w-3 h-3 text-pink-300" />
              ) : (
                <Heart className="w-3 h-3 text-red-300" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Polaroid Container */}
      <div className={`relative transform transition-all duration-1000 ease-out ${
        polaroidPhase === 'hidden' ? 'scale-0 opacity-0 rotate-45 translate-y-[-100px]' :
        polaroidPhase === 'dropping' ? 'scale-100 opacity-100 rotate-12 translate-y-0' :
        polaroidPhase === 'developing' ? `scale-100 opacity-100 rotate-6 translate-y-0 ${showShake ? 'animate-bounce' : ''}` :
        polaroidPhase === 'revealed' ? 'scale-100 opacity-100 rotate-3 translate-y-0' :
        'scale-75 opacity-0 rotate-45 translate-y-[100px]'
      }`}>
        
        {/* Polaroid Shadow */}
        <div className="absolute inset-0 scale-105 bg-black/30 blur-xl rounded-lg transform translate-y-4 translate-x-2" />
        
        {/* Main Polaroid Frame */}
        <div className="relative w-80 md:w-96 bg-white rounded-lg shadow-2xl overflow-hidden transform hover:rotate-0 transition-transform duration-500">
          
          {/* Polaroid Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-red-400 to-red-600 p-2 rounded-full shadow-lg">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg" style={{ fontFamily: 'Courier New, monospace' }}>
                    POLAROID OF THE DAY
                  </h3>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'Courier New, monospace' }}>
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              {canClose && (
                <button
                  onClick={handleClose}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 group"
                >
                  <X className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
                </button>
              )}
            </div>
          </div>

          {/* Photo Area */}
          <div className="relative bg-white p-4">
            <div className="relative aspect-square bg-gray-100 rounded overflow-hidden shadow-inner">
              
              {/* Developing overlay */}
              {polaroidPhase === 'developing' && (
                <div className="absolute inset-0 z-10">
                  {/* Chemical wash effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-300/60 to-gray-400/80 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Development progress bars */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="bg-black/20 rounded-full h-1 overflow-hidden">
                      <div className="bg-red-400 h-full rounded-full animate-pulse developing-bar" style={{ animationDuration: '3s' }} />
                    </div>
                    <div className="bg-black/20 rounded-full h-1 overflow-hidden">
                      <div className="bg-yellow-400 h-full rounded-full animate-pulse developing-bar" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                    </div>
                    <div className="bg-black/20 rounded-full h-1 overflow-hidden">
                      <div className="bg-blue-400 h-full rounded-full animate-pulse developing-bar" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                    </div>
                  </div>
                  
                  {/* Development text */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-white font-bold text-sm animate-pulse" style={{ fontFamily: 'Courier New, monospace' }}>
                        DEVELOPING...
                      </p>
                      <div className="flex justify-center space-x-1 mt-2">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-2 h-2 bg-white rounded-full animate-pulse" 
                            style={{ animationDelay: `${i * 0.3}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Actual Image */}
              <img
                src={polaroid.url}
                alt={polaroid.caption}
                onLoad={handleImageLoad}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  polaroidPhase === 'revealed' && imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              />
              
              {/* Vintage photo effects */}
              {polaroidPhase === 'revealed' && (
                <>
                  {/* Vignette effect */}
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20" />
                  
                  {/* Vintage color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/10 via-transparent to-orange-200/10 mix-blend-overlay" />
                  
                  {/* Film grain */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `
                      radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '4px 4px, 6px 6px'
                  }} />
                </>
              )}
            </div>
          </div>

          {/* Caption Area */}
          <div className="bg-white p-4 border-t border-gray-100">
            {polaroidPhase === 'revealed' ? (
              <div className="space-y-3">
                {/* Mood Badge */}
                <div className="flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {polaroid.mood}
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Sparkles 
                        key={i} 
                        className="w-3 h-3 text-yellow-400 animate-pulse" 
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Caption */}
                <p className="text-gray-700 font-medium text-center italic" style={{ fontFamily: 'Courier New, monospace' }}>
                  "{polaroid.caption}"
                </p>
                
                {/* Signature */}
                <div className="text-center pt-2 border-t border-gray-200">
                  <p className="text-gray-500 text-xs" style={{ fontFamily: 'Courier New, monospace' }}>
                    Captured with ❤️ for July 12th
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-20 bg-gray-50 rounded animate-pulse flex items-center justify-center">
                <p className="text-gray-400 text-sm" style={{ fontFamily: 'Courier New, monospace' }}>
                  Caption developing...
                </p>
              </div>
            )}
          </div>

          {/* Polaroid Brand Strip */}
          <div className="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 h-2" />
        </div>

        {/* Floating Hearts Effect */}
        {polaroidPhase === 'revealed' && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Heart className="w-4 h-4 text-pink-400 opacity-60" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Close Instruction */}
      {canClose && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm animate-pulse" style={{ fontFamily: 'Courier New, monospace' }}>
            Click anywhere to close
          </div>
        </div>
      )}
    </div>
  );
};