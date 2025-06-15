import Link from 'next/link';
import { ArrowRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Mock featured articles data
const featuredArticles = [
  {
    slug: 'getting-started-with-design-systems',
    title: 'Getting Started with Design Systems',
    excerpt: 'Learn how to create and maintain consistent design systems for your projects.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    category: 'Design',
    reading_time: 8,
    featured_image: '/images/articles/design-systems.jpg',
  },
  {
    slug: 'modern-web-development-trends',
    title: 'Modern Web Development Trends in 2024',
    excerpt: 'Explore the latest trends and technologies shaping web development this year.',
    author: 'Mike Chen',
    date: '2024-01-12',
    category: 'Development',
    reading_time: 12,
    featured_image: '/images/articles/web-trends.jpg',
  },
  {
    slug: 'building-responsive-layouts',
    title: 'Building Responsive Layouts with CSS Grid',
    excerpt: 'Master CSS Grid to create flexible and responsive layouts for modern websites.',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    category: 'CSS',
    reading_time: 10,
    featured_image: '/images/articles/css-grid.jpg',
  },
];

export default function FeaturedArticles() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Stay updated with the latest insights, tutorials, and industry trends
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <article key={article.slug} className="flex flex-col items-start group">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-secondary-100 to-primary-100 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-700 text-center px-4">
                      {article.title}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 group-hover:ring-primary-500/50 transition-colors" />
              </div>
              <div className="max-w-xl flex-1 pt-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="inline-flex items-center rounded-md bg-secondary-50 px-2 py-1 text-xs font-medium text-secondary-700 ring-1 ring-inset ring-secondary-700/10">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-x-1 text-gray-500">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary-600 transition-colors">
                    <Link href={`/articles/${article.slug}`}>
                      <span className="absolute inset-0" />
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {article.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs text-gray-500">
                  <span>By {article.author}</span>
                  <span className="mx-2">•</span>
                  <span>{article.reading_time} min read</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-x-2 rounded-md bg-secondary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600 transition-colors"
          >
            Read All Articles
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
} 