// Universal Push Notifications Service Worker
const CACHE_NAME = 'elismet-universal-notifications-v3';

// Install and activate - keep it simple
self.addEventListener('install', (event) => {
  console.log('Universal Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Universal Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Handle push notifications - works universally (background, tabs, browser closed)
self.addEventListener('push', (event) => {
  console.log('Universal push notification received:', event);
  
  if (!event.data) {
    console.log('No data in push event');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push data:', data);

    const options = {
      body: data.body || data.content || 'You have a new message from Elismet',
      icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
      badge: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
      tag: 'elismet-universal',
      data: {
        url: data.url || '/',
        timestamp: Date.now()
      },
      requireInteraction: true, // Keep notification visible until user interacts
      silent: false,
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: 'Open',
          icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'New Message from Elismet', options)
    );

  } catch (error) {
    console.error('Error handling push:', error);
    
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification('New Message from Elismet', {
        body: 'You have received a new message',
        icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
        tag: 'elismet-fallback',
        requireInteraction: true
      })
    );
  }
});

// Handle notification clicks and actions
self.addEventListener('notificationclick', (event) => {
  console.log('Universal notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url.includes(new URL(urlToOpen, self.location.origin).pathname) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if none exists
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});

// Handle background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'notification-sync') {
    console.log('Background sync for universal notifications');
  }
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
