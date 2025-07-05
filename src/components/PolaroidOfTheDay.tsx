import React, { useState, useEffect } from 'react';
import { Camera, Heart, Star, Sparkles, RotateCcw, X } from 'lucide-react';

// Fixed polaroid data - no longer changes daily
const fixedPolaroid = {
  url: 'https://i.ibb.co/CKkCJ2x3/IMG-20250705-152656.jpg',
  caption: 'Living my best life with style ✨',
  mood: 'Main Character Energy'
};

interface PolaroidOfTheDayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PolaroidOfTheDay: React.FC<PolaroidOfTheDayProps> = ({ isVisible, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [flashEffect, setFlashEffect] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [showPolaroid, setShowPolaroid] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      
      // Flash effect immediately
      setFlashEffect(true);
      setTimeout(() => setFlashEffect(false), 200);
      
      // Show polaroid after flash
      setTimeout(() => {
        setShowPolaroid(true);
        setCanClose(true);
      }, 300);
    } else {
      document.body.style.overflow = 'unset';
      setImageLoaded(false);
      setFlashEffect(false);
      setCanClose(false);
      setShowPolaroid(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    if (!canClose) return;
    onClose();
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
      <div className={`relative transform transition-all duration-500 ease-out ${
        showPolaroid ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
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
              
              {/* Actual Image */}
              <img
                src={fixedPolaroid.url}
                alt={fixedPolaroid.caption}
                onLoad={handleImageLoad}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              />
              
              {/* Vintage photo effects */}
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
            </div>
          </div>

          {/* Caption Area */}
          <div className="bg-white p-4 border-t border-gray-100">
            <div className="space-y-3">
              {/* Mood Badge */}
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {fixedPolaroid.mood}
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
                "{fixedPolaroid.caption}"
              </p>
              
              {/* Signature */}
              <div className="text-center pt-2 border-t border-gray-200">
                <p className="text-gray-500 text-xs" style={{ fontFamily: 'Courier New, monospace' }}>
                  Captured with ❤️ for July 12th
                </p>
              </div>
            </div>
          </div>

          {/* Polaroid Brand Strip */}
          <div className="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 h-2" />
        </div>

        {/* Floating Hearts Effect */}
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