"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu, ChevronDown, Award } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
    const { user } = useKindeBrowserClient();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  

    return (
        <header className="w-full bg-transparent">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image src='/faithflow.png' width={40} height={40} alt='FaithFlow logo' className="w-10 h-10" />
                            <span className="text-2xl font-bold text-gray-900">FaithFlow</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <button 
                                className="flex items-center space-x-1 text-gray-600 hover:text-[#60c4ff] transition-colors duration-300"
                                onClick={toggleDropdown}
                            >
                                <span>Ontdekken</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <Link href="/gebeden" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gebeden</Link>
                                    <Link href="/meditaties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meditaties</Link>
                                    <Link href="/bijbelstudies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bijbelstudies</Link>
                                </div>
                            )}
                        </div>
                        {!user ? (
                            <Button className="bg-[#60c4ff] text-white hover:bg-blue-600 transition-colors duration-300 shadow-md">
                                <Link href="/api/auth/login">Nu aanmelden</Link>
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    {user.picture ? (
                                        <Image src={user.picture} width={32} height={32} alt="Profile" className="rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[#60c4ff] flex items-center justify-center">
                                            <span className="text-sm font-semibold text-white">
                                                {user.given_name?.[0]}
                                            </span>
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700">Welkom, {user.given_name}</span>
                                </div>
                               
                            </div>
                        )}
                    </div>
                </div>
            </nav>s
        </header>
    );
}

export default Header;