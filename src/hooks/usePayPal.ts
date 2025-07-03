'use client';

import { useState, useEffect } from 'react';
import { PAYPAL_CONFIG } from '@/lib/constants';

declare global {
  interface Window {
    paypal?: any;
  }
}

export function usePayPal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.paypal) {
      setIsLoaded(true);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.clientId}&currency=${PAYPAL_CONFIG.currency}`;
    
    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
    
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      setIsLoading(false);
    };
    
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isLoading]);

  return { isLoaded, isLoading };
}