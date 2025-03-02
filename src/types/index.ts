export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  category: string;
}

export interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  enabled: boolean;
}

export interface NewsAuthor {
  id: string;
  name: string;
  enabled: boolean;
}

export interface UserPreferences {
  sources: NewsSource[];
  categories: NewsCategory[];
  authors: NewsAuthor[];
}

export interface SearchFilters {
  keyword: string;
  dateFrom: string;
  dateTo: string;
  category: string;
  source: string;
}