import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import Newsletter from '@/components/sections/Newsletter';
import { defaultSEO } from '@/lib/config';

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
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <FeaturedArticles />
      <Newsletter />
    </>
  );
} 