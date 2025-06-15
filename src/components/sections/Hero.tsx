import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative container py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Premium Digital
            <span className="text-gradient block">Resources & Assets</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Discover high-quality digital products, templates, and resources to accelerate your creative projects. 
            From stunning UI kits to comprehensive guides, we have everything you need.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/articles"
              className="group text-base font-semibold leading-6 text-gray-900 flex items-center gap-x-1 hover:text-primary-600 transition-colors"
            >
              Read Articles
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary-400 to-secondary-400 opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
} 