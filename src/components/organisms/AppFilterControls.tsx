import React from "react";
import { AppCategoryFilter, AppDateRangeField, AppNewsSourceFilter } from "~/components/molecules"
import { SearchFilters, UserPreferences } from "~/types";

interface AppFilterControlsProps {
  filters: SearchFilters;
  userPreferences: UserPreferences;
  updateFilter: (filters: Partial<SearchFilters>) => void
}

export const AppFilterControls: React.FC<AppFilterControlsProps> = ({ filters, updateFilter, userPreferences }) => (
  <div className="flex flex-wrap gap-4">
    <AppDateRangeField filters={filters} updateFilter={updateFilter} />
    <AppCategoryFilter value={filters.category} categories={userPreferences.categories} updateFilter={(value) => updateFilter({ category: value })} />
    <AppNewsSourceFilter value={filters.source} sources={userPreferences.sources} updateFilter={(value) => updateFilter({ source: value })} />
  </div>
);
