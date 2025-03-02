import React from "react";
import { AppInputLabel } from "./AppInputLabel";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppInput: React.FC<AppInputProps> = ({ label, id, type = "text", value, onChange, ...props }) => (
  <div className="space-y-1">
    <AppInputLabel htmlFor={id}>{label}</AppInputLabel>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      {...props}
    />
  </div>
);
