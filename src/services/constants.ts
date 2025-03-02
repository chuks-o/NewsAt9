import { NewsCategory, NewsSource, SearchFilters } from "~/types";

export const initialSources: NewsSource[] = [
  { id: 'newsapi', name: 'News API', enabled: true },
  { id: 'guardian', name: 'The Guardian', enabled: true },
  { id: 'nyt', name: 'The New York Times', enabled: true },
];

export const initialCategories: NewsCategory[] = [
  { id: 'general', name: 'General', enabled: true },
  { id: 'business', name: 'Business', enabled: true },
  { id: 'technology', name: 'Technology', enabled: true },
  { id: 'entertainment', name: 'Entertainment', enabled: true },
  { id: 'health', name: 'Health', enabled: true },
  { id: 'science', name: 'Science', enabled: true },
  { id: 'sports', name: 'Sports', enabled: true },
];

export const initialSearchFilters: SearchFilters = {
  keyword: '',
  dateFrom: '',
  dateTo: '',
  category: '',
  source: '',
};