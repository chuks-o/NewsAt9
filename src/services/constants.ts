import { NewsSource, SearchFilters } from "~/types";

export const initialSources: NewsSource[] = [
  { id: 'newsapi', name: 'News API', enabled: true },
  { id: 'guardian', name: 'The Guardian', enabled: true },
  { id: 'nyt', name: 'The New York Times', enabled: true },
];

export const initialSearchFilters: SearchFilters = {
  keyword: '',
  dateFrom: '',
  dateTo: '',
  category: '',
  source: '',
};