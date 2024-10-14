"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, X } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
    const { user } = useKindeBrowserClient();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src='/faithflow.png' width={40} height={40} alt='SpiritSounds logo' className="w-10 h-10" />
                            <span className={`text-md font-bold ${isScrolled ? 'text-gray-900' : 'text-gray-800'}`}>SpiritSounds</span>
                        </Link>
                    </div>
                    {isMobile ? (
                       <button
                       onClick={toggleMobileMenu}
                       className={`${isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-gray-600 hover:text-blue-300'} transition-colors duration-300`}
                       aria-label="Toggle mobile menu"
                   >
                       {isMobileMenuOpen ? (
                           <X className={`${isScrolled ? 'text-gray-600' : 'text-white'} w-6 h-6`} />
                       ) : (
                           <Menu className={`${isScrolled ? 'text-gray-600' : 'text-gray-600'} w-6 h-6`} />
                       )}
                   </button>
                    ) : (
                        <div className="flex items-center space-x-6">
                            <div className="relative group">
                                <button
                                    className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-gray-500 hover:text-blue-300'} transition-colors duration-300`}
                                    onClick={toggleDropdown}
                                >
                                    <span>Ontdekken</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <Link href="/pages/gebeden" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Gebeden</Link>
                                        <Link href="/pages//meditaties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Meditaties</Link>
                                        <Link href="/bijbelstudies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Bijbelstudies</Link>
                                    </div>
                                )}
                            </div>
                            {!user ? (
                                <Button className="bg-[#009bf9] text-white hover:bg-blue-600 transition-colors duration-300 shadow-md">
                                    <Link href="/api/auth/login">Nu aanmelden</Link>
                                </Button>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        {user.picture ? (
                                            <Image src={user.picture} width={32} height={32} alt="Profile" className="rounded-full" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-white">
                                                    {user.given_name?.[0]}
                                                </span>
                                            </div>
                                        )}
                                        <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>Welkom, {user.given_name}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            {isMobile && isMobileMenuOpen && (
                <div className="bg-white shadow-md py-4 px-6 absolute top-20 left-0 right-0 z-40">
                    <div className="space-y-4">
                        <Link href="/gebeden" className="block text-gray-700 hover:text-blue-500 py-2">Gebeden</Link>
                        <Link href="/meditaties" className="block text-gray-700 hover:text-blue-500 py-2">Meditaties</Link>
                        <Link href="/bijbelstudies" className="block text-gray-700 hover:text-blue-500 py-2">Bijbelstudies</Link>
                        {!user ? (
                            <Button className="w-full bg-[#60c4ff] text-white hover:bg-blue-600 transition-colors duration-300 shadow-md">
                                <Link href="/api/auth/login">Nu aanmelden</Link>
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-3 py-2">
                                {user.picture ? (
                                    <Image src={user.picture} width={32} height={32} alt="Profile" className="rounded-full" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                        <span className="text-sm font-semibold text-white">
                                            {user.given_name?.[0]}
                                        </span>
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-700">Welkom, {user.given_name}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;