import React from "react";
import { AppSelect } from "~/components/atoms/AppSelect";
import { FilterOption } from "~/types";

interface AppCategoryFilterProps {
  value: string;
  categories: FilterOption[];
  updateFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const AppCategoryFilter: React.FC<AppCategoryFilterProps> = ({ value, categories, updateFilter }) => (
  <AppSelect label="Category" id="category" value={value} options={categories} onChange={updateFilter} />
);