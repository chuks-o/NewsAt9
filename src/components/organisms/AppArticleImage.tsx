import { Image } from 'lucide-react';
import React, { useState } from 'react'

interface AppArticleImageProps {
  category: string;
  urlToImage: string;
  title: string;
  source: { name: string };
}

export const AppArticleImage: React.FC<AppArticleImageProps> = ({ category, urlToImage, title, source }) => {
  const [imageError, setImageError] = useState(false);

  const getFallbackImage = () => {
    const articleCategory = category || 'news';
    return `https://source.unsplash.com/featured/?${articleCategory},news`;
  };

  return (
    <div className="h-48 overflow-hidden bg-gray-100 relative">
      {!imageError ? (
        <img
          src={urlToImage || getFallbackImage()}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-center p-4">
            <Image size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">{source.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
