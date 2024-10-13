import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioSrc, 
  isPlaying: externalIsPlaying, 
  onPlayPause: externalOnPlayPause, 
  compact = false 
}) => {
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;
  const onPlayPause = externalOnPlayPause || (() => setInternalIsPlaying(!internalIsPlaying));

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    const audio = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();
    };
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(error => console.error('Error playing audio:', error));
    } else {
      audio.pause();
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audioSrc, isPlaying]);

  const togglePlayPause = () => {
    onPlayPause();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const value = parseFloat(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipBack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 10);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
        <button onClick={togglePlayPause} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <input
          type="range"
          value={currentTime}
          max={duration}
          step={1}
          onChange={handleSliderChange}
          className="w-full max-w-[100px] accent-blue-500"
        />
        <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">{formatTime(currentTime)}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button onClick={skipBack} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          onClick={togglePlayPause}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isPlaying
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-white text-blue-500 hover:bg-blue-50 border border-blue-500"
          }`}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
        <button onClick={skipForward} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
      <input
        type="range"
        value={currentTime}
        max={duration}
        step={1}
        onChange={handleSliderChange}
        className="w-full mb-2 accent-blue-500"
      />
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={toggleMute} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
        <input
          type="range"
          value={isMuted ? 0 : volume}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          className="w-24 accent-blue-500"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;