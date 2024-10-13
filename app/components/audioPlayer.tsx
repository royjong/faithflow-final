"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioSrc: string;
  isPlaying: boolean;  // Add isPlaying prop
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, isPlaying, compact = false }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio(audioSrc));

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

    // Clean up event listeners on unmount
    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.pause();  // Pause audio if the component is unmounted
    };
  }, []);

  useEffect(() => {
    audioRef.current.src = audioSrc;
    setCurrentTime(0);
    setDuration(0); // Reset duration when switching audio

    // Automatically play the audio if isPlaying is true
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    // When audio source changes, play/pause based on isPlaying
    return () => {
      audioRef.current.pause();  // Pause audio when changing sources
    };
  }, [audioSrc, isPlaying]); // Add isPlaying as a dependency

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSliderChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio || duration === 0) return; // Prevent setting time if duration is 0

    const [value] = newValue;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Skip back and forward functions
  const skipBack = () => {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <audio ref={audioRef} src={audioSrc} />
        <Button variant="outline" size="sm" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={handleSliderChange}
          className="w-full max-w-[100px]"
        />
        <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <audio ref={audioRef} src={audioSrc} />
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={skipBack}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={skipForward}>
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
      <div className="flex justify-between text-sm text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
