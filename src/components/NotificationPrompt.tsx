
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { deviceManager } from '@/utils/deviceIdentifier';

const VAPID_PUBLIC_KEY = 'BHxvyf5-KzQpWrV9EKvQjF8nAEgqGv8nDf2QXqYjKpVqJ8FjRqW3QqKgF9nVfQh8yRqF7KpJvWq3QxKf8nDf2QX';

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

export const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkNotificationStatus();
    setupRealtimeNotifications();
  }, []);

  const checkNotificationStatus = async () => {
    try {
      const info = await deviceManager.getOrCreateDeviceInfo();
      setDeviceInfo(info);
      
      const existingSubscription = await deviceManager.getSubscriptionData(info.deviceId);
      
      if (existingSubscription && Notification.permission === 'granted') {
        setIsEnabled(true);
        return;
      }

      // Show prompt if notifications not enabled
      if (Notification.permission !== 'granted') {
        setTimeout(() => setShowPrompt(true), 2000);
      }
    } catch (error) {
      console.error('Failed to check notification status:', error);
    }
  };

  const setupRealtimeNotifications = () => {
    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_messages',
          filter: `notification_content=not.is.null`
        },
        (payload) => {
          const newMessage = payload.new;
          
          if (Notification.permission === 'granted') {
            new Notification(newMessage.title, {
              body: newMessage.notification_content || '',
              icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
              badge: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
              requireInteraction: true,
              silent: false
            });
          }
          
          toast({
            title: `📢 ${newMessage.title}`,
            description: newMessage.notification_content?.substring(0, 100) + '...',
            duration: 8000,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const enableNotifications = async () => {
    if (!deviceInfo) {
      toast({
        title: "Error",
        description: "Failed to initialize device. Please refresh the page.",
        variant: "destructive"
      });
      return;
    }

    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered for device:', deviceInfo.deviceId);

      // Request permission
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        toast({
          title: "Permission Required",
          description: "Please allow notifications to receive updates.",
          variant: "destructive"
        });
        return;
      }

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      // Save subscription to database
      const subscriptionData = {
        device_id: deviceInfo.deviceId,
        device_fingerprint: deviceInfo.fingerprint,
        endpoint: subscription.endpoint,
        p256dh_key: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
        auth_key: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))),
        user_agent: navigator.userAgent,
        page_context: deviceManager.getCurrentPageContext(),
        device_info: {
          screen: deviceInfo.screen,
          timezone: deviceInfo.timezone,
          language: deviceInfo.language
        }
      };

      const { error } = await supabase.functions.invoke('insert-device-push-subscription', {
        body: subscriptionData
      });

      if (error) {
        console.error('Failed to save push subscription:', error);
        throw new Error('Failed to save subscription');
      }

      // Store locally
      await deviceManager.storeSubscriptionData(deviceInfo.deviceId, subscriptionData);

      setIsEnabled(true);
      setShowPrompt(false);

      // Show success notification
      new Notification('🎉 Notifications Enabled!', {
        body: 'You will now receive important updates and messages.',
        icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
        requireInteraction: true
      });

      toast({
        title: "Success!",
        description: "Notifications are now enabled for this device.",
      });

    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast({
        title: "Setup Failed",
        description: "Please try again or refresh the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show anything if already enabled
  if (isEnabled || !showPrompt) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="shadow-2xl border-0 bg-white max-w-sm w-full">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-6 h-6 text-blue-600" />
          </div>
          
          <img 
            src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
            alt="Elismet LTD" 
            className="h-8 mx-auto mb-4" 
          />
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Stay Updated
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            Enable notifications to receive important updates and messages from us.
          </p>
          
          <Button 
            onClick={enableNotifications}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 mb-4"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enabling...
              </>
            ) : (
              <>
                <Check className="mr-2 w-4 h-4" />
                Allow Notifications
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-400">
            You can change this anytime in your browser settings
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
