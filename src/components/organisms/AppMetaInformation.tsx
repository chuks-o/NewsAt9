import { Calendar, User } from 'lucide-react';
import React from 'react'
import { formatDate } from '~/utils/helpers';

interface AppMetaInformationProps {
  author: string;
  publishedAt: string;
}

export const AppMetaInformation: React.FC<AppMetaInformationProps> = ({ author, publishedAt }) => {
  return (
    <div className="flex items-center justify-between text-xs text-gray-500">
      <div className="flex items-center mr-6">
        <User size={14} className="mr-1 flex-shrink-0" />
        <span>{author || 'Unknown'}</span>
      </div>
      <div className="flex items-center whitespace-nowrap">
        <Calendar size={14} className="mr-1" />
        <span>{formatDate(publishedAt)}</span>
      </div>
    </div>
  )
}
