import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { getDynamicIcon } from '@/utils/iconUtils';
import prisma from '@/app/lib/db';
import CategoryClient from './CategoryClient';
import { ArrowLeft } from 'lucide-react';

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id);
  
  if (isNaN(categoryId)) {
    notFound();
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { prayers: true }
  });

  if (!category) {
    notFound();
  }

  const Icon = getDynamicIcon(category.iconName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <Link href="/dashboard" className="inline-block mb-6">
        <Button
          variant="ghost"
          className="text-[#60c4ff] hover:text-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug naar Dashboard
        </Button>
      </Link>

      <div className="relative overflow-hidden rounded-3xl shadow-lg mb-8 sm:mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#60c4ff] to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-black opacity-50" />
        <Image 
          src={category.imageUrl} 
          alt={category.name} 
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0"
        />
        <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col sm:flex-row items-center">
          <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4 sm:mb-0 sm:mr-6">
            <Icon className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-lg sm:text-xl text-blue-100">{category.description}</p>
          </div>
        </div>
      </div>

      <CategoryClient category={category} prayers={category.prayers} />
    </div>
  );
}