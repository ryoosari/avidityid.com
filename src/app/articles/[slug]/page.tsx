import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '@/services/dataService';
import { marked } from 'marked';
import ReadingProgress from './ReadingProgress';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

type TOCItem = { level: 2 | 3; text: string; id: string };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function parseTOC(html: string): TOCItem[] {
  const items: TOCItem[] = [];
  const seen = new Map<string, number>();
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3;
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    let id = slugifyHeading(text);
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    items.push({ level, text, id });
  }
  return items;
}

function injectHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_match, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slugifyHeading(text);
    const count = seen.get(id) || 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.featured_image ? [article.featured_image] : [],
      url: `/articles/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug);
  const rawHtml = marked(article.content) as string;
  const contentHtml = injectHeadingIds(rawHtml);
  const tocItems = parseTOC(rawHtml);
  const hasTOC = tocItems.length >= 3;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    publisher: {
      '@type': 'Organization',
      name: 'Avidity Id',
      url: 'https://avidityid.com',
    },
    ...(article.featured_image && { image: `https://avidityid.com${article.featured_image}` }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Link */}
          <Link
            href="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 text-sm font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>

          {/* Article header — full width */}
          <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 overflow-hidden">
            {article.featured_image && (
              <div className="relative h-64 sm:h-80">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            <div className="px-8 pt-8 pb-6">
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {article.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-1.5" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1.5" />
                  {formatDate(article.date)}
                </div>
                {article.reading_time && (
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1.5" />
                    {article.reading_time} min read
                  </div>
                )}
              </div>
              <p className="text-lg text-gray-600 border-t border-gray-100 pt-6">
                {article.excerpt}
              </p>
            </div>
          </div>

          {/* Two-column body: content + TOC sidebar */}
          <div className={`bg-white border border-gray-200 rounded-b-lg shadow-sm ${hasTOC ? 'lg:grid lg:grid-cols-[1fr_260px]' : ''}`}>
            {/* Article content */}
            <div className="px-8 py-8 min-w-0">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-semibold prose-headings:text-gray-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-6
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:scroll-mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
                  prose-strong:text-gray-900
                  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold prose-td:align-top
                  prose-ul:space-y-1 prose-ol:space-y-1
                  prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* TOC Sidebar — desktop only, when article has 3+ sections */}
            {hasTOC && (
              <aside className="hidden lg:block border-l border-gray-100">
                <div className="sticky top-8 px-6 py-8">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    On this page
                  </p>
                  <nav className="space-y-0.5">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-1 text-sm leading-snug text-gray-500 hover:text-blue-600 transition-colors ${
                          item.level === 3 ? 'pl-4 text-xs text-gray-400 hover:text-blue-500' : 'font-medium'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <article
                    key={relatedArticle.slug}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    {relatedArticle.featured_image && (
                      <div className="relative h-40">
                        <Image
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                        {relatedArticle.category}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                        <Link
                          href={`/articles/${relatedArticle.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {relatedArticle.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
