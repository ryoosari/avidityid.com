import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { Article } from '@/types/common';

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <article
          key={article.slug}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Featured Image */}
          {article.featured_image && (
            <div className="aspect-w-16 aspect-h-9">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              <Link
                href={`/articles/${article.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {article.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center text-xs text-gray-500 space-x-4">
              <div className="flex items-center">
                <UserIcon className="h-3 w-3 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {formatDate(article.date)}
              </div>
              {article.reading_time && (
                <div className="flex items-center">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {article.reading_time} min
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      +{article.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
} 