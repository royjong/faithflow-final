"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from '@/app/components/audioPlayer';

interface Prayer {
  id: number;
  title: string;
  description: string | null;
  audioUrl: string;
  thumbnailUrl: string;
  duration: string;
}

interface CategoryClientProps {
  category: {
    id: number;
    name: string;
    description: string | null;
    iconName: string;
    imageUrl: string;
  };
  prayers: Prayer[];
}

export default function CategoryClient({ category, prayers }: CategoryClientProps) {
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleAudioSelect = (audio: string) => {
    setSelectedAudio(audio);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {prayers.map((prayer) => (
          <div key={prayer.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="relative h-48 sm:h-56">
              <Image src={prayer.thumbnailUrl} alt={prayer.title} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button
                  onClick={() => handleAudioSelect(prayer.audioUrl)}
                  className="bg-[#60c4ff] text-white hover:bg-blue-500 transition shadow"
                >
                  {selectedAudio === prayer.audioUrl && isPlaying ? (
                    <Pause className="h-6 w-6 sm:h-8 sm:w-8" />
                  ) : (
                    <Play className="h-6 w-6 sm:h-8 sm:w-8" />
                  )}
                </Button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{prayer.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{prayer.description}</p>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{prayer.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
          <AudioPlayer audioSrc={selectedAudio} isPlaying={isPlaying} onTogglePlayPause={togglePlayPause} />
        </div>
      )}
    </>
  );
}