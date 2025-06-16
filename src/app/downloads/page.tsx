import { Metadata } from 'next';
import ProductGrid from '@/components/sections/ProductGrid';
import ProductFilters from '@/components/sections/ProductFilters';
import { getAllProducts, getProductCategories, getProductTags } from '@/lib/products';
import { defaultSEO } from '@/lib/config';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Downloads - Your Digital Office Solution | Avidity Id',
  description: 'Browse our collection of professional software solutions including Epson printer software, magnetic card reader/writer tools, and essential digital office equipment.',
  openGraph: {
    title: 'Digital Downloads - Your Digital Office Solution | Avidity Id',
    description: 'Professional software solutions for Epson printers, magnetic card equipment, and digital office needs. Trusted since 2015.',
    url: '/downloads',
  },
};

export default function DownloadsPage() {
  const products = getAllProducts();
  const categories = getProductCategories();
  const tags = getProductTags();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Digital Downloads
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Professional digital office solutions including Epson printer software, 
            magnetic card reader/writer tools, and essential business software. 
            Quality products under direct owner supervision since 2015.
          </p>
          
          {/* Featured Categories Section - Now Clickable */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link 
              href="/downloads/epson-software"
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Epson Software</h3>
              <p className="text-sm text-gray-600">
                Complete software solutions for Epson printers including Artisan, L Series, and other models. Windows compatible.
              </p>
              <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                Browse Epson Software →
              </div>
            </Link>
            
            <Link 
              href="/downloads/magnetic-card-rw"
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Magnetic Card RW</h3>
              <p className="text-sm text-gray-600">
                Professional magnetic card reader and writer software for business applications and card encoding needs.
              </p>
              <div className="mt-4 text-green-600 text-sm font-medium group-hover:text-green-700">
                Browse Magnetic Card RW →
              </div>
            </Link>
            
            <Link 
              href="/downloads/office-solutions"
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Office Solutions</h3>
              <p className="text-sm text-gray-600">
                Essential digital office tools and software solutions to enhance your business productivity and operations.
              </p>
              <div className="mt-4 text-purple-600 text-sm font-medium group-hover:text-purple-700">
                Browse Office Solutions →
              </div>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">All Products</h2>
          <p className="text-gray-600 text-center">Browse all available downloads or use filters to find specific products</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <ProductFilters categories={categories} tags={tags} />
          </div>
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
} 