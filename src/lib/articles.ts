import { readFileSync } from 'fs';
import { join } from 'path';
import { Article } from '@/types';

const dataDirectory = join(process.cwd(), 'data');

export function getAllArticles(): Article[] {
  try {
    const fullPath = join(dataDirectory, 'articles.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

export function getFeaturedArticles(limit: number = 3): Article[] {
  const articles = getAllArticles();
  return articles
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles();
  return articles.find(article => article.slug === slug && article.published) || null;
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getAllArticles();
  return articles.filter(article => 
    article.category === category && article.published
  );
}

export function getArticlesByTag(tag: string): Article[] {
  const articles = getAllArticles();
  return articles.filter(article => 
    article.tags.includes(tag) && article.published
  );
}

export function getArticleCategories(): string[] {
  try {
    const fullPath = join(dataDirectory, 'article-categories.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading article categories:', error);
    return [];
  }
}

export function getArticleTags(): string[] {
  try {
    const fullPath = join(dataDirectory, 'article-tags.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading article tags:', error);
    return [];
  }
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