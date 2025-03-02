import React from 'react';
import ArticleCard from './ArticleCard';
import { useNewsStore } from '../../store/useNewsStore';
import { AppLoader } from '~/components/atoms/AppLoader';
import { AppMessageBlock } from '~/components/molecules/AppMessageBlock';

const ArticleList: React.FC = () => {
  const { filteredArticles, isLoading, error } = useNewsStore();

  if (isLoading) return <AppLoader />

  if (error) {
    return <AppMessageBlock message={error} buttonText="Try Again" onChange={() => useNewsStore.getState().fetchArticles()} isError />
  }

  if (filteredArticles.length === 0) {
    const message = "No articles found matching your criteria";
    return <AppMessageBlock message={message} buttonText="Reset Filters" onChange={() => useNewsStore.getState().resetFilters()} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => <ArticleCard key={article.id} article={article} />)}
    </div>
  );
};

export default ArticleList;