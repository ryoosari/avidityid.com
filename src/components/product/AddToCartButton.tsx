'use client';

import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { DigitalProduct } from '@/types';
import Button from '@/components/ui/Button';

interface AddToCartButtonProps {
  product: DigitalProduct;
  className?: string;
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      // Get existing cart from localStorage
      const existingCart = localStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : { items: [] };
      
      // Check if product already exists in cart
      const existingItem = cart.items.find((item: any) => item.id === product.id);
      
      if (existingItem) {
        // Update quantity
        existingItem.quantity += 1;
      } else {
        // Add new item
        cart.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          currency: product.currency,
          quantity: 1,
          license: product.license,
          download_files: product.download_files,
        });
      }
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Dispatch cart update event for cart context
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      // Show success message
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
      
      // Show error message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = 'Failed to add to cart. Please try again.';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    } finally {
      setIsAdding(false);
    }
  };

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