import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import CompanyInfo from '@/components/sections/CompanyInfo';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import Newsletter from '@/components/sections/Newsletter';
import { SITE_CONFIG } from '@/lib/constants';
import { getFeaturedProducts } from '@/services/dataService';

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: '/',
  },
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />
      <FeaturedProducts products={featuredProducts} />
      <CompanyInfo />
      <FeaturedArticles />
      <Newsletter />
    </>
  );
}