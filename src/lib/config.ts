import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Avidity Id',
  description: 'Modern digital downloads and insightful articles for creative professionals',
  url: 'https://avidityid.com',
  links: {
    twitter: 'https://twitter.com/avidityid',
    github: 'https://github.com/avidityid',
    instagram: 'https://instagram.com/avidityid',
  },
  author: {
    name: 'Avidity Id Team',
    email: 'hello@avidityid.com',
    avatar: '/images/avatar.jpg',
  },
};

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const footerNavigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Articles', href: '/articles' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'License', href: '/license' },
  ],
  social: [
    {
      name: 'Twitter',
      href: siteConfig.links.twitter,
      icon: 'twitter',
    },
    {
      name: 'GitHub',
      href: siteConfig.links.github,
      icon: 'github',
    },
    {
      name: 'Instagram',
      href: siteConfig.links.instagram,
      icon: 'instagram',
    },
  ],
};

export const defaultSEO = {
  title: siteConfig.name,
  description: siteConfig.description,
  canonical: siteConfig.url,
  image: `${siteConfig.url}/images/og-image.jpg`,
  type: 'website' as const,
};

export const articlesPerPage = 12;
export const productsPerPage = 9;
export const relatedArticlesCount = 3;
export const featuredProductsCount = 6;

export const stripe = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
};

export const paypal = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  sandbox: process.env.NODE_ENV !== 'production',
};

export const email = {
  from: process.env.EMAIL_FROM || siteConfig.author.email,
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
};

export const analytics = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || '',
};

export const productCategories = [
  'Templates',
  'Graphics',
  'Fonts',
  'Icons',
  'Presets',
  'Mockups',
  'Plugins',
  'Courses',
];

export const articleCategories = [
  'Design',
  'Development',
  'Business',
  'Marketing',
  'Productivity',
  'Tutorials',
  'Reviews',
  'News',
];

export const licenses = {
  'single-use': {
    type: 'single-use',
    description: 'Use for one project only',
    restrictions: ['Cannot be redistributed', 'One project use only'],
    permissions: ['Personal use', 'Commercial use for single project'],
  },
  'multiple-use': {
    type: 'multiple-use',
    description: 'Use for unlimited personal and commercial projects',
    restrictions: ['Cannot be redistributed', 'Cannot be resold'],
    permissions: ['Personal use', 'Commercial use', 'Client work'],
  },
  'commercial': {
    type: 'commercial',
    description: 'Full commercial license with redistribution rights',
    restrictions: ['Must maintain attribution'],
    permissions: ['Personal use', 'Commercial use', 'Resale', 'Redistribution'],
  },
} as const; 