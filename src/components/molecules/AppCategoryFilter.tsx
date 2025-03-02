import React from "react";
import { AppSelect } from "~/components/atoms/AppSelect";

interface AppCategoryFilterProps {
  value: string;
  categories: { id: string; name: string; enabled: boolean }[];
  updateFilter: (value: string) => void;
}

export const AppCategoryFilter: React.FC<AppCategoryFilterProps> = ({ value, categories, updateFilter }) => (
  <AppSelect label="Category" id="category" value={value} options={categories.filter((c) => c.enabled)} onChange={(e) => updateFilter(e.target.value)} />
);