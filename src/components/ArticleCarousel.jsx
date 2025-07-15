import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ArticleCarousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-xl shadow-lg bg-gray-800/80 backdrop-blur-sm p-6">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article, index) => (
            <div key={index} className="w-full flex-shrink-0 text-center">
              <h3 className="text-2xl font-bold text-blue-300 mb-3">{article.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{article.platform} | {article.date}</p>
              <p className="text-gray-300 mb-6">{article.summary}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center justify-center text-lg">
                Read Article <ChevronRight size={20} className="ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevArticle} className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-200 z-20" aria-label="Previous Article">
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button onClick={nextArticle} className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-200 z-20" aria-label="Next Article">
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  );
};
export default ArticleCarousel;