"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Home, BookOpen, Calendar, Settings, ChevronRight, Menu, LogOut } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { PremiumUpgradeModal } from './upgradeModal';
import UpgradeButton from './upgradeButton';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useKindeBrowserClient();

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/prayers", icon: BookOpen, label: "Gebeden" },
    { href: "/dashboard/calendar", icon: Calendar, label: "Kalender" },
    { href: "/dashboard/settings", icon: Settings, label: "Instellingen" },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6 text-[#60c4ff]" />
      </button>
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition duration-300 ease-in-out lg:flex lg:flex-col lg:justify-between z-30`}>
        <div className="w-72 bg-white dark:bg-gray-900 h-full border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-xl">
          <div className="flex items-center gap-3 justify-center h-24">
            <Image src='/faithflow.png' width={50} height={50} alt='FaithFlow' /> 
            <h1 className="text-3xl font-bold text-[#60c4ff]">FaithFlow</h1>
          </div>
          <nav className="flex-1 overflow-y-auto pt-6">
            <ul className="px-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-[#60c4ff]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-[#60c4ff]' : 'text-gray-500'}`} />
                      <span className="ml-3 flex-1 font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className='flex flex-col w-full p-6 space-y-4 border-t border-gray-200 dark:border-gray-800'>
            <PremiumUpgradeModal />
            {user && (
              <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                <div className="flex items-center">
                  {user.picture ? (
                    <Image src={user.picture} alt="Profile" width={40} height={40} className="rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#60c4ff] flex items-center justify-center">
                      <span className="text-xl font-semibold text-white">
                        {user.given_name?.[0]}
                      </span>
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.given_name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button
                  
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              
              </div>
          
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;