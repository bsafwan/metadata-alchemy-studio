
// Service Worker for Background Push Notifications
const CACHE_NAME = 'elismet-notifications-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

// Push event - handles background push notifications
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  if (!event.data) {
    console.log('Push event but no data');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push notification data:', data);

    const options = {
      body: data.body || data.content,
      icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
      badge: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
      tag: 'elismet-notification',
      data: {
        url: data.url || '/',
        notificationId: data.id,
        timestamp: Date.now()
      },
      actions: [
        {
          action: 'open',
          title: 'Open'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ],
      requireInteraction: true,
      silent: false,
      vibrate: [200, 100, 200]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'New Message', options)
    );
  } catch (error) {
    console.error('Error processing push notification:', error);
    
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification('New Message from Elismet', {
        body: 'You have a new message',
        icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
        tag: 'elismet-fallback'
      })
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If no existing window/tab, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background sync for offline notifications
self.addEventListener('sync', (event) => {
  console.log('Background sync event:', event.tag);
  
  if (event.tag === 'notification-sync') {
    event.waitUntil(syncNotifications());
  }
});

// Function to sync notifications when back online
async function syncNotifications() {
  try {
    console.log('Syncing notifications...');
    // This would typically fetch missed notifications from the server
    // For now, we'll just log that sync occurred
  } catch (error) {
    console.error('Error syncing notifications:', error);
  }
}

// Handle message from main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
