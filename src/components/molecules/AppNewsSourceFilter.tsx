import React from "react";
import { AppSelect } from "~/components/atoms/AppSelect";
import { FilterOption } from "~/types";

interface AppNewsSourceFilterProps {
  value: string;
  sources: FilterOption[];
  updateFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const AppNewsSourceFilter: React.FC<AppNewsSourceFilterProps> = ({ value, sources, updateFilter }) => (
  <AppSelect label="Source" id="source" value={value} options={sources} onChange={updateFilter} />
);
