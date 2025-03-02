import React, { useState } from 'react';
import { Article } from '~/types';
import { Calendar, User, Image } from 'lucide-react';
import { formatDate } from '~/services/utilities';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageError, setImageError] = useState(false);

  // Generate a reliable fallback image URL based on the article category
  const getFallbackImage = () => {
    const category = article.category || 'news';
    return `https://source.unsplash.com/featured/?${category},news`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Article Image */}
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        {!imageError ? (
          <img
            src={article.urlToImage || getFallbackImage()}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center p-4">
              <Image size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">{article.source.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="p-4">
        {/* Source and Category */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {article.source.name}
          </span>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center mr-6">
            <User size={14} className="mr-1 flex-shrink-0" />
            <span>{article.author || 'Unknown'}</span>
          </div>
          <div className="flex items-center whitespace-nowrap">
            <Calendar size={14} className="mr-1" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>

        {/* Read More Link */}
        <div className="mt-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;