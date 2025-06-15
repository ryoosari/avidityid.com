export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured_image?: string;
  seo_title?: string;
  seo_description?: string;
  reading_time?: number;
  published: boolean;
}

export interface DigitalProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  preview_images: string[];
  download_files: string[];
  license: 'single-use' | 'multiple-use' | 'commercial';
  featured: boolean;
  created_at: string;
  updated_at: string;
  file_size?: string;
  format?: string;
  requirements?: string[];
}

export interface CartItem {
  productId: string;
  product: DigitalProduct;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  currency: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  purchases: Purchase[];
}

export interface Purchase {
  id: string;
  customer_id: string;
  product_id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  download_link?: string;
  download_expires?: string;
  created_at: string;
}

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  current?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    twitter: string;
    github: string;
    instagram: string;
  };
  author: {
    name: string;
    email: string;
    avatar: string;
  };
}

export interface SearchResult {
  type: 'article' | 'product';
  id: string;
  title: string;
  excerpt: string;
  url: string;
  category: string;
  tags: string[];
}

export interface FilterOptions {
  categories: string[];
  tags: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy: 'date' | 'title' | 'price' | 'popularity';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StripeSession {
  id: string;
  url: string;
  success_url: string;
  cancel_url: string;
}

export interface DownloadToken {
  token: string;
  product_id: string;
  customer_id: string;
  expires_at: string;
  download_count: number;
  max_downloads: number;
}

export interface Analytics {
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_session_duration: number;
  top_pages: Array<{
    path: string;
    views: number;
  }>;
  top_products: Array<{
    product_id: string;
    sales: number;
    revenue: number;
  }>;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Newsletter {
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

export interface License {
  type: 'single-use' | 'multiple-use' | 'commercial';
  description: string;
  restrictions: string[];
  permissions: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  image?: string;
  product_count: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface Breadcrumb {
  name: string;
  href: string;
  current?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: any;
  onClose?: () => void;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 