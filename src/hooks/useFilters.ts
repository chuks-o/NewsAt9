import { ChangeEvent, useState } from "react";
import { useNewsStore } from "~/store/useNewsStore";

export function useFilters() {
  const { searchFilters, userPreferences, resetFilters, filterArticlesLocally } = useNewsStore();
  const [localFilters, setLocalFilters] = useState({
    keyword: searchFilters.keyword,
    dateFrom: searchFilters.dateFrom,
    dateTo: searchFilters.dateTo,
    category: searchFilters.category,
    source: searchFilters.source
  });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...userPreferences.categories
      .filter(category => category.enabled)
      .map(category => ({
        value: category.id,
        label: category.name
      }))
  ];

  const sourceOptions = [
    { value: '', label: 'All Sources' },
    ...userPreferences.sources
      .filter(source => source.enabled)
      .map(source => ({
        value: source.id,
        label: source.name
      }))
  ];

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [id]: value
    }));

    filterArticlesLocally({
      ...searchFilters,
      [id]: value
    });
  };

  const handleResetFilters = () => {
    setLocalFilters({
      keyword: "",
      dateFrom: '',
      dateTo: '',
      category: '',
      source: ''
    });

    resetFilters();
  };

  return {handleFilterChange, handleResetFilters, localFilters, categoryOptions, sourceOptions};
}
