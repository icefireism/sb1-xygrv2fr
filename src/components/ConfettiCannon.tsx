import React, { useState, useEffect, useRef } from 'react';
import { Zap, Volume2, VolumeX, RotateCcw, Target } from 'lucide-react';

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle' | 'star' | 'heart';
  gravity: number;
  life: number;
  maxLife: number;
}

const confettiColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

const explosionSounds = [
  'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
  'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
];

export const ConfettiCannon: React.FC = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [explosionCount, setExplosionCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [buttonShake, setButtonShake] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new AudioContext();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Create explosion sound effect
  const playExplosionSound = () => {
    if (!soundEnabled || !audioContextRef.current) return;

    try {
      const audioContext = audioContextRef.current;
      
      // Create a more complex explosion sound
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();

      // Configure oscillators for explosion effect
      oscillator1.type = 'sawtooth';
      oscillator1.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.5);

      oscillator2.type = 'square';
      oscillator2.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);

      // Configure filter for boom effect
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, audioContext.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);

      // Configure gain envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      // Connect audio nodes
      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Start and stop oscillators
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.5);
      oscillator2.stop(audioContext.currentTime + 0.5);

      // Add pop sound
      setTimeout(() => {
        const popOsc = audioContext.createOscillator();
        const popGain = audioContext.createGain();
        
        popOsc.type = 'sine';
        popOsc.frequency.setValueAtTime(800, audioContext.currentTime);
        popOsc.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        popGain.gain.setValueAtTime(0.2, audioContext.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        popOsc.connect(popGain);
        popGain.connect(audioContext.destination);
        
        popOsc.start(audioContext.currentTime);
        popOsc.stop(audioContext.currentTime + 0.1);
      }, 100);

    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  const createConfettiParticle = (x: number, y: number, index: number): ConfettiParticle => {
    const angle = (Math.PI * 2 * index) / 50 + (Math.random() - 0.5) * 0.5;
    const velocity = 15 + Math.random() * 25;
    const shapes: ConfettiParticle['shape'][] = ['circle', 'square', 'triangle', 'star', 'heart'];
    
    return {
      id: Date.now() + index,
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - Math.random() * 10,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 20,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      gravity: 0.8 + Math.random() * 0.4,
      life: 1,
      maxLife: 3000 + Math.random() * 2000
    };
  };

  const explode = () => {
    if (isExploding) return;

    setIsCharging(true);
    setButtonShake(true);
    
    // Charging effect
    setTimeout(() => {
      setIsCharging(false);
      setIsExploding(true);
      setExplosionCount(prev => prev + 1);
      
      // Play explosion sound
      playExplosionSound();
      
      // Create confetti particles
      const newConfetti: ConfettiParticle[] = [];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Main explosion
      for (let i = 0; i < 100; i++) {
        newConfetti.push(createConfettiParticle(centerX, centerY, i));
      }
      
      // Secondary explosions
      setTimeout(() => {
        for (let i = 0; i < 50; i++) {
          newConfetti.push(createConfettiParticle(
            centerX + (Math.random() - 0.5) * 200,
            centerY + (Math.random() - 0.5) * 200,
            i + 100
          ));
        }
        setConfetti(newConfetti);
      }, 200);
      
      setConfetti(newConfetti);
      
      // Reset button shake
      setTimeout(() => setButtonShake(false), 500);
      
      // Reset explosion state
      setTimeout(() => {
        setIsExploding(false);
      }, 1000);
    }, 800);
  };

  // Animation loop for confetti
  useEffect(() => {
    if (confetti.length === 0) return;

    const animate = () => {
      setConfetti(prevConfetti => {
        const updatedConfetti = prevConfetti
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.99, // Air resistance
            vy: particle.vy + particle.gravity,
            rotation: particle.rotation + particle.rotationSpeed,
            life: particle.life - (16 / particle.maxLife) // Assuming 60fps
          }))
          .filter(particle => 
            particle.life > 0 && 
            particle.x > -50 && 
            particle.x < window.innerWidth + 50 &&
            particle.y < window.innerHeight + 50
          );

        if (updatedConfetti.length > 0) {
          animationRef.current = requestAnimationFrame(animate);
        }

        return updatedConfetti;
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [confetti.length]);

  const renderConfettiParticle = (particle: ConfettiParticle) => {
    const opacity = Math.max(0, particle.life);
    const scale = 0.5 + (particle.life * 0.5);

    const shapeElements = {
      circle: (
        <div
          className="rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ),
      square: (
        <div
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ),
      triangle: (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: `${particle.size / 2}px solid transparent`,
            borderRight: `${particle.size / 2}px solid transparent`,
            borderBottom: `${particle.size}px solid ${particle.color}`,
          }}
        />
      ),
      star: (
        <div
          className="text-center"
          style={{
            fontSize: particle.size,
            color: particle.color,
            lineHeight: 1,
          }}
        >
          ⭐
        </div>
      ),
      heart: (
        <div
          className="text-center"
          style={{
            fontSize: particle.size,
            color: particle.color,
            lineHeight: 1,
          }}
        >
          ❤️
        </div>
      ),
    };

    return (
      <div
        key={particle.id}
        className="absolute pointer-events-none"
        style={{
          left: particle.x,
          top: particle.y,
          transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${scale})`,
          opacity,
          zIndex: 1000,
        }}
      >
        {shapeElements[particle.shape]}
      </div>
    );
  };

  const resetCannon = () => {
    setConfetti([]);
    setExplosionCount(0);
    setIsExploding(false);
    setIsCharging(false);
    setButtonShake(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {/* Confetti Particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map(renderConfettiParticle)}
      </div>

      {/* Screen Flash Effect */}
      {isExploding && (
        <div className="fixed inset-0 bg-white animate-ping opacity-30 z-40 pointer-events-none" 
             style={{ animationDuration: '0.3s' }} />
      )}

      {/* Main Component */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden">
        
        {/* Warning Signs */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg px-3 py-1 animate-pulse">
            <span className="text-red-300 text-xs font-bold">⚠️ DANGER ZONE ⚠️</span>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-3 py-1 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <span className="text-yellow-300 text-xs font-bold">🚨 HIGH VOLTAGE 🚨</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mt-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-red-400 mr-3 animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              LIVE CONFETTI CANNON
            </h3>
            <Zap className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
          </div>
          <p className="text-red-200 text-sm font-medium animate-pulse">
            ⚡ ARMED AND READY ⚡
          </p>
        </div>

        {/* The Big Red Button */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            {/* Button Glow Effect */}
            {(isCharging || isExploding) && (
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 animate-pulse scale-150" />
            )}
            
            {/* Charging Ring */}
            {isCharging && (
              <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-spin" 
                   style={{ animationDuration: '0.5s' }} />
            )}
            
            <button
              onClick={explode}
              disabled={isExploding || isCharging}
              className={`relative group bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white font-black text-xl md:text-2xl px-12 py-8 rounded-full shadow-2xl border-4 border-red-400 transition-all duration-200 ${
                buttonShake ? 'animate-bounce' : 'hover:scale-105 active:scale-95'
              } ${
                isCharging ? 'animate-pulse scale-110' : ''
              } ${
                isExploding ? 'animate-ping scale-125' : ''
              }`}
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                boxShadow: isExploding 
                  ? '0 0 50px rgba(239, 68, 68, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)' 
                  : '0 20px 40px rgba(239, 68, 68, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Button Inner Glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-red-400/30 to-transparent rounded-full" />
              
              {/* Button Text */}
              <div className="relative flex flex-col items-center">
                <span className="text-3xl md:text-4xl mb-2">
                  {isCharging ? '⚡' : isExploding ? '💥' : '🚫'}
                </span>
                <span className="leading-tight">
                  {isCharging ? 'CHARGING...' : isExploding ? 'BOOM!' : "DON'T PRESS"}
                </span>
                {!isCharging && !isExploding && (
                  <span className="text-sm font-normal opacity-80 mt-1">
                    (Seriously, don't!)
                  </span>
                )}
              </div>
              
              {/* Button Highlight */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white/20 rounded-full blur-sm" />
            </button>
          </div>
        </div>

        {/* Stats and Controls */}
        <div className="flex items-center justify-between">
          <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{explosionCount}</div>
              <div className="text-white/60 text-xs">EXPLOSIONS</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 border border-white/20"
              title={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white/60" />
              )}
            </button>

            <button
              onClick={resetCannon}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 border border-white/20"
              title="Reset Cannon"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{confetti.length}</div>
              <div className="text-white/60 text-xs">PARTICLES</div>
            </div>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="text-center">
            <p className="text-red-200 text-sm font-medium mb-2">
              ⚠️ SAFETY WARNING ⚠️
            </p>
            <p className="text-white/70 text-xs">
              This button is clearly labeled "DON'T PRESS" for a reason. 
              Pressing it will result in an explosion of joy, confetti, and possible addiction to pressing big red buttons.
              Use responsibly! 🎉
            </p>
          </div>
        </div>

        {/* Explosion Effect Overlay */}
        {isExploding && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Shockwave rings */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white/30 rounded-full animate-ping"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};