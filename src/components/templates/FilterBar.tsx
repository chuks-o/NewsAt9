import React from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import { AppFilterControls } from '~/components/organisms';
import { AppButton } from '~/components/atoms';
import { useFilters } from '~/hooks/useFilters';

const FilterBar: React.FC = () => {
  const { handleFilterChange, handleResetFilters, localFilters, categoryOptions, sourceOptions } = useFilters()

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <div className="flex items-center mb-4 pb-3 border-b border-gray-200">
        <Filter size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="flex flex-wrap gap-4 items-end">
        <AppFilterControls
          filters={localFilters}
          updateFilter={handleFilterChange}
          categories={categoryOptions}
          sources={sourceOptions}
        />
        <AppButton onClick={handleResetFilters} className="mt-4 px-4" variant="primary" size="md">
          <RefreshCw size={16} className="mr-2" /> Reset
        </AppButton>
      </div>
    </div>
  );
};

export default FilterBar;