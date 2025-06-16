'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import { DigitalProduct } from '@/types';
import AddToCartButton from '@/components/product/AddToCartButton';

interface ProductPageClientProps {
  product: DigitalProduct;
  license: any;
  relatedProducts: DigitalProduct[];
}

export default function ProductPageClient({ product, license, relatedProducts }: ProductPageClientProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
              {product.preview_images[0] && !imageError ? (
                <Image
                  src={product.preview_images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  onError={handleImageError}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-12 gap-2 h-full w-full p-6">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div key={i} className="bg-gray-400 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="relative z-10 text-center">
                    {product.category === 'Epson Software' ? (
                      <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                      </div>
                    ) : product.category === 'Magnetic Card RW' ? (
                      <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">{product.category}</h3>
                    <p className="text-sm text-gray-500">Software Preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Images */}
            {product.preview_images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.preview_images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.title} preview ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Featured Badge */}
            {product.featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Featured Product
              </span>
            )}

            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="mt-4 text-lg text-gray-600">{product.description}</p>
            </div>

            {/* Price and License */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                  <p className="text-sm text-gray-500">{product.currency}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">License Type</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{license.description}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm font-medium text-green-700">What you can do:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {license.permissions.map((permission: string) => (
                        <li key={permission} className="flex items-center">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm font-medium text-red-700">Restrictions:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {license.restrictions.map((restriction: string) => (
                        <li key={restriction} className="flex items-center">
                          <span className="h-4 w-4 text-red-500 mr-2">×</span>
                          {restriction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <AddToCartButton product={product} />
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">{product.category}</dd>
                </div>
                {product.file_size && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">File Size</dt>
                    <dd className="text-sm text-gray-900">{product.file_size}</dd>
                  </div>
                )}
                {product.format && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Format</dt>
                    <dd className="text-sm text-gray-900">{product.format}</dd>
                  </div>
                )}
                {product.requirements && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Requirements</dt>
                    <dd className="text-sm text-gray-900">
                      <ul className="list-disc list-inside space-y-1">
                        {product.requirements.map((req: string) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Updated</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(product.updated_at).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 