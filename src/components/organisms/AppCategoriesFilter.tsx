import React from 'react'
import { UserPreferences } from '~/types';
import { AppCheckbox } from '../molecules';

interface AppNewsSourcesFilterProps {
  userPreferences: UserPreferences;
  onChange: (id: string) => void;
}

export const AppCategoriesFilter: React.FC<AppNewsSourcesFilterProps> = ({ userPreferences, onChange }) => {
  return (
    <div className="mb-6" >
      <h3 className="text-lg font-semibold mb-2">Categories</h3>
      <div className="space-y-2">
        {userPreferences.categories.map((category) => (
          <AppCheckbox
            key={category.id}
            id={`category-${category.id}`}
            label={category.name}
            checked={category.enabled}
            onChange={() => onChange(category.id)}
          />
        ))}
      </div>
    </div>
  )
}
