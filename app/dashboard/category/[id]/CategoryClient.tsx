"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from '@/app/components/audioPlayer';

// Define the types for Prayer based on your Prisma schema
interface Prayer {
  id: number;
  title: string;
  description: string | null;
  audioUrl: string;
  thumbnailUrl: string;
  duration: string;
}

// Define the props for CategoryClient
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {prayers.map((prayer) => (
          <div key={prayer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image src={prayer.thumbnailUrl} alt={prayer.title} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Button
                  onClick={() => handleAudioSelect(prayer.audioUrl)}
                  className="bg-[#60c4ff] text-white hover:bg-blue-500 transition shadow"
                >
                  {selectedAudio === prayer.audioUrl && isPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8" />
                  )}
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{prayer.title}</h3>
              <p className="text-gray-600 mb-4">{prayer.description}</p>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{prayer.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAudio && (
        <AudioPlayer audioSrc={selectedAudio} />
      )}
    </>
  );
}