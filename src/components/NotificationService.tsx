
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

// Helper function to safely parse JSON arrays
const parseJsonArray = (jsonArray: any[], defaultValue: any[] = []): any[] => {
  if (!Array.isArray(jsonArray)) return defaultValue;
  return jsonArray.filter(item => item && typeof item === 'object');
};

export function NotificationService({ onNotificationCount }: NotificationServiceProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { user } = useAuth();

  // Check and request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      setPermissionGranted(true);
      return true;
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPermissionGranted(true);
        toast.success('Browser notifications enabled!');
        return true;
      } else {
        toast.error('Notification permission denied. You can enable it in your browser settings.');
        return false;
      }
    }

    return false;
  };

  // Show browser notification
  const showBrowserNotification = (title: string, content: string) => {
    if (!permissionGranted || !('Notification' in window)) return;
    
    try {
      const notification = new Notification(title, {
        body: content,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'elismet-notification',
        requireInteraction: true,
        silent: false
      });

      // Auto close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      console.log('Browser notification displayed:', title);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  };

  useEffect(() => {
    // Request permission on component mount
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    fetchNotifications();

    // Set up real-time subscription for new admin messages with notifications
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
          
          // Transform to notification format with proper type casting
          const newNotification: Notification = {
            id: newMessage.id,
            title: newMessage.title,
            content: newMessage.notification_content || '',
            is_read: false,
            created_at: newMessage.created_at,
            links: parseJsonArray(newMessage.links as any[]) as Array<{ text: string; url: string }>,
            images: parseJsonArray(newMessage.images as any[]) as Array<{ alt: string; url: string }>
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          
          // Show browser notification immediately
          showBrowserNotification(newNotification.title, newNotification.content);
          
          // Show toast notification as well
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
  }, [user?.email, permissionGranted]);

  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.is_read).length;
    onNotificationCount?.(unreadCount);
  }, [notifications, onNotificationCount]);

  const fetchNotifications = async () => {
    if (!user?.email) return;

    try {
      // Use admin_messages table as temporary solution
      const { data, error } = await supabase
        .from('admin_messages')
        .select('*')
        .not('notification_content', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      
      // Transform admin_messages to notification format with proper type casting
      const transformedNotifications: Notification[] = (data || []).map(msg => ({
        id: msg.id,
        title: msg.title,
        content: msg.notification_content || '',
        is_read: false, // Default to false for now
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
    // For now, just update local state
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

      {!permissionGranted && (
        <Button
          variant="outline"
          size="sm"
          onClick={requestNotificationPermission}
          className="ml-2"
        >
          Enable Notifications
        </Button>
      )}

      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(false)}
            >
              <X className="w-4 h-4" />
            </Button>
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
