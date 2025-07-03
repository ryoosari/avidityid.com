export const SITE_CONFIG = {
  name: 'Avidity Id',
  description: 'Your Digital Office Solution - Premium software, digital resources, and professional office supplies for modern businesses',
  url: 'https://avidityid.com',
  author: {
    name: 'Avidity Id Team',
    email: 'hello@avidityid.com',
  },
  social: {
    twitter: 'https://twitter.com/avidityid',
    github: 'https://github.com/avidityid',
    instagram: 'https://instagram.com/avidityid',
  },
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'About', href: '/about' },
] as const;

export const FOOTER_LINKS = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Articles', href: '/articles' },
    { name: 'Downloads', href: '/downloads' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'License', href: '/license' },
  ],
} as const;

export const LICENSE_TYPES = {
  'single-use': {
    description: 'Licensed for single device/installation',
    restrictions: ['Cannot be redistributed', 'Single device installation only'],
    permissions: ['Personal use', 'Commercial use on licensed device'],
  },
  'multiple-use': {
    description: 'Use for unlimited personal and commercial projects',
    restrictions: ['Cannot be redistributed', 'Cannot be resold'],
    permissions: ['Personal use', 'Commercial use', 'Client work'],
  },
  'commercial': {
    description: 'Full commercial license with redistribution rights',
    restrictions: ['Must maintain attribution'],
    permissions: ['Personal use', 'Commercial use', 'Resale', 'Redistribution'],
  },
  'standard': {
    description: 'Standard software license',
    restrictions: [],
    permissions: ['Personal use', 'Commercial use'],
  },
} as const;

export const PAGINATION = {
  articlesPerPage: 12,
  productsPerPage: 9,
  relatedItemsCount: 3,
  featuredItemsCount: 6,
} as const;

export const EMAIL_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
} as const;

export const PAYPAL_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
  currency: 'USD',
} as const;

export const DOWNLOAD_CONFIG = {
  expirationHours: 48,
  maxDownloads: 3,
} as const;