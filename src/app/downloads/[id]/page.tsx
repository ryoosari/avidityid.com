import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getAllProducts, getProductsByCategory } from '@/lib/products';
import { licenses } from '@/lib/config';
import ProductPageClient from './ProductPageClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} - Digital Download`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.preview_images.length > 0 ? [product.preview_images[0]] : [],
      url: `/downloads/${product.id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const license = licenses[product.license];
  
  // Get related products
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return <ProductPageClient product={product} license={license} relatedProducts={relatedProducts} />;
} 