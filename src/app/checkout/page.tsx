'use client';

import { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { usePayPal } from '@/hooks/usePayPal';
import { sendDownloadEmail } from '@/services/emailService';
import { validateContactForm } from '@/utils/validation';
import { formatPrice } from '@/utils/format';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { isLoaded: paypalLoaded } = usePayPal();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const renderPayPalButton = () => {
    if (!window.paypal || !paypalLoaded) return null;

    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';

    window.paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        const validation = validateContactForm(formData);
        if (!validation.isValid) {
          setFormErrors(validation.errors);
          throw new Error('Missing required contact information');
        }
        
        if (cart.items.length === 0) {
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
          
          const orderDetails = {
            orderId: order.id,
            amount: total,
            items: cart.items,
            timestamp: new Date().toISOString(),
            payerEmail: order.payer?.email_address || formData.email,
            customerName: `${formData.firstName} ${formData.lastName}`
          };
          
          localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
          
          try {
            await sendDownloadEmail(orderDetails);
          } catch (emailError) {
            console.error('Email service error:', emailError);
          }
          
          clearCart();
          router.push('/checkout/success');
        } catch (error) {
          console.error('PayPal payment error:', error);
          setIsProcessing(false);
        }
      },
      onError: (err: any) => {
        console.error('PayPal error:', err);
      },
      onCancel: () => {
        console.log('PayPal payment cancelled');
      }
    }).render('#paypal-button-container');
  };

  if (paypalLoaded) {
    renderPayPalButton();
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
          <Link href="/downloads">
            <Button>Continue Shopping</Button>
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
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(total)}</span>
                </div>
              </div>

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

          {/* Payment Form */}
          <div className="lg:order-1">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={formErrors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={formErrors.lastName}
                      required
                    />
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
                />
                
                {!paypalLoaded && (
                  <div className="text-center py-6">
                    <LoadingSpinner />
                    <p className="mt-2 text-sm text-gray-600">Loading PayPal...</p>
                  </div>
                )}
                
                {isProcessing && (
                  <div className="text-center py-4">
                    <LoadingSpinner size="sm" />
                    <p className="mt-2 text-sm text-gray-600">Processing payment...</p>
                  </div>
                )}

                {process.env.NODE_ENV !== 'production' && (
                  <div className="mt-6 pt-6 border-t border-dashed border-yellow-300">
                    <p className="text-xs text-yellow-700 mb-2">🧪 Dev only — skip PayPal and simulate a successful purchase:</p>
                    <Button
                      onClick={async () => {
                        const validation = validateContactForm(formData);
                        if (!validation.isValid) {
                          setFormErrors(validation.errors);
                          return;
                        }
                        setIsProcessing(true);
                        const orderDetails = {
                          orderId: `TEST-${Date.now()}`,
                          amount: total,
                          items: cart.items,
                          timestamp: new Date().toISOString(),
                          payerEmail: formData.email,
                          customerName: `${formData.firstName} ${formData.lastName}`,
                        };
                        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
                        try {
                          await sendDownloadEmail(orderDetails);
                        } catch (emailError) {
                          console.error('Email service error:', emailError);
                        }
                        clearCart();
                        router.push('/checkout/success');
                      }}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Skip PayPal — Simulate Purchase
                    </Button>
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