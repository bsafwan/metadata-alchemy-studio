
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Bell, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
  links: Array<{ text: string; url: string }>;
  images: Array<{ alt: string; url: string }>;
}

interface NotificationServiceProps {
  onNotificationCount?: (count: number) => void;
}

// VAPID key from environment - this should be set in Supabase secrets
const VAPID_PUBLIC_KEY = 'BHxvyf5-KzQpWrV9EKvQjF8nAEgqGv8nDf2QXqYjKpVqJ8FjRqW3QqKgF9nVfQh8yRqF7KpJvWq3QxKf8nDf2QX';

const parseJsonArray = (jsonArray: any[], defaultValue: any[] = []): any[] => {
  if (!Array.isArray(jsonArray)) return defaultValue;
  return jsonArray.filter(item => item && typeof item === 'object');
};

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export function NotificationService({ onNotificationCount }: NotificationServiceProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'disabled' | 'enabled' | 'subscribed'>('disabled');
  const { user } = useAuth();

  // Single setup function for all notifications
  const setupNotifications = async () => {
    if (!user?.email || !('serviceWorker' in navigator) || !('Notification' in window)) {
      console.log('Notifications not supported or user not authenticated');
      return;
    }

    try {
      // Step 1: Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');

      // Step 2: Request permission
      let permission = Notification.permission;
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      if (permission !== 'granted') {
        console.log('Notification permission denied');
        setNotificationStatus('disabled');
        return;
      }

      setNotificationStatus('enabled');

      // Step 3: Subscribe to push notifications for background support
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (!existingSubscription) {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });

        // Save subscription to database
        const subscriptionData = {
          user_email: user.email,
          endpoint: subscription.endpoint,
          p256dh_key: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
          auth_key: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))),
          user_agent: navigator.userAgent
        };

        const { error } = await supabase.functions.invoke('insert-push-subscription', {
          body: subscriptionData
        });

        if (error) {
          console.error('Failed to save push subscription:', error);
        } else {
          console.log('Push subscription saved successfully');
          setNotificationStatus('subscribed');
        }
      } else {
        console.log('Already subscribed to push notifications');
        setNotificationStatus('subscribed');
      }

    } catch (error) {
      console.error('Error setting up notifications:', error);
      setNotificationStatus('disabled');
    }
  };

  // Show notification (works for both in-tab and background)
  const showNotification = (title: string, content: string) => {
    if (Notification.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          body: content,
          icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
          badge: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
          tag: 'elismet-notification',
          requireInteraction: false,
          silent: false
        });

        // Auto close after 8 seconds
        setTimeout(() => notification.close(), 8000);

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        console.log('Notification displayed:', title);
      } catch (error) {
        console.error('Failed to show notification:', error);
      }
    }
  };

  // Initialize on component mount
  useEffect(() => {
    if (user?.email) {
      fetchNotifications();
    }
  }, [user?.email]);

  // Listen for new notifications in real-time
  useEffect(() => {
    if (!user?.email) return;

    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_messages',
          filter: `notification_content=not.is.null`
        },
        (payload) => {
          console.log('New notification received:', payload);
          const newMessage = payload.new;
          
          const newNotification: Notification = {
            id: newMessage.id,
            title: newMessage.title,
            content: newMessage.notification_content || '',
            is_read: false,
            created_at: new Date().toISOString(),
            links: parseJsonArray(newMessage.links as any[]) as Array<{ text: string; url: string }>,
            images: parseJsonArray(newMessage.images as any[]) as Array<{ alt: string; url: string }>
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show notification regardless of page visibility
          showNotification(newNotification.title, newNotification.content);
          
          // Show toast for in-app users
          toast.success(`New message: ${newNotification.title}`, {
            description: newNotification.content.substring(0, 100) + '...',
            duration: 5000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.email]);

  // Update notification count
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.is_read).length;
    onNotificationCount?.(unreadCount);
  }, [notifications, onNotificationCount]);

  const fetchNotifications = async () => {
    if (!user?.email) return;

    try {
      const { data, error } = await supabase
        .from('admin_messages')
        .select('*')
        .not('notification_content', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      const transformedNotifications: Notification[] = (data || []).map(msg => ({
        id: msg.id,
        title: msg.title,
        content: msg.notification_content || '',
        is_read: false,
        created_at: msg.created_at,
        links: parseJsonArray(msg.links as any[]) as Array<{ text: string; url: string }>,
        images: parseJsonArray(msg.images as any[]) as Array<{ alt: string; url: string }>
      }));

      setNotifications(transformedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, is_read: true }
          : n
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {notificationStatus === 'disabled' && (
        <Button
          variant="outline"
          size="sm"
          onClick={setupNotifications}
          className="ml-2"
        >
          Enable All Notifications
        </Button>
      )}

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {notificationStatus === 'subscribed' && (
                <Badge variant="secondary" className="text-xs">
                  All Enabled
                </Badge>
              )}
              {notificationStatus === 'enabled' && (
                <Badge variant="outline" className="text-xs">
                  Basic Enabled
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`m-2 cursor-pointer hover:bg-gray-50 ${
                    !notification.is_read ? 'border-blue-200 bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{notification.title}</CardTitle>
                      {!notification.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <CardDescription className="text-xs">
                      {new Date(notification.created_at).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700">{notification.content}</p>
                    {notification.links.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {notification.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline block"
                          >
                            📎 {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
