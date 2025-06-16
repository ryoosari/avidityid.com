import Link from 'next/link';
import { ArrowRightIcon, ComputerDesktopIcon, CloudArrowDownIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative brand-wave bg-gradient-to-br from-blue-50 via-orange-50 to-pink-50 overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Digital Office
            <span className="text-gradient-brand block">Solution</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Avidity Id delivers high-quality digital solutions for modern businesses. From specialized software and 
            office supplies to premium creative resources, we provide everything your digital office needs to thrive.
          </p>
          
          {/* Company Highlights */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mx-auto mb-4">
                <ComputerDesktopIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Software</h3>
              <p className="text-sm text-gray-600">Specialized utilities and applications for business operations</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg mx-auto mb-4">
                <CloudArrowDownIcon className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Resources</h3>
              <p className="text-sm text-gray-600">Premium templates, UI kits, and creative assets</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg mx-auto mb-4">
                <DocumentTextIcon className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Insights</h3>
              <p className="text-sm text-gray-600">Industry knowledge and technical guidance</p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-x-6">
            <Link
              href="/downloads"
              className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
            >
              Browse Downloads
            </Link>
            <Link
              href="/articles"
              className="group text-base font-semibold leading-6 text-gray-900 flex items-center gap-x-1 hover:text-secondary-600 transition-colors"
            >
              Read Articles
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
          
          {/* Company Heritage */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              Trusted since 2015 • Serving businesses globally through premium e-commerce platforms
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-wave opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
} 