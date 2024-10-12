"use client";
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Dispatch a custom event with the new search term
    const searchEvent = new CustomEvent('searchChange', { detail: newSearchTerm });
    window.dispatchEvent(searchEvent);
  };

  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Zoek categorieën..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#60c4ff] focus:border-transparent"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
