"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));

  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;
  const onPlayPause = externalOnPlayPause || (() => setInternalIsPlaying(!internalIsPlaying));

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    audioRef.current.src = audioSrc;
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [audioSrc, isPlaying]);

  const togglePlayPause = () => {
    onPlayPause();
  };

  const handleSliderChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return;

    const [value] = newValue;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipBack = () => {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  const handleVolumeChange = (newValue: number[]) => {
    const [value] = newValue;
    setVolume(value);
    audioRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
        <audio ref={audioRef} src={audioSrc} />
        <Button variant="ghost" size="sm" onClick={togglePlayPause} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full max-w-[100px]"
        />
        <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">{formatTime(currentTime)}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <audio ref={audioRef} src={audioSrc} />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={skipBack} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" onClick={togglePlayPause} className={cn(
          "w-12 h-12 rounded-full",
          isPlaying ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white text-blue-500 hover:bg-blue-50"
        )}>
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button variant="ghost" size="sm" onClick={skipForward} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      <Slider
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={handleSliderChange}
        className="mb-2"
      />
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={toggleMute} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;