'use client';

import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Here you would typically make an API call to your newsletter service
      // For now, just simulate a subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Get the latest updates on new products, articles, and exclusive offers delivered to your inbox
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isSubmitting}
                className="flex-auto"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
                    <span>Subscribe</span>
                  </div>
                )}
              </Button>
            </div>
            
            {message && (
              <div className={`text-center text-sm ${
                message.includes('Thank you') 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-orange-400 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}