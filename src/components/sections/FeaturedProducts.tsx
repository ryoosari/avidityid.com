import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Mock featured products data
const featuredProducts = [
  {
    id: '1',
    title: 'Modern UI Kit',
    description: 'Complete set of modern UI components for web and mobile applications.',
    price: 49,
    category: 'UI Kits',
    image: '/images/products/ui-kit.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Brand Identity Pack',
    description: 'Professional brand identity templates and guidelines.',
    price: 79,
    category: 'Branding',
    image: '/images/products/brand-pack.jpg',
    featured: true,
  },
  {
    id: '3',
    title: 'Website Templates',
    description: 'Responsive website templates for various industries.',
    price: 39,
    category: 'Templates',
    image: '/images/products/website-templates.jpg',
    featured: true,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Discover our most popular digital products and resources
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <article key={product.id} className="flex flex-col items-start group">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">{product.title}</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 group-hover:ring-primary-500/50 transition-colors" />
              </div>
              <div className="max-w-xl flex-1 pt-6">
                <div className="flex items-center gap-x-4 text-xs">
                  <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10">
                    {product.category}
                  </span>
                  <span className="text-gray-500">${product.price}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary-600 transition-colors">
                    <Link href={`/products/${product.id}`}>
                      <span className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {product.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
          >
            View All Products
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
} 