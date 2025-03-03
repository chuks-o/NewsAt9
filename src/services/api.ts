import { Article, GuardianResponse, GuardianSectionResponse, NewsApiResponse, NYTResponse, NYTSectionResponse } from '../types';
import { normalizeArticle } from '../utils/helpers';
import { createFetchClient } from './fetchClient';

const nytApiClient = createFetchClient({
  baseURL: 'https://api.nytimes.com/svc',
  params: {
    'api-key': import.meta.env.VITE_NYT_API_KEY,
  },
});

const guardianApiClient = createFetchClient({
  baseURL: 'https://content.guardianapis.com',
  params: {
    'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
  },
});

export const fetchAvailableCategories = async (): Promise<string[]> => {
  try {
    const newsApiCategories = [
      'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
    ];

    let guardianSections: string[] = [];
    try {
      const response = await guardianApiClient.get<GuardianSectionResponse>('/sections');
      guardianSections = response.data.response.results.map((section) =>
        section.id.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching Guardian sections:', error);
    }

    let nytSections: string[] = [];
    try {
      const response = await nytApiClient.get<NYTSectionResponse>('/news/v3/content/section-list.json');
      nytSections = response.data.results.map((section) =>
        section.section.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching NYT sections:', error);
      return []
    }

    const allCategories = [...new Set([
      ...newsApiCategories,
      ...guardianSections,
      ...nytSections
    ])].sort();

    return allCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchNewsApiArticles = async (
  keyword = '',
  category = '',
  from = '',
  to = '',
  sources = ''
): Promise<Article[]> => {
  const newsApiClient = createFetchClient({
    baseURL: 'https://newsapi.org/v2',
    params: {
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
    },
  });

  try {
    const params: Record<string, string> = {
      language: 'en',
    };

    if (keyword) params.q = keyword;
    if (category && category !== 'all') params.category = category;
    if (from) params.from = from;
    if (to) params.to = to;
    if (sources) params.sources = sources;

    const response = await newsApiClient.get<NewsApiResponse>('/top-headlines', { params });
    return response.data.articles.map((article) => normalizeArticle(article, 'newsapi'));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};

export const fetchGuardianArticles = async (
  keyword = '',
  section = '',
  from = '',
  to = ''
): Promise<Article[]> => {
  try {
    const params: Record<string, string> = {
      'show-fields': 'headline,trailText,byline,thumbnail,bodyText',
    };

    if (keyword) params.q = keyword;
    if (section && section !== 'all') params.section = section;
    if (from) params['from-date'] = from;
    if (to) params['to-date'] = to;

    const response = await guardianApiClient.get<GuardianResponse>('/search', { params });
    return response.data.response.results.map((article) => normalizeArticle(article, 'guardian'));
  } catch (error) {
    console.error('Error fetching from The Guardian:', error);
    return [];
  }
};

export const fetchNYTArticles = async (
  keyword = '',
  section = '',
  from = '',
  to = ''
): Promise<Article[]> => {
  try {
    const params: Record<string, string> = {};

    if (keyword) params.q = keyword;
    if (section && section !== 'all') params.fq = `section_name:${section}`;
    if (from) params.begin_date = from.replace(/-/g, '');
    if (to) params.end_date = to.replace(/-/g, '');

    const response = await nytApiClient.get<NYTResponse>('/search/v2/articlesearch.json', { params });
    return response.data.response.docs.map((article) => normalizeArticle(article, 'nyt'));
  } catch (error) {
    console.error('Error fetching from The New York Times:', error);
    return [];
  }
};

export const fetchAllNews = async (
  keyword = '',
  category = '',
  from = '',
  to = '',
  sources: string[] = []
): Promise<Article[]> => {
  try {
    const newsApiPromise = sources.includes('newsapi')
      ? fetchNewsApiArticles(keyword, category, from, to)
      : Promise.resolve([]);

    const guardianPromise = sources.includes('guardian')
      ? fetchGuardianArticles(keyword, category, from, to)
      : Promise.resolve([]);

    const nytPromise = sources.includes('nyt')
      ? fetchNYTArticles(keyword, category, from, to)
      : Promise.resolve([]);

    const [newsApiArticles, guardianArticles, NYTArticles] = await Promise.all([
      newsApiPromise,
      guardianPromise,
      nytPromise,
    ]);

    return [...newsApiArticles, ...guardianArticles, ...NYTArticles];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};