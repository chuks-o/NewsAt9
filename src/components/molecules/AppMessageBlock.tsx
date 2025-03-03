import React from 'react'
import { AppButton } from '../atoms'
import { cn } from '~/utils/helpers';

interface AppMessageBlockProps {
  message: string;
  buttonText: string;
  isError?: boolean;
  onChange: () => void;
}

export const AppMessageBlock: React.FC<AppMessageBlockProps> = ({ message, buttonText, onChange, isError }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <p className={cn("mb-2", isError ? "text-red-600" : "text-black")}>{message}</p>
      <AppButton onClick={onChange} variant="primary" size="md">
        {buttonText}
      </AppButton>
    </div>
  )
}
