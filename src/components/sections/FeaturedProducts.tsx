'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { DigitalProduct } from '@/types/common';
import { useState } from 'react';
import { formatPrice } from '@/utils/format';

interface FeaturedProductsProps {
  products?: DigitalProduct[];
}

export default function FeaturedProducts({ products = [] }: FeaturedProductsProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId));
  };

  return (
    <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Downloads
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Professional software solutions and creative resources for modern businesses
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              hasImageError={imageErrors.has(product.id)}
              onImageError={() => handleImageError(product.id)}
            />
          ))}
        </div>

        <CompanyHeritage />

        <div className="mt-16 text-center">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            View All Downloads
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: DigitalProduct;
  hasImageError: boolean;
  onImageError: () => void;
}

function ProductCard({ product, hasImageError, onImageError }: ProductCardProps) {
  return (
    <article className="flex flex-col items-start group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full">
        <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden">
          {product.preview_images[0] && !hasImageError ? (
            <Image
              src={product.preview_images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={onImageError}
            />
          ) : (
            <ProductPlaceholder category={product.category} />
          )}
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-6">
        <div className="flex items-center gap-x-4 text-xs mb-3">
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10">
            {product.category}
          </span>
          <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
        </div>
        
        <div className="group relative">
          <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            <Link href={`/downloads/${product.id}`}>
              <span className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-sm leading-6 text-gray-600 mb-4">
            {product.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Link
            href={`/downloads/${product.id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View Details
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProductPlaceholder({ category }: { category: string }) {
  const getIcon = () => {
    if (category === 'Epson Software') {
      return (
        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      );
    }
    if (category === 'Magnetic Card RW') {
      return (
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    }
    return (
      <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    );
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-2 h-full w-full p-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="bg-gray-400 rounded-sm"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          {getIcon()}
        </div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {category}
        </p>
      </div>
    </div>
  );
}

function CompanyHeritage() {
  return (
    <div className="mt-20 bg-white rounded-lg p-8 shadow-sm border border-gray-200">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Why Choose Avidity Id?
        </h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          We focus on delivering the highest quality of various products and digital office supplies. 
          Products, services and final quality control is under direct supervision by our Owner.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2015</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Established</h4>
            <p className="text-sm text-gray-600">Trusted partner since 2015</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">🌏</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h4>
            <p className="text-sm text-gray-600">Serving customers worldwide</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">⭐</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality First</h4>
            <p className="text-sm text-gray-600">Direct owner supervision</p>
          </div>
        </div>
      </div>
    </div>
  );
}