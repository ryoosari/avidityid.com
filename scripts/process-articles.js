const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const readingTime = require('reading-time');

// Directories
const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');
const OUTPUT_DIR = path.join(process.cwd(), 'data');

// Ensure directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function processArticles() {
  console.log('🔄 Processing articles...');
  
  const articles = [];
  const categories = new Set();
  const tags = new Set();

  // Check if articles directory exists
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log('⚠️  Articles directory not found. Creating sample structure...');
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    
    // Create a sample article
    const sampleArticle = `---
title: "Welcome to Avidity Id"
excerpt: "Your hub for digital creativity and professional resources"
author: "Avidity Id Team"
date: "2024-01-15"
category: "News"
tags: ["welcome", "introduction", "getting-started"]
featured_image: "/images/articles/welcome.jpg"
seo_title: "Welcome to Avidity Id - Digital Resources Hub"
seo_description: "Discover premium digital downloads and insightful articles for creative professionals"
published: true
---

# Welcome to Avidity Id

Welcome to your new hub for digital creativity and professional resources. We're excited to share our collection of premium digital downloads and insightful articles designed to elevate your creative projects.

## What You'll Find Here

### Digital Downloads
- Premium templates and designs
- High-quality graphics and assets
- Professional fonts and typography
- Icon sets and illustrations
- Presets and plugins
- Educational courses

### Articles & Insights
- Design tutorials and tips
- Industry trends and news
- Business advice for creatives
- Product reviews and comparisons
- Behind-the-scenes content

## Getting Started

Browse our collection of digital products in the [Downloads](/downloads) section, or explore our latest articles for inspiration and learning opportunities.

Thank you for joining our community of creative professionals!`;

    fs.writeFileSync(path.join(ARTICLES_DIR, 'welcome-to-avidity-id.md'), sampleArticle);
    console.log('✅ Created sample article');
  }

  // Read all markdown files
  const files = fs.readdirSync(ARTICLES_DIR).filter(file => file.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  No markdown files found in articles directory');
    return;
  }

  files.forEach(file => {
    try {
      const filePath = path.join(ARTICLES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Generate slug from filename
      const slug = path.basename(file, '.md');

      // Calculate reading time
      const stats = readingTime(content);

      // Process the article
      const article = {
        slug,
        title: data.title || 'Untitled',
        excerpt: data.excerpt || extractExcerpt(content),
        content: marked(content),
        author: data.author || 'Anonymous',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        featured_image: data.featured_image || null,
        seo_title: data.seo_title || data.title,
        seo_description: data.seo_description || data.excerpt,
        reading_time: stats.minutes,
        published: data.published !== false
      };

      // Only include published articles
      if (article.published) {
        articles.push(article);
      }

      // Collect categories and tags
      categories.add(article.category);
      article.tags.forEach(tag => tags.add(tag));

      console.log(`✅ Processed: ${article.title}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  });

  // Sort articles by date (newest first)
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Write articles data
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'articles.json'),
    JSON.stringify(articles, null, 2)
  );

  // Write categories
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'article-categories.json'),
    JSON.stringify(Array.from(categories).sort(), null, 2)
  );

  // Write tags
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'article-tags.json'),
    JSON.stringify(Array.from(tags).sort(), null, 2)
  );

  console.log(`🎉 Processed ${articles.length} articles`);
  console.log(`📂 Found ${categories.size} categories`);
  console.log(`🏷️  Found ${tags.size} tags`);
}

function extractExcerpt(content, length = 160) {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/`(.*?)`/g, '$1') // Code
    .replace(/\n+/g, ' ') // Newlines
    .trim();

  if (plainText.length <= length) return plainText;
  return plainText.substring(0, length).trim() + '...';
}

// Run the processing
processArticles(); 