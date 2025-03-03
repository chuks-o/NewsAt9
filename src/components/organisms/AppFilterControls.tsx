import React from "react";
import { AppCategoryFilter, AppDateRangeField, AppNewsSourceFilter } from "~/components/molecules"
import { FilterOption, SearchFilters } from "~/types";

interface AppFilterControlsProps {
  filters: SearchFilters;
  updateFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  categories: FilterOption[]
  sources: FilterOption[]
}

export const AppFilterControls: React.FC<AppFilterControlsProps> = ({ categories, filters, updateFilter, sources }) => (
  <div className="flex flex-wrap gap-4">
    <AppDateRangeField filters={filters} updateFilter={updateFilter} />
    <AppCategoryFilter value={filters.category} categories={categories} updateFilter={updateFilter} />
    <AppNewsSourceFilter value={filters.source} sources={sources} updateFilter={updateFilter} />
  </div>
);
