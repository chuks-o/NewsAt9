export interface NewsApiArticle {
  source?: {
    id?: string;
    name?: string;
  };
  author?: string;
  title?: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
  category?: string;
}

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName?: string;
  fields?: {
    headline?: string;
    trailText?: string;
    byline?: string;
    thumbnail?: string;
    bodyText?: string;
  };
}

export interface NYTArticle {
  uri?: string;
  _id?: string;
  headline?: {
    main?: string;
  };
  title?: string;
  abstract?: string;
  snippet?: string;
  lead_paragraph?: string;
  web_url?: string;
  url?: string;
  multimedia?: Array<{
    url: string;
  }>;
  pub_date?: string;
  published_date?: string;
  byline?: {
    original?: string;
  };
  section_name?: string;
  section?: string;
}

export interface GuardianResponse {
  response: {
    results: GuardianArticle[];
  };
}

export interface NewsApiResponse {
  articles: NewsApiArticle[];
}

export interface NYTResponse {
  response: {
    docs: NYTArticle[];
  };
}

export interface NYTSectionResponse {
  results: Array<{
    section: string;
  }>;
}

export interface GuardianSectionResponse {
  response: {
    results: Array<{
      id: string;
    }>;
  };
}
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

export interface FilterOption {
  value: string;
  label: string;
}
