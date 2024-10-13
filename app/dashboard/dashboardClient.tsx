"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { getDynamicIcon } from "@/utils/iconUtils";
import { PremiumUpgradeModal } from '../components/upgradeModal';
import { ThankYouModal } from '../components/ThankYouModal';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';

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
    <div className="space-y-8 px-4 md:px-8">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <ThankYouModal isOpen={showThankYouModal} onClose={handleCloseThankYouModal} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredCategories.map((category, index) => {
          const Icon = getDynamicIcon(category.iconName) as React.FC<{ className?: string }>;
          const isLocked = !isPremium && index >= 3;

          return (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{ overflow: 'hidden' }}  // Make sure overflow is hidden on the container
            >
              {/* Use div with background-image instead of Image component for better control */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${category.imageUrl})`,
                  borderRadius: '1.5rem',
                }}
              ></div>

              <div className="absolute inset-0 bg-gradient-to-br from-[#60c4ff] to-blue-600 opacity-40 transition-opacity group-hover:opacity-50 rounded-3xl" />
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-80 rounded-3xl" />

              <div className="relative p-4 sm:p-6 md:p-8 flex flex-col h-full justify-between z-10">
                <div>
                  <div className="bg-white bg-opacity-40 rounded-full p-2 sm:p-3 inline-block mb-2 sm:mb-4">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">{category.name}</h3>
                  <p className="text-blue-50 text-sm sm:text-lg mb-4 sm:mb-6">
                    {category.description ? category.description : 'Geen beschrijving beschikbaar'}
                  </p>
                </div>
                {isLocked ? (
                  <div className="flex items-center justify-between">
                    <PremiumUpgradeModal />
                    <Lock className="h-5 sm:h-6 w-5 sm:w-6 text-white opacity-75" />
                  </div>
                ) : (
                  <Link href={`/dashboard/category/${category.id}`} className="w-full">
                    <Button className="w-full bg-white text-[#60c4ff] hover:bg-[#60c4ff] hover:text-white transition-all duration-300 shadow-md group text-base sm:text-lg py-4 sm:py-6 font-semibold rounded-xl border-2 border-white">
                      <span className="mr-1 sm:mr-2">Bekijk categorie</span>
                      <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </div>
              {isLocked && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-yellow-400 text-yellow-900 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center shadow-md">
                  <Sparkles className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
                  Premium
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">Geen categorieën gevonden</h3>
          <p className="text-gray-500">Probeer een andere zoekterm of verken onze beschikbare categorieën.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;
