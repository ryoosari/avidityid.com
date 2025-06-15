'use client';

import { Dialog } from '@headlessui/react';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  totalItems: number;
  onCartOpen: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  totalItems,
  onCartOpen,
}: MobileMenuProps) {
  return (
    <Dialog as="div" className="lg:hidden" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5" onClick={onClose}>
            <span className="sr-only">Your Company</span>
            <h1 className="text-xl font-bold text-gradient">
              Avidity
            </h1>
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
              <button
                type="button"
                className="-mx-3 flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => {
                  onCartOpen();
                  onClose();
                }}
              >
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-sm font-medium text-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
} 