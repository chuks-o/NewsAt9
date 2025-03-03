import React from "react";
import { AppInput } from "~/components/atoms/AppInput";

interface AppDateRangeFieldProps {
  filters: { dateFrom: string; dateTo: string };
  updateFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AppDateRangeField: React.FC<AppDateRangeFieldProps> = ({ filters, updateFilter }) => (
  <div className="flex flex-col sm:flex-row gap-2">
    <AppInput label="From" name="dateFrom" id="dateFrom" type="date" value={filters.dateFrom} onChange={updateFilter} />
    <AppInput label="To" name="dateTo" id="dateTo" type="date" value={filters.dateTo} onChange={updateFilter} />
  </div>
)