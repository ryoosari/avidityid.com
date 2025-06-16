'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { DigitalProduct } from '@/types';
import { useCart } from '@/components/providers/CartProvider';

interface AddToCartButtonProps {
  product: DigitalProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      <ShoppingCartIcon className="h-5 w-5 mr-2" />
      Add to Cart
    </button>
  );
} 