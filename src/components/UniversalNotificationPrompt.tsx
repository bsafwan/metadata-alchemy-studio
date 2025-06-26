
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, X, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already enabled notifications or dismissed the prompt
    const notificationStatus = localStorage.getItem('notification_status');
    const promptDismissed = localStorage.getItem('notification_prompt_dismissed');
    
    if (notificationStatus === 'enabled' || notificationStatus === 'subscribed') {
      setIsEnabled(true);
      return;
    }

    if (!promptDismissed && Notification.permission !== 'granted') {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const setupUniversalNotifications = async () => {
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email to enable notifications.",
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
      console.log('Service Worker registered successfully');

      // Step 2: Request permission
      let permission = Notification.permission;
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }

      if (permission !== 'granted') {
        toast({
          title: "Permission Denied",
          description: "Please allow notifications to stay updated.",
          variant: "destructive"
        });
        return;
      }

      // Step 3: Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      // Step 4: Save subscription to database
      const subscriptionData = {
        user_email: email.trim(),
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
        throw new Error('Failed to save subscription');
      }

      // Success
      localStorage.setItem('notification_status', 'subscribed');
      localStorage.setItem('notification_email', email.trim());
      setIsEnabled(true);
      setShowPrompt(false);

      // Send welcome notification
      new Notification('🎉 Notifications Enabled!', {
        body: 'You\'ll now receive updates everywhere - background, other tabs, even when browser is closed.',
        icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png'
      });

      toast({
        title: "All Set! 🎉",
        description: "Universal notifications enabled! You'll receive updates everywhere.",
      });

    } catch (error) {
      console.error('Error setting up notifications:', error);
      toast({
        title: "Setup Failed",
        description: "There was an issue enabling notifications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('notification_prompt_dismissed', 'true');
  };

  if (isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-green-50 border-green-200 shadow-lg">
          <CardContent className="p-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800 font-medium">
              Universal notifications active
            </span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-2xl border-0 bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  Stay Updated
                </h3>
                <p className="text-xs text-gray-600">
                  Get notifications everywhere
                </p>
              </div>
            </div>
            <Button
              onClick={dismissPrompt}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm"
            />
            
            <Button 
              onClick={setupUniversalNotifications}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm h-9"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                  Setting up...
                </>
              ) : (
                <>
                  Enable All Notifications
                  <Bell className="ml-2 w-3 h-3" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Works in background, other tabs & when browser is closed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
