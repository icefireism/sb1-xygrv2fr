import React, { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Heart } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  spotifyUrl: string;
  embedUrl: string;
}

// You can replace these with your actual Spotify links
const songs: Song[] = [
  {
    id: '1',
    title: 'her',
    artist: 'JVKE',
    spotifyUrl: 'https://open.spotify.com/track/6G9YlbU3ByPJQvOFDRdwyM',
    embedUrl: 'https://open.spotify.com/embed/track/6G9YlbU3ByPJQvOFDRdwyM?utm_source=generator'
  },
  {
    id: '2',
    title: 'Song 2', 
    artist: 'Artist 2',
    spotifyUrl: 'https://open.spotify.com/track/1A8mOUl9phYxNq5eFjVVnQ', // Replace with your link
    embedUrl: 'https://open.spotify.com/embed/track/1A8mOUl9phYxNq5eFjVVnQ?utm_source=generator&theme=0'
  }
];

export const SpotifyPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (showPlayer) {
      // Force iframe reload when song changes
      setIframeKey(prev => prev + 1);
    }
  }, [currentSongIndex, showPlayer]);

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(false);
  };

  const previousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(false);
  };

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
    setIsPlaying(false);
  };

  const openInSpotify = () => {
    window.open(currentSong.spotifyUrl, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
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
            Special songs for the special day
          </p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-full shadow-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">July 12th Playlist</h3>
                <p className="text-green-200 text-sm">2 special songs</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <Music className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Current Song Info */}
          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-white font-semibold text-lg mb-1">
                  Track {currentSongIndex + 1} of {songs.length}
                </h4>
                <p className="text-white/80 text-sm">
                  {currentSong.title} • {currentSong.artist}
                </p>
              </div>
              <button
                onClick={openInSpotify}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Music className="w-4 h-4" />
                <span>Open in Spotify</span>
              </button>
            </div>

            {/* Spotify Embed Player */}
            {showPlayer && (
              <div className="mb-4">
                <iframe
                  key={iframeKey}
                  src={currentSong.embedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            )}

            {/* Player Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={previousSong}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                disabled={songs.length <= 1}
              >
                <SkipBack className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={togglePlayer}
                className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              >
                {showPlayer ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>

              <button
                onClick={nextSong}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                disabled={songs.length <= 1}
              >
                <SkipForward className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Song List */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>Playlist</span>
            </h4>
            {songs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => setCurrentSongIndex(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  currentSongIndex === index
                    ? 'border-green-400 bg-green-500/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentSongIndex === index 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {currentSongIndex === index ? (
                        <Music className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{song.title}</p>
                      <p className="text-white/60 text-sm">{song.artist}</p>
                    </div>
                  </div>
                  {currentSongIndex === index && (
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-4 bg-green-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/70 text-sm text-center">
              🎵 Click play to enjoy the embedded Spotify player, or open in Spotify for the full experience
            </p>
          </div>
        </div>
      )}
    </div>
  );
};