import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "Getting Started with ID Card Design",
      excerpt: "Learn the basics of creating professional ID cards with our comprehensive guide.",
      slug: "getting-started-id-card-design",
      publishedAt: "2024-01-15",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Best Practices for Card Security",
      excerpt: "Discover essential security features to implement in your ID card systems.",
      slug: "best-practices-card-security",
      publishedAt: "2024-01-10",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Software Integration Tips",
      excerpt: "How to seamlessly integrate our software solutions into your existing workflow.",
      slug: "software-integration-tips",
      publishedAt: "2024-01-05",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest tips, guides, and industry insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link href={`/articles/${article.slug}`} className="hover:text-blue-600 transition-colors">
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <Link 
                  href={`/articles/${article.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/articles">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}