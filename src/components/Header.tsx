'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { navigation, siteConfig } from '@/lib/config';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';
import MobileMenu from './MobileMenu';
import CartSlideout from './cart/CartSlideout';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container flex items-center justify-between py-4" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{siteConfig.name}</span>
            <h1 className="text-2xl font-bold text-gradient">
              {siteConfig.name}
            </h1>
          </Link>
        </div>

        {/* Mobile menu button */}
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

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart and actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            type="button"
            className="relative inline-flex items-center p-2 text-gray-700 hover:text-primary-600 transition-colors"
            onClick={() => setCartOpen(true)}
          >
            <span className="sr-only">View cart</span>
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Cart slideout */}
      <CartSlideout
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </header>
  );
} 