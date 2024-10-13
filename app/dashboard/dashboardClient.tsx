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
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <ThankYouModal isOpen={showThankYouModal} onClose={handleCloseThankYouModal} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredCategories.map((category, index) => {
          const Icon = getDynamicIcon(category.iconName) as React.FC<{ className?: string }>;
          const isLocked = !isPremium && index >= 3;

          return (
            <div
              key={category.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300",
                isLocked ? "cursor-not-allowed" : "cursor-pointer"
              )}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
                style={{
                  backgroundImage: `url(${category.imageUrl})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 to-purple-600/70 opacity-75 transition-opacity group-hover:opacity-80" />

              <div className="relative p-6 flex flex-col h-full justify-between z-10">
                <div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 inline-block mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-blue-50 text-sm mb-4">
                    {category.description || 'Geen beschrijving beschikbaar'}
                  </p>
                </div>
                {isLocked ? (
                  <div className="flex items-center justify-between">
                    <PremiumUpgradeModal />
                    <Lock className="h-5 w-5 text-white/75" />
                  </div>
                ) : (
                  <Link href={`/dashboard/category/${category.id}`} className="w-full">
                    <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-md group text-base py-2 font-semibold rounded-xl">
                      <span className="mr-2">Bekijk categorie</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                )}
              </div>
              {isLocked && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-md">
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
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Geen categorieën gevonden</h3>
          <p className="text-gray-500">Probeer een andere zoekterm of verken onze beschikbare categorieën.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;