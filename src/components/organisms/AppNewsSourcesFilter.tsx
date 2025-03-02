import React from 'react'
import { AppCheckbox } from '../molecules'
import { UserPreferences } from '~/types';

interface AppNewsSourcesFilterProps {
  userPreferences: UserPreferences;
  onChange: (id: string) => void;
}

export const AppNewsSourcesFilter: React.FC<AppNewsSourcesFilterProps> = ({ userPreferences, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">News Sources</h3>
      <div className="space-y-2">
        {userPreferences.sources.map((source) => (
          <AppCheckbox
            key={source.id}
            id={`source-${source.id}`}
            label={source.name}
            checked={source.enabled}
            onChange={() => onChange(source.id)}
          />
        ))}
      </div>
    </div>
  )
}
