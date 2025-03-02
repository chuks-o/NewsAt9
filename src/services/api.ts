import { Article } from '../types';
import { normalizeArticle } from './utilities';
import { createFetchClient } from './fetchClient';

// Function to fetch news from NewsAPI
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

    const response = await newsApiClient.get('/top-headlines', { params });
    return response.data.articles.map((article: any ) => normalizeArticle(article, 'newsapi'));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
};

// Function to fetch news from The Guardian
export const fetchGuardianArticles = async (
  keyword = '',
  section = '',
  from = '',
  to = ''
): Promise<Article[]> => {
  const guardianApiClient = createFetchClient({
    baseURL: 'https://content.guardianapis.com',
    params: {
      'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
    },
  });

  try {
    const params: Record<string, string> = {
      'show-fields': 'headline,trailText,byline,thumbnail,bodyText',
    };

    if (keyword) params.q = keyword;
    if (section && section !== 'all') params.section = section;
    if (from) params['from-date'] = from;
    if (to) params['to-date'] = to;

    const response = await guardianApiClient.get('/search', { params });
    return response.data.response.results.map((article: any) => normalizeArticle(article, 'guardian'));
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
  const nytApiClient = createFetchClient({
    baseURL: 'https://api.nytimes.com/svc',
    params: {
      'api-key': import.meta.env.VITE_NYT_API_KEY,
    },
  });

  try {
    const params: Record<string, string> = {};

    if (keyword) params.q = keyword;
    if (section && section !== 'all') params.fq = `section_name:${section}`;
    if (from) params.begin_date = from.replace(/-/g, '');
    if (to) params.end_date = to.replace(/-/g, '');

    const response = await nytApiClient.get('/search/v2/articlesearch.json', { params });
    console.log({response});
    
    return response.data.response.docs.map((article: any) => normalizeArticle(article, 'nyt'));
  } catch (error) {
    console.error('Error fetching from The New York Times:', error);
    return [];
  }
};

// Function to fetch news from all sources
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