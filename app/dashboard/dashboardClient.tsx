"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { getDynamicIcon } from "@/utils/iconUtils";
import { PremiumUpgradeModal } from './upgradeModal';
import { ThankYouModal } from './ThankYouModal';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface Category {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string;
  iconName: string;
}

interface DashboardClientProps {
  initialCategories: Category[];
  isPremium: boolean;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ initialCategories, isPremium }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(initialCategories);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const paid = searchParams.get('paid');
    if (paid === 'true') {
      setShowConfetti(true);
      setShowThankYouModal(true);
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  useEffect(() => {
    const handleSearch = (e: CustomEvent<string>) => {
      setSearchTerm(e.detail);
    };

    window.addEventListener('searchChange', handleSearch as EventListener);
    return () => window.removeEventListener('searchChange', handleSearch as EventListener);
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
    setShowConfetti(false);
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <ThankYouModal isOpen={showThankYouModal} onClose={handleCloseThankYouModal} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCategories.map((category, index) => {
          const Icon = getDynamicIcon(category.iconName) as React.FC<{ className?: string }>;
          const isLocked = !isPremium && index >= 3;

          return (
            <div
              key={category.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl",
                isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#60c4ff] to-blue-600 opacity-40 transition-opacity group-hover:opacity-50" />
                <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-60" />
              </div>
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10">
                <div>
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 inline-block mb-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-blue-50 text-sm sm:text-base mb-4 line-clamp-3">
                    {category.description ? category.description : 'Geen beschrijving beschikbaar'}
                  </p>
                </div>
                {isLocked ? (
                  <div className="flex items-center justify-between">
                    <PremiumUpgradeModal />
                    <Lock className="h-5 w-5 text-white opacity-75" />
                  </div>
                ) : (
                  <Link href={`/dashboard/category/${category.id}`} className="w-full">
                    <Button className="w-full bg-white text-[#60c4ff] hover:bg-[#60c4ff] hover:text-white transition-all duration-300 shadow-md group text-sm sm:text-base py-2 sm:py-3 font-semibold rounded-xl border-2 border-white">
                      <span className="mr-2">Bekijk categorie</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </div>
              {isLocked && (
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-md">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Premium
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Geen categorieën gevonden</h3>
          <p className="text-gray-500 text-sm sm:text-base">Probeer een andere zoekterm of verken onze beschikbare categorieën.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;