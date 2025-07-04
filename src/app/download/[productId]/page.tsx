'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DocumentArrowDownIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';
// These functions will be stubbed for client-side use since this is a client component
function verifyDownloadToken(token: string, productId: string): boolean {
  // Simple client-side token verification
  const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
  const tokenData = downloadTokens[token];
  
  if (!tokenData) return false;
  if (tokenData.productId !== productId) return false;
  if (new Date() > new Date(tokenData.expires)) return false;
  if (tokenData.used) return false;
  
  return true;
}

function markTokenAsUsed(token: string): void {
  const downloadTokens = JSON.parse(localStorage.getItem('downloadTokens') || '{}');
  if (downloadTokens[token]) {
    downloadTokens[token].used = true;
    localStorage.setItem('downloadTokens', JSON.stringify(downloadTokens));
  }
}

function getProductById(id: string): any {
  // For demo purposes, return a basic product object
  // In production, this would come from the processed JSON data
  return {
    id,
    title: `Product ${id}`,
    description: 'Digital product download',
    price: 3.00,
    currency: 'USD',
    category: 'Software',
    slug: id
  };
}

export default function SecureDownloadPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const productId = params.productId as string;
  const token = searchParams.get('token');
  const expires = searchParams.get('expires');

  const [isValidToken, setIsValidToken] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (!token || !productId) {
      setIsLoading(false);
      return;
    }

    // Verify token
    const tokenValid = verifyDownloadToken(token, productId);
    setIsValidToken(tokenValid);

    // Check expiration
    if (expires) {
      const expirationDate = new Date(expires);
      setIsExpired(new Date() > expirationDate);
    }

    // Load product details
    try {
      const productData = getProductById(productId);
      setProduct(productData);
    } catch (error) {
      console.error('Product not found:', error);
    }

    setIsLoading(false);
  }, [token, productId, expires]);

  const handleDownload = async () => {
    if (!isValidToken || !product || isExpired) {
      return;
    }

    setDownloadStarted(true);

    try {
      // Mark token as used (optional)
      if (token) {
        markTokenAsUsed(token);
      }

      // For demo purposes, we'll simulate a file download
      // In a real implementation, you'd serve the actual file from secure storage
      
      // Create a download link for the demo file
      const demoFileContent = `
# ${product.title}

Thank you for your purchase!

This is your digital product download.

## Installation Instructions:
${product.description}

## License Information:
- Personal/Commercial License Included
- Order ID: Generated from your purchase
- Download Date: ${new Date().toLocaleDateString()}

## Support:
If you need help, please contact us through our website.

---
Avidity Digital Solutions
https://avidityid.com
      `;

      // Create and trigger download
      const blob = new Blob([demoFileContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${product.slug || productId}-download.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // In a real implementation, you would:
      // 1. Fetch the actual file from secure storage (AWS S3, Google Drive, etc.)
      // 2. Stream it to the user
      // 3. Log the download for analytics

    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or contact support.');
      setDownloadStarted(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying download access...</p>
        </div>
      </div>
    );
  }

  if (!token || !isValidToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <ExclamationTriangleIcon className="h-10 w-10 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Download Link
          </h1>
          
          <p className="text-gray-600 mb-6">
            This download link is invalid or has already been used. Please check your email for the correct link or contact support.
          </p>

          <div className="space-y-3">
            <Link
              href="/downloads"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
            
            <Link
              href="/about"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-6">
            <ClockIcon className="h-10 w-10 text-orange-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Download Link Expired
          </h1>
          
          <p className="text-gray-600 mb-6">
            This download link has expired. Download links are valid for 48 hours after purchase. Please contact support for a new download link.
          </p>

          <div className="space-y-3">
            <Link
              href="/about"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              Contact Support
            </Link>
            
            <Link
              href="/downloads"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          
          <p className="text-gray-600 mb-6">
            The requested product could not be found.
          </p>

          <Link
            href="/downloads"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <DocumentArrowDownIcon className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Download Ready
        </h1>
        
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          {product.title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {product.description}
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-blue-800 space-y-1">
            <p>💾 File Size: {product.fileSize || 'N/A'}</p>
            <p>🖥️ Compatibility: {product.compatibility || 'Windows'}</p>
            <p>⏰ Link expires: {expires ? new Date(expires).toLocaleDateString() : '48 hours from now'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleDownload}
            disabled={downloadStarted}
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {downloadStarted ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Download Started...
              </>
            ) : (
              <>
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Download Now
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500">
            By downloading, you agree to our terms of service. Keep your download link secure.
          </p>
          
          <div className="flex space-x-4">
            <Link
              href="/downloads"
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              More Products
            </Link>
            
            <Link
              href="/about"
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 