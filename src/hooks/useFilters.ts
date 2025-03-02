import { useState } from "react";
import { SearchFilters } from "~/types";

export function useFilters(initialFilters: SearchFilters) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, updateFilter, resetFilters };
}
