import { readFileSync } from 'fs';
import { join } from 'path';
import { Article, DigitalProduct } from '@/types/common';

const dataDirectory = join(process.cwd(), 'data');

function readJsonFile<T>(filename: string): T[] {
  try {
    const fullPath = join(dataDirectory, filename);
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
}

// Article services
export function getAllArticles(): Article[] {
  return readJsonFile<Article>('articles.json');
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug && article.published) || null;
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  const articles = getAllArticles();
  return articles
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getAllArticles();
  return articles.filter(article => 
    article.category === category && article.published
  );
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return [];

  const allArticles = getAllArticles();
  return allArticles
    .filter(article => 
      article.slug !== currentSlug && 
      article.published &&
      (article.category === currentArticle.category || 
       article.tags.some(tag => currentArticle.tags.includes(tag)))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getArticleCategories(): string[] {
  return readJsonFile<string>('article-categories.json');
}

export function getArticleTags(): string[] {
  return readJsonFile<string>('article-tags.json');
}

// Product services
export function getAllProducts(): DigitalProduct[] {
  return readJsonFile<DigitalProduct>('products.json');
}

export function getProductById(id: string): DigitalProduct | null {
  const products = getAllProducts();
  return products.find(product => product.id === id) || null;
}

export function getFeaturedProducts(): DigitalProduct[] {
  return readJsonFile<DigitalProduct>('featured-products.json');
}

export function getProductsByCategory(category: string): DigitalProduct[] {
  const products = getAllProducts();
  return products.filter(product => product.category === category);
}

export function getProductCategories(): string[] {
  return readJsonFile<string>('product-categories.json');
}

export function getProductTags(): string[] {
  return readJsonFile<string>('product-tags.json');
}