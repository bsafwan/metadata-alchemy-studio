
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Check, Smartphone } from 'lucide-react';
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

export const UniversalNotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    initializeDeviceAndCheck();
    setupRealtimeNotifications();
  }, []);

  const initializeDeviceAndCheck = async () => {
    try {
      // Get or create device info
      const info = await deviceManager.getOrCreateDeviceInfo();
      setDeviceInfo(info);
      
      // Check if notifications are already enabled for this device
      const existingSubscription = await deviceManager.getSubscriptionData(info.deviceId);
      const notificationStatus = localStorage.getItem('notification_status');
      
      if (existingSubscription && notificationStatus === 'subscribed') {
        setIsEnabled(true);
        return;
      }

      // Show prompt if not already enabled (non-dismissible)
      if (Notification.permission !== 'granted') {
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Failed to initialize device info:', error);
    }
  };

  const setupRealtimeNotifications = () => {
    // Listen for new admin messages in real-time
    const channel = supabase
      .channel('universal-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_messages',
          filter: `notification_content=not.is.null`
        },
        (payload) => {
          console.log('New universal notification received:', payload);
          const newMessage = payload.new;
          
          // Show browser notification
          if (Notification.permission === 'granted') {
            new Notification(newMessage.title, {
              body: newMessage.notification_content || '',
              icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
              badge: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
              tag: 'elismet-universal',
              requireInteraction: true,
              silent: false,
              vibrate: [200, 100, 200]
            });
          }
          
          // Update notification count
          setNotificationCount(prev => prev + 1);
          
          // Show toast
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

  const setupUniversalNotifications = async () => {
    if (!deviceInfo) {
      toast({
        title: "Device Error",
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
      // Step 1: Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered for device:', deviceInfo.deviceId);

      // Step 2: Request permission
      let permission = Notification.permission;
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      if (permission !== 'granted') {
        toast({
          title: "Permission Required",
          description: "Notifications are required for this service. Please allow and try again.",
          variant: "destructive"
        });
        return;
      }

      // Step 3: Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      // Step 4: Get current page context
      const pageContext = deviceManager.getCurrentPageContext();

      // Step 5: Save subscription to database with device info
      const subscriptionData = {
        device_id: deviceInfo.deviceId,
        device_fingerprint: deviceInfo.fingerprint,
        endpoint: subscription.endpoint,
        p256dh_key: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
        auth_key: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))),
        user_agent: navigator.userAgent,
        page_context: pageContext,
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

      // Step 6: Store locally
      await deviceManager.storeSubscriptionData(deviceInfo.deviceId, subscriptionData);

      // Success - Real-time update
      localStorage.setItem('notification_status', 'subscribed');
      setIsEnabled(true);
      setShowPrompt(false);

      // Send welcome notification
      new Notification('🎉 Universal Notifications Active!', {
        body: `Device ${deviceInfo.deviceId.substr(-8)} is now connected! You'll receive updates everywhere.`,
        icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png',
        requireInteraction: true
      });

      toast({
        title: "🎉 Success!",
        description: "Universal notifications are now active on this device!",
      });

    } catch (error) {
      console.error('Error setting up notifications:', error);
      toast({
        title: "Setup Failed",
        description: "Please try again or refresh the page.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show active status when subscribed
  if (isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-green-50 border-green-200 shadow-lg">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800 font-medium">
                Universal notifications active
              </span>
            </div>
            {notificationCount > 0 && (
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                {notificationCount} new
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show non-dismissible prompt
  if (!showPrompt) return null;

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
            Enable Universal Notifications
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            Get real-time updates everywhere - works in background, other tabs, and when browser is closed.
          </p>
          
          <div className="space-y-4">
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              Device: {deviceInfo?.deviceId?.substr(-12) || 'Loading...'}
            </div>
            
            <Button 
              onClick={setupUniversalNotifications}
              disabled={isLoading || !deviceInfo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Check className="mr-2 w-4 h-4" />
                  Enable Now
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-400">
              Anonymous • Device-based • Universal coverage
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
