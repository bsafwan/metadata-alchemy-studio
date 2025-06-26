// Simplified Service Worker for Universal Push Notifications
const CACHE_NAME = 'elismet-notifications-v2';

// Install and activate - keep it simple
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Handle push notifications - this works for background notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  if (!event.data) {
    console.log('No data in push event');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push data:', data);

    const options = {
      body: data.body || data.content || 'You have a new message',
      icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
      badge: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
      tag: 'elismet-universal',
      data: {
        url: data.url || '/',
        timestamp: Date.now()
      },
      requireInteraction: false,
      silent: false,
      vibrate: [200, 100, 200]
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
        tag: 'elismet-fallback'
      })
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url.includes(new URL(urlToOpen).pathname) && 'focus' in client) {
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

// Handle background sync if needed
self.addEventListener('sync', (event) => {
  if (event.tag === 'notification-sync') {
    console.log('Background sync for notifications');
  }
});
