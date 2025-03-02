import React, { InputHTMLAttributes } from 'react'
import { AppInput, AppInputLabel } from '../atoms'

interface AppCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AppCheckbox: React.FC<AppCheckboxProps> = ({ id, label, onChange, ...props }) => {
  return (
    <div className="flex items-center space-x-2 -space-y-0.5 cursor-pointer">
      <AppInput
        type="checkbox"
        id={id}
        value=""
        checked={props.checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <AppInputLabel htmlFor={id}>{label}</AppInputLabel>
    </div>
  )
}
