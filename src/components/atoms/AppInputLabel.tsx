import React from 'react'

interface FilterLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const AppInputLabel: React.FC<FilterLabelProps> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);
