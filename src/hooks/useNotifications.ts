
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
  links: Array<{ text: string; url: string }>;
  images: Array<{ alt: string; url: string }>;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetchNotifications();

    // Set up real-time subscription for admin messages that contain notifications
    const channel = supabase
      .channel('user-notifications-hook')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_messages',
          filter: `notification_content=not.is.null`
        },
        (payload) => {
          console.log('New admin message with notification:', payload);
          // Refresh notifications when new admin message with notification is received
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.email]);

  const fetchNotifications = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      // For now, use admin_messages table as a temporary solution
      const { data, error } = await supabase
        .from('admin_messages')
        .select('*')
        .not('notification_content', 'is', null)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Transform admin_messages to notification format
      const transformedNotifications: Notification[] = (data || []).map(msg => ({
        id: msg.id,
        title: msg.title,
        content: msg.notification_content || '',
        is_read: false, // Default to false for now
        created_at: msg.created_at,
        links: Array.isArray(msg.links) ? msg.links : [],
        images: Array.isArray(msg.images) ? msg.images : []
      }));

      setNotifications(transformedNotifications);
      setUnreadCount(transformedNotifications.length); // All are unread for now
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    console.log('Marking notification as read:', notificationId);
    // For now, just update local state
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, is_read: true }
          : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!user?.email) return;

    try {
      console.log('Marking all notifications as read');
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
};
