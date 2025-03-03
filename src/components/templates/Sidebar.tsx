import React from 'react';
import { useNewsStore } from '../../store/useNewsStore';
import { X } from 'lucide-react';
import { AppOverlay } from '../atoms';
import { AppCategoriesFilter, AppNewsSourcesFilter } from '../organisms';
import { cn } from '~/utils/helpers';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { userPreferences, toggleSource, toggleCategory } = useNewsStore();

  return (
    <>
      {isOpen && <AppOverlay onClose={onClose} />}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-xs transform transition-transform duration-300 ease-in-out",
          "lg:left-0 lg:top-16.5 lg:bottom-0 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>

          <AppNewsSourcesFilter userPreferences={userPreferences} onChange={toggleSource} />
          <AppCategoriesFilter userPreferences={userPreferences} onChange={toggleCategory} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;