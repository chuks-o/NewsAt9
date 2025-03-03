import React from "react";
import { AppInputLabel } from "./AppInputLabel";
import { FilterOption } from "~/types";

interface AppSelectProps {
  label: string;
  id: string;
  value: string;
  options: FilterOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const AppSelect: React.FC<AppSelectProps> = ({ label, id, value, options, onChange }) => (
  <div className="space-y-1">
    <AppInputLabel htmlFor={id}>{label}</AppInputLabel>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);