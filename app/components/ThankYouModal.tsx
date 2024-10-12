"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

export function ThankYouModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-blue-50 to-[#e0f3ff] rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-[#60c4ff] mb-4">
            Bedankt voor je upgrade!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <Sparkles className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-lg text-gray-700 mb-6">
            Welkom bij FaithFlow Premium! Geniet van onbeperkte toegang tot al onze gebeden en meditaties.
          </p>
          <Button 
            onClick={onClose}
            className="bg-[#60c4ff] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
          >
            Begin je reis
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}