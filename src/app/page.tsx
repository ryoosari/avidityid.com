import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import CompanyInfo from '@/components/sections/CompanyInfo';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import Newsletter from '@/components/sections/Newsletter';
import { defaultSEO } from '@/lib/config';
import { getFeaturedProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  openGraph: {
    title: defaultSEO.title,
    description: defaultSEO.description,
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