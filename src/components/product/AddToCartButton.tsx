'use client';

import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { DigitalProduct } from '@/types';
import Button from '@/components/ui/Button';
import { useCart } from '@/components/providers/CartProvider';

interface AddToCartButtonProps {
  product: DigitalProduct;
  className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      addToCart(product, 1);

      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity';
      toast.textContent = `${product.title} added to cart!`;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => setIsAdding(false), 300);
    }
  };

  if (product.coming_soon) {
    return (
      <Button
        disabled
        className={`w-full flex items-center justify-center space-x-2 ${className}`}
        size="lg"
      >
        <span>Coming Soon</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full flex items-center justify-center space-x-2 ${className}`}
      size="lg"
    >
      <ShoppingCartIcon className="h-5 w-5" />
      <span>{isAdding ? 'Adding...' : 'Add to Cart'}</span>
    </Button>
  );
}
