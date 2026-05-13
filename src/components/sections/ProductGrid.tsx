import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { DigitalProduct } from '@/types/common';
import Badge from '@/components/ui/Badge';

interface ProductGridProps {
  products: DigitalProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Image or Icon */}
          <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
            {product.preview_images[0] ? (
              <Image
                src={product.preview_images[0]}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Category-based icon */}
                <div className="text-center">
                  {product.category === 'Epson Software' ? (
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </div>
                  ) : product.category === 'Magnetic Card RW' ? (
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
            )}
            
            {/* Featured badge */}
            {product.featured && !product.coming_soon && (
              <div className="absolute top-3 left-3">
                <Badge variant="primary" className="flex items-center space-x-1">
                  <StarIcon className="h-3 w-3" />
                  <span>Featured</span>
                </Badge>
              </div>
            )}

            {/* Coming Soon badge */}
            {product.coming_soon && (
              <div className="absolute top-3 left-3">
                <Badge variant="warning">Coming Soon</Badge>
              </div>
            )}
          </div>

          {/* Product Content */}
          <div className="p-6">
            {/* Category */}
            <div className="mb-2">
              <Badge variant="secondary">{product.category}</Badge>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              <Link
                href={`/downloads/${product.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {product.title}
              </Link>
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {product.description}
            </p>

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500">{product.currency}</span>
              </div>
              
              {product.coming_soon ? (
                <span className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-500 bg-gray-100">
                  Coming Soon
                </span>
              ) : (
                <Link
                  href={`/downloads/${product.id}`}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCartIcon className="h-4 w-4 mr-1" />
                  View
                </Link>
              )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {product.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      +{product.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 