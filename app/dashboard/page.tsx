import prisma from '../lib/db';
import { PremiumUpgradeModal } from '../components/upgradeModal';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import SearchBar from '../components/searchBar';
import DashboardClient from './dashboardClient';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  const categories = await prisma.category.findMany();

  const formattedCategories = categories.map((category) => ({
    ...category,
    id: category.id.toString(),
  }));

  let isPremium = false;
  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { isPremium: true },
    });
    isPremium = dbUser?.isPremium ?? false;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welkom bij SpiritSounds{user?.given_name ? `, ${user.given_name}` : ''}
          </h1>
          <p className="text-md text-gray-400">Versterk je gebed, verdiep je geloof</p>
        </div>
      </div>

      <SearchBar />
      
      <DashboardClient initialCategories={formattedCategories} isPremium={isPremium} />

      {!isPremium && (
        <div className="text-center bg-gradient-to-br from-[#60c4ff] to-blue-600 rounded-3xl shadow-xl p-10 text-white mt-12">
          <h2 className="text-4xl font-bold mb-4">Upgrade naar Premium</h2>
          <p className="text-xl text-blue-100 mb-8">Ontgrendel alle categorieën en verrijk je spirituele reis.</p>
          <PremiumUpgradeModal />
        </div>
      )}
    </div>
  );
}