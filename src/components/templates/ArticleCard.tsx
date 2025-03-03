import React from 'react';
import { Article } from '~/types';
import { AppArticleImage, AppMetaInformation } from '../organisms';
import { AppLink } from '../atoms';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <AppArticleImage category={article.category} urlToImage={article.urlToImage} title={article.title} source={article.source} />

    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
          {article.source.name}
        </span>
        <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
          {article.category}
        </span>
      </div>

      <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>

      <AppMetaInformation author={article.author} publishedAt={article.publishedAt} />

      <div className="mt-4">
        <AppLink href={article.url} className="text-blue-600 hover:text-blue-800 text-sm font-medium" isExternal>
          Read more →
        </AppLink>
      </div>
    </div>
  </div>
);

export default ArticleCard;