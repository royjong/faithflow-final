"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioSrc: string;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const [value] = newValue;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
        <Button variant="ghost" size="icon" onClick={() => audioRef.current?.currentTime && (audioRef.current.currentTime -= 10)}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => audioRef.current?.currentTime && (audioRef.current.currentTime += 10)}>
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