import React from 'react';
import { useNewsStore } from '../../store/useNewsStore';
import { X } from 'lucide-react';
import { AppOverlay } from '../atoms';
import { cn } from '~/services/utilities';
import { AppCategoriesFilter, AppNewsSourcesFilter } from '../organisms';

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
          "fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto",
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 h-full overflow-y-auto">
          {/* Close button (mobile only) */}
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