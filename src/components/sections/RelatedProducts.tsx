import { getProductsByCategory, getProductById } from '@/lib/products';
import { DigitalProduct } from '@/types';
import ProductGrid from './ProductGrid';

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const currentProduct = getProductById(currentProductId);
  
  if (!currentProduct) {
    return null;
  }

  const relatedProducts = getProductsByCategory(currentProduct.category)
    .filter(product => product.id !== currentProductId)
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <ProductGrid products={relatedProducts} />
    </div>
  );
} 