'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { SITE_CONFIG, NAVIGATION_ITEMS } from '@/lib/constants';
import { useCart } from '@/components/providers/CartProvider';
import AvidityLogo from '@/components/ui/AvidityLogo';
import MobileMenu from './MobileMenu';
import CartSlideout from '@/components/cart/CartSlideout';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container flex items-center justify-between py-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{SITE_CONFIG.name}</span>
            <AvidityLogo size="sm" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            type="button"
            className="relative inline-flex items-center p-2 text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setCartOpen(true)}
          >
            <span className="sr-only">View cart</span>
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
      />

      <CartSlideout
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </header>
  );
}