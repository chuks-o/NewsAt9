import React from "react";
import { AppInput } from "~/components/atoms/AppInput";
import { SearchFilters } from "~/types";

interface AppDateRangeFieldProps {
  filters: { dateFrom: string; dateTo: string };
  updateFilter: (filters: Partial<SearchFilters>) => void;
}

export const AppDateRangeField: React.FC<AppDateRangeFieldProps> = ({ filters, updateFilter }) => (
  <div className="flex flex-col sm:flex-row gap-2">
    <AppInput label="From" id="dateFrom" type="date" value={filters.dateFrom} onChange={(e) => updateFilter({ dateFrom: e.target.value })} />
    <AppInput label="To" id="dateTo" type="date" value={filters.dateTo} onChange={(e) => updateFilter({ dateTo: e.target.value })} />
  </div>
)