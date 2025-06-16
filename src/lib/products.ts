import { readFileSync } from 'fs';
import { join } from 'path';
import { DigitalProduct } from '@/types';

const dataDirectory = join(process.cwd(), 'data');

export function getAllProducts(): DigitalProduct[] {
  try {
    const fullPath = join(dataDirectory, 'products.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export function getFeaturedProducts(): DigitalProduct[] {
  try {
    const fullPath = join(dataDirectory, 'featured-products.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading featured products:', error);
    return [];
  }
}

export function getProductById(id: string): DigitalProduct | null {
  const products = getAllProducts();
  return products.find(product => product.id === id) || null;
}

export function getProductsByCategory(category: string): DigitalProduct[] {
  const products = getAllProducts();
  return products.filter(product => product.category === category);
}

export function getProductsByTag(tag: string): DigitalProduct[] {
  const products = getAllProducts();
  return products.filter(product => product.tags.includes(tag));
}

export function getProductCategories(): string[] {
  try {
    const fullPath = join(dataDirectory, 'product-categories.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading product categories:', error);
    return [];
  }
}

export function getProductTags(): string[] {
  try {
    const fullPath = join(dataDirectory, 'product-tags.json');
    const fileContents = readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading product tags:', error);
    return [];
  }
} 