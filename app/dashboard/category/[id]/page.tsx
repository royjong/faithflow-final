import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDynamicIcon } from '@/utils/iconUtils';
import prisma from '@/app/lib/db';
import CategoryClient from './CategoryClient';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <Link href="/dashboard" className="inline-block mb-4 sm:mb-6">
        <button
          className="text-[#60c4ff] hover:text-blue-700 transition-colors duration-200 text-sm sm:text-base flex items-center"
        >
          <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Terug naar Dashboard
        </button>
      </Link>
      
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg mb-6 sm:mb-8 lg:mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#60c4ff] to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-black opacity-50" />
        <Image
           src={category.imageUrl}
           alt={category.name}
           layout="fill"
           objectFit="cover"
           className="absolute inset-0"
        />
        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col sm:flex-row items-center">
          <div className="bg-white bg-opacity-20 rounded-full p-3 sm:p-4 mb-3 sm:mb-0 sm:mr-4 md:mr-6">
            <Icon className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100">
              {category.description}
            </p>
          </div>
        </div>
      </div>
      
      <CategoryClient category={category} prayers={category.prayers} />
    </div>
  );
}