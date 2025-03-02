import React, { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'
import { AppInput } from '../atoms'

interface AppSearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppSearchField: React.FC<AppSearchFieldProps> = ({ value, onChange, ...props }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <AppInput
        id="search"
        type="search"
        className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
