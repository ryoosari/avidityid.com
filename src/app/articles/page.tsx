import { Metadata } from 'next';
import ArticleGrid from '@/components/sections/ArticleGrid';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles - Design Insights & Tutorials',
  description: 'Read our latest articles on design, development, business, and creative industry insights for professionals.',
  openGraph: {
    title: 'Articles - Design Insights & Tutorials',
    description: 'Read our latest articles on design, development, business, and creative industry insights for professionals.',
    url: '/articles',
  },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Articles
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and industry knowledge to help you grow your creative business
            and improve your design skills.
          </p>
        </div>

        <ArticleGrid articles={articles} />
      </div>
    </div>
  );
} 