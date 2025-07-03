'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { sendDownloadEmail } from '@/lib/email';

// PayPal types
declare global {
  interface Window {
    paypal?: any;
  }
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const renderPayPalButton = () => {
    console.log('renderPayPalButton called', { paypalLoaded, hasPaypal: !!window.paypal });
    
    if (!window.paypal || !paypalLoaded) {
      console.log('PayPal not ready', { hasPaypal: !!window.paypal, paypalLoaded });
      return;
    }

    // Clear existing PayPal button
    const container = document.getElementById('paypal-button-container');
    if (container) {
      container.innerHTML = '';
      console.log('Cleared existing PayPal button container');
    }



    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        console.log('Creating PayPal order with cart:', cart.items);
        console.log('Total amount:', total.toFixed(2));
        console.log('Form data:', formData);
        
        // Validate required fields
        if (!formData.email || !formData.firstName || !formData.lastName) {
          alert('Please fill in all required contact information fields before proceeding.');
          throw new Error('Missing required contact information');
        }
        
        if (cart.items.length === 0) {
          alert('Your cart is empty. Please add items before checking out.');
          throw new Error('Empty cart');
        }
        
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toFixed(2),
              currency_code: 'USD'
            },
            description: `Digital Products from Avidity (${cart.items.length} items)`
          }],
          application_context: {
            brand_name: 'Avidity',
            locale: 'en-US',
            landing_page: 'BILLING',
            user_action: 'PAY_NOW'
          }
        });
      },
      onApprove: async (data: any, actions: any) => {
        setIsProcessing(true);
        try {
          const order = await actions.order.capture();
          console.log('PayPal payment successful:', order);
          
          const orderDetails = {
            orderId: order.id,
            amount: total,
            items: cart.items,
            timestamp: new Date().toISOString(),
            payerEmail: order.payer?.email_address || formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`
          };
          
          // Store order details
          localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
          
          // Send download email
          try {
            const emailSent = await sendDownloadEmail(orderDetails);
            if (emailSent) {
              console.log('Download email sent successfully');
            } else {
              console.warn('Failed to send download email');
            }
          } catch (emailError) {
            console.error('Email service error:', emailError);
            // Don't fail the order if email fails
          }
          
          clearCart();
          router.push('/checkout/success');
        } catch (error) {
          console.error('PayPal payment error:', error);
          setIsProcessing(false);
          alert('Payment failed. Please try again.');
        }
      },
      onError: (err: any) => {
        console.error('PayPal error details:', err);
        console.error('Error type:', typeof err);
        console.error('Error string:', JSON.stringify(err, null, 2));
        alert(`PayPal Error: ${err.message || err.toString() || 'Unknown error'}`);
      },
      onCancel: (data: any) => {
        console.log('PayPal payment cancelled:', data);
        // User cancelled payment
      }
    }).render('#paypal-button-container');
  };

  // Load PayPal SDK
  useEffect(() => {
    console.log('PayPal useEffect running', { 
      clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      hasWindow: typeof window !== 'undefined',
      hasPaypal: typeof window !== 'undefined' ? !!window.paypal : false
    });

    if (typeof window !== 'undefined' && !window.paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'}&currency=USD`;
      console.log('Loading PayPal SDK from:', script.src);
      
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        setPaypalLoaded(true);
        renderPayPalButton();
      };
      
      script.onerror = () => {
        console.error('Failed to load PayPal SDK');
      };
      
      document.body.appendChild(script);
    } else if (typeof window !== 'undefined' && window.paypal) {
      console.log('PayPal already available');
      setPaypalLoaded(true);
      renderPayPalButton();
    }
  }, [total, renderPayPalButton]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
          <Link
            href="/downloads"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Order Summary */}
          <div className="lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {item.product.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title}
                      </h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                  <TruckIcon className="h-5 w-5 text-blue-500" />
                  <span>Instant digital delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="lg:order-1">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PayPal Payment */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Your Payment</h2>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Secure payment powered by PayPal. You can use your PayPal account or pay with a credit/debit card.
                  </p>
                </div>

                <div 
                  id="paypal-button-container" 
                  className={isProcessing ? 'opacity-50 pointer-events-none' : ''}
                ></div>
                
                {!paypalLoaded && (
                  <div className="text-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading PayPal...</p>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Processing payment...</p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
                  <ShieldCheckIcon className="h-4 w-4 mr-1" />
                  <span>Secured by PayPal • SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 