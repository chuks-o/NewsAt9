import clsx from "clsx";
import { Article } from "~/types";

export function cn(...classes: unknown[]) {
  return clsx(classes);
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const normalizeArticle = (article: any, source: string): Article => {
  let normalizedArticle: Article;

  switch (source) {
    case 'newsapi':
      normalizedArticle = {
        id: article.url,
        title: article.title || 'No title',
        description: article.description || 'No description',
        content: article.content || '',
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: {
          id: 'newsapi',
          name: article.source?.name || 'News API',
        },
        author: article.author || 'Unknown',
        category: article.category || 'general',
      };
      break;
    case 'guardian':
      normalizedArticle = {
        id: article.id,
        title: article.webTitle || 'No title',
        description: article.fields?.trailText || 'No description',
        content: article.fields?.bodyText || '',
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail,
        publishedAt: article.webPublicationDate,
        source: {
          id: 'guardian',
          name: 'The Guardian',
        },
        author: article.fields?.byline || 'Unknown',
        category: article.sectionName || 'general',
      };
      break;
    case 'nyt':
      normalizedArticle = {
        id: article.uri || article._id || `nyt-${Date.now()}-${Math.random()}`,
        title: article.headline?.main || article.title || 'No title',
        description: article.abstract || article.snippet || 'No description',
        content: article.lead_paragraph || '',
        url: article.web_url || article.url,
        urlToImage: article.multimedia?.length
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "",
        publishedAt: article.pub_date || article.published_date,
        source: {
          id: 'nyt',
          name: 'The New York Times',
        },
        author: article.byline?.original || 'The New York Times',
        category: article.section_name?.toLowerCase() || article.section?.toLowerCase() || 'general',
      };
      break;
    default:
      normalizedArticle = {
        id: '',
        title: '',
        description: '',
        content: '',
        url: '',
        urlToImage: '',
        publishedAt: '',
        source: {
          id: '',
          name: '',
        },
        author: '',
        category: '',
      };
  }

  return normalizedArticle;
};
