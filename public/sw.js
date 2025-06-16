// Service Worker for Cache Control - Static Export Compatible
const CACHE_NAME = 'avidityid-no-cache-v1';

// Install event
self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
  console.log('Service Worker installed');
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete all existing caches to ensure fresh content
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      console.log('Service Worker activated and controlling clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - Force fresh requests for HTML pages
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only intercept same-origin requests
  if (url.origin === self.location.origin) {
    // For HTML pages, always fetch fresh
    if (event.request.mode === 'navigate' || 
        event.request.destination === 'document' ||
        url.pathname.endsWith('.html') ||
        url.pathname === '/' ||
        !url.pathname.includes('.')) {
      
      event.respondWith(
        fetch(event.request, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        }).then((response) => {
          // Clone and modify response headers
          const headers = new Headers(response.headers);
          headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
          headers.set('Pragma', 'no-cache');
          headers.set('Expires', '0');
          
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers
          });
        }).catch((error) => {
          console.log('Fetch failed:', error);
          return new Response('Network error occurred', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        })
      );
    }
  }
});

// Message event for manual cache clearing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('Clearing caches via message');
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 