import React, { useCallback, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNewsStore } from '../../store/useNewsStore';
import { AppSearchField } from '../molecules';
import { debounce } from '~/utils/debounce';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const { updateSearchFilters } = useNewsStore();
  const [searchValue, setSearchValue] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      updateSearchFilters({ keyword: value });
    }, 1000),
    [updateSearchFilters]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-xs">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">NewsAt9</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <AppSearchField
              autoComplete="off"
              placeholder="Search for news..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center  space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              C
            </div>
            <span className="md:block hidden">Chukwualasu</span>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <AppSearchField
            placeholder="Search for news..."
            autoComplete="off"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;