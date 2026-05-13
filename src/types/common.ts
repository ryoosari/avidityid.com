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
  license: 'single-use' | 'multiple-use' | 'commercial' | 'standard';
  featured: boolean;
  created_at: string;
  updated_at: string;
  file_size?: string;
  format?: string;
  requirements?: string[];
  compatibility?: string[];
  coming_soon?: boolean;
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

export interface OrderDetails {
  orderId: string;
  amount: number;
  items: CartItem[];
  timestamp: string;
  payerEmail: string;
  customerName: string;
}

export interface DownloadLink {
  productTitle: string;
  downloadUrl: string;
  expiresAt: string;
}

export interface DownloadToken {
  productId: string;
  expires: string;
  used: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface Breadcrumb {
  name: string;
  href: string;
  current?: boolean;
}

export interface NavigationItem {
  name: string;
  href: string;
}