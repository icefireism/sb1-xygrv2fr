import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart, ExternalLink, Shuffle, Repeat, Clock, User } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  spotifyUrl: string;
  embedUrl: string;
  mood?: string;
  color?: string;
}

// Enhanced with your provided Spotify links and additional metadata
const songs: Song[] = [
  {
    id: '1',
    title: 'her',
    artist: 'JVKE',
    album: 'this is what ____ feels like (Vol. 1-4)',
    duration: '2:58',
    spotifyUrl: 'https://open.spotify.com/track/6G9YlbU3ByPJQvOFDRdwyM?si=c7dfba553b424a50',
    embedUrl: 'https://open.spotify.com/embed/track/6G9YlbU3ByPJQvOFDRdwyM?utm_source=generator&theme=0',
    mood: 'Emotional & Heartfelt',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: '2',
    title: 'From the Start', 
    artist: 'Laufey',
    album: 'Bewitched',
    duration: '3:38',
    spotifyUrl: 'https://open.spotify.com/track/43iIQbw5hx986dUEZbr3eN?si=e3c4226c015f45ce',
    embedUrl: 'https://open.spotify.com/embed/track/43iIQbw5hx986dUEZbr3eN?utm_source=generator&theme=0',
    mood: 'Jazz & Nostalgic',
    color: 'from-amber-500 to-orange-600'
  }
];

export const SpotifyPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [embedError, setEmbedError] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [showVisualization, setShowVisualization] = useState(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (showEmbed) {
      setIframeKey(prev => prev + 1);
      setEmbedError(false);
    }
  }, [currentSongIndex, showEmbed]);

  useEffect(() => {
    if (isOpen) {
      setShowVisualization(true);
    } else {
      setShowVisualization(false);
      setIsPlaying(false);
    }
  }, [isOpen]);

  const nextSong = () => {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(randomIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    }
  };

  const previousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!showEmbed) {
      openInSpotify();
    }
  };

  const toggleEmbed = () => {
    setShowEmbed(!showEmbed);
    if (!showEmbed) {
      setIsPlaying(true);
    }
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const openInSpotify = () => {
    window.open(currentSong.spotifyUrl, '_blank');
  };

  const handleIframeError = () => {
    setEmbedError(true);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    if (showEmbed) {
      setIsPlaying(true);
    }
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one':
        return <div className="relative"><Repeat className="w-4 h-4" /><div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full text-xs flex items-center justify-center text-white font-bold" style={{ fontSize: '8px' }}>1</div></div>;
      case 'all':
        return <Repeat className="w-4 h-4 text-green-400" />;
      default:
        return <Repeat className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {!isOpen ? (
        <div className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <Music className="w-5 h-5" />
              <span>July 12th Playlist</span>
              <Heart className="w-5 h-5" />
            </div>
          </button>
          <p className="text-purple-200/60 text-sm mt-3">
            Special songs for the special day • {songs.length} tracks
          </p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Enhanced Header with Gradient */}
          <div className={`bg-gradient-to-r ${currentSong.color || 'from-green-500 to-emerald-600'} p-6 relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px, 20px 20px'
              }} />
            </div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">July 12th Playlist</h3>
                  <p className="text-white/80 text-sm flex items-center space-x-2">
                    <span>{songs.length} songs</span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>~7 min</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200 backdrop-blur-sm"
                >
                  <Music className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Visualization Bars */}
            {showVisualization && (
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 h-8 overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-white/40 rounded-t transition-all duration-300 ${
                      isPlaying ? 'animate-pulse' : ''
                    }`}
                    style={{
                      width: '2px',
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Now Playing Section */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentSong.color || 'from-green-400 to-emerald-600'} rounded-lg flex items-center justify-center shadow-lg`}>
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      {currentSong.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                      <User className="w-3 h-3" />
                      <span>{currentSong.artist}</span>
                      {currentSong.duration && (
                        <>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{currentSong.duration}</span>
                        </>
                      )}
                    </div>
                    {currentSong.mood && (
                      <div className="mt-1">
                        <span className="bg-white/20 text-white/90 px-2 py-1 rounded-full text-xs font-medium">
                          {currentSong.mood}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={openInSpotify}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-green-500/25"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Spotify</span>
                </button>
              </div>

              {/* Enhanced Player Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleShuffle}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isShuffled 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                    }`}
                    title="Shuffle"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  <button
                    onClick={previousSong}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 text-white"
                    disabled={songs.length <= 1}
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className={`p-4 bg-gradient-to-r ${currentSong.color || 'from-green-500 to-emerald-500'} hover:from-green-600 hover:to-emerald-600 rounded-full transition-all duration-200 hover:scale-110 shadow-lg text-white`}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </button>

                  <button
                    onClick={nextSong}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110 text-white"
                    disabled={songs.length <= 1}
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>

                  <button
                    onClick={toggleRepeat}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      repeatMode !== 'off' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                    }`}
                    title={`Repeat: ${repeatMode}`}
                  >
                    {getRepeatIcon()}
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-white/70" />
                  <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Spotify Embed or Enhanced Fallback */}
              <div className="mt-6">
                {showEmbed && !embedError ? (
                  <div className="relative">
                    <iframe
                      key={iframeKey}
                      src={currentSong.embedUrl}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg shadow-lg"
                      onError={handleIframeError}
                      title={`Spotify player for ${currentSong.title}`}
                    />
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => setShowEmbed(false)}
                        className="bg-black/50 hover:bg-black/70 text-white p-1 rounded text-xs transition-colors duration-200"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : showEmbed && embedError ? (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <div className="text-center">
                      <Music className="w-8 h-8 text-red-400 mx-auto mb-3" />
                      <p className="text-red-300 text-sm mb-4">
                        Spotify embed couldn't load due to browser restrictions.
                      </p>
                      <button
                        onClick={openInSpotify}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-2 mx-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Listen on Spotify</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={toggleEmbed}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 mx-auto border border-white/20"
                    >
                      <Play className="w-4 h-4" />
                      <span>Try Spotify Embed Player</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Song List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-semibold flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Queue</span>
                </h4>
                <div className="text-white/60 text-sm">
                  {songs.length} songs
                </div>
              </div>
              
              <div className="space-y-2">
                {songs.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => selectSong(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 group ${
                      currentSongIndex === index
                        ? `border-green-400 bg-gradient-to-r ${song.color}/20`
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          currentSongIndex === index 
                            ? `bg-gradient-to-br ${song.color} text-white shadow-lg` 
                            : 'bg-white/10 text-white/60 group-hover:bg-white/20'
                        }`}>
                          {currentSongIndex === index && isPlaying ? (
                            <div className="flex space-x-1">
                              <div className="w-1 h-4 bg-white animate-pulse rounded-full"></div>
                              <div className="w-1 h-4 bg-white animate-pulse rounded-full" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-1 h-4 bg-white animate-pulse rounded-full" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          ) : currentSongIndex === index ? (
                            <Music className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-white font-medium">{song.title}</p>
                            {song.mood && (
                              <span className="bg-white/20 text-white/80 px-2 py-0.5 rounded-full text-xs">
                                {song.mood}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-white/60 text-sm mt-1">
                            <span>{song.artist}</span>
                            {song.album && (
                              <>
                                <span>•</span>
                                <span>{song.album}</span>
                              </>
                            )}
                            {song.duration && (
                              <>
                                <span>•</span>
                                <span>{song.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(song.spotifyUrl, '_blank');
                          }}
                          className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <ExternalLink className="w-4 h-4 text-green-300" />
                        </button>
                        <Heart className="w-4 h-4 text-white/40 hover:text-pink-400 transition-colors duration-200 cursor-pointer opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Instructions */}
            <div className="p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10">
              <div className="flex items-start space-x-3">
                <Music className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/90 text-sm font-medium mb-1">
                    🎵 Enhanced Listening Experience
                  </p>
                  <p className="text-white/70 text-sm">
                    Due to browser restrictions, Spotify embeds may not always work. For the best experience, click "Open in Spotify" to listen with full audio quality and features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};