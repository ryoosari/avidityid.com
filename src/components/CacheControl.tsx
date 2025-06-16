'use client';

import { useEffect } from 'react';

export default function CacheControl() {
  useEffect(() => {
    // Force cache refresh on page load
    if (typeof window !== 'undefined') {
      // Register service worker for cache control
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
            
            // Send message to clear cache on refresh
            if (registration.active) {
              registration.active.postMessage({ type: 'CLEAR_CACHE' });
            }
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      }
      
      // Check if this is a refresh (not initial load) and we haven't already processed it
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const isRefresh = navigationEntry?.type === 'reload';
      const hasProcessedRefresh = sessionStorage.getItem('cache_refreshed');
      
      if (isRefresh && !hasProcessedRefresh) {
        // Clear various caches
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              caches.delete(name);
            });
          });
        }
        
        // Clear localStorage cache if any
        const cacheKeys = Object.keys(localStorage).filter(key => 
          key.startsWith('cache_') || key.startsWith('cached_')
        );
        cacheKeys.forEach(key => localStorage.removeItem(key));
        
        // Mark that we've already processed the refresh to prevent loops
        sessionStorage.setItem('cache_refreshed', 'true');
      }
      
      // Add cache-busting timestamp to URLs
      const addCacheBuster = () => {
        const timestamp = Date.now();
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link: Element) => {
          const htmlLink = link as HTMLLinkElement;
          if (htmlLink.href && !htmlLink.href.includes('?t=')) {
            htmlLink.href += `?t=${timestamp}`;
          }
        });
      };
      
      // Apply cache buster on refresh
      if (isRefresh && !hasProcessedRefresh) {
        addCacheBuster();
      }
      
      // Set up beforeunload event to clear cache
      const handleBeforeUnload = () => {
        // Clear any application-specific cache
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              caches.delete(name);
            });
          });
        }
        
        // Clear session storage flag for next session
        sessionStorage.removeItem('cache_refreshed');
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      // Cleanup
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  // Add meta tags dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const metaTags = [
        { httpEquiv: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
        { httpEquiv: 'Pragma', content: 'no-cache' },
        { httpEquiv: 'Expires', content: '0' },
        { name: 'cache-control', content: 'no-cache' },
      ];

      const addedTags: HTMLMetaElement[] = [];

      metaTags.forEach(({ httpEquiv, name, content }) => {
        const existingTag = document.querySelector(
          httpEquiv ? `meta[http-equiv="${httpEquiv}"]` : `meta[name="${name}"]`
        );
        
        if (!existingTag) {
          const meta = document.createElement('meta');
          if (httpEquiv) meta.httpEquiv = httpEquiv;
          if (name) meta.name = name;
          meta.content = content;
          document.head.appendChild(meta);
          addedTags.push(meta);
        }
      });

      return () => {
        addedTags.forEach(tag => {
          if (tag.parentNode) {
            tag.parentNode.removeChild(tag);
          }
        });
      };
    }
  }, []);

  return null; // This component doesn't render anything
} 