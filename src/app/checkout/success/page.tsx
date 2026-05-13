'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface OrderDetails {
  orderId: string;
  amount: number;
  items: any[];
  timestamp: string;
  payerEmail?: string;
}

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Get order details from localStorage (in a real app, this would come from your backend)
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        const order = JSON.parse(lastOrder);
        setOrderDetails(order);
        // Clear the order from localStorage after displaying
        localStorage.removeItem('lastOrder');
      } catch (error) {
        console.error('Error parsing order details:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your digital products are ready for download.
          </p>

          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm text-gray-900">{orderDetails.orderId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-gray-900">${orderDetails.amount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">
                    {new Date(orderDetails.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {orderDetails.payerEmail && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{orderDetails.payerEmail}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Items Purchased:</h4>
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.title} × {item.quantity}
                      </span>
                      <span className="text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {orderDetails && (
            <div className="bg-green-50 rounded-lg p-6 mb-8 text-left">
              <div className="flex items-center mb-4">
                <DocumentArrowDownIcon className="h-6 w-6 text-green-700 mr-2" />
                <h3 className="text-lg font-semibold text-green-900">Your Downloads</h3>
              </div>
              <div className="space-y-3">
                {orderDetails.items.flatMap((item: any) =>
                  (item.product?.download_files || []).map((filename: string) => (
                    <a
                      key={filename}
                      href={`/downloads/${filename}`}
                      download
                      className="flex items-center justify-between bg-white border border-green-200 rounded-md px-4 py-3 hover:bg-green-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{item.product.title}</span>
                      <span className="text-sm text-green-700 font-medium">Download →</span>
                    </a>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>📧 A copy of your download links has been emailed to you</p>
              <p>💾 Save the files now — they include installation instructions</p>
              <p>📬 If you don't see the email, check spam or contact support</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/downloads"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Browse More Products
            </Link>
            
            <div className="flex space-x-4">
              <Link
                href="/"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
              
              <Link
                href="/about"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 