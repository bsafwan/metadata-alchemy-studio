
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Building, Mail, Phone, Bell, BellOff, AlertTriangle, Copy, Check } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { saveCRMInquiry } from '@/utils/crmInquiryService';
import { supabase } from '@/integrations/supabase/client';

const ContactDirect = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'disabled' | 'enabled' | 'subscribed'>('disabled');
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState<string>('');
  const [sourcePage, setSourcePage] = useState<string>('');
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    crm_needs: ''
  });

  // VAPID key from environment
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

  // Generate unique identifier for user (hidden from user)
  useEffect(() => {
    let identifier = localStorage.getItem('user_identifier');
    if (!identifier) {
      identifier = 'USR-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
      localStorage.setItem('user_identifier', identifier);
    }
    setUserIdentifier(identifier);
  }, []);

  // Pre-fill business problems and source page from URL parameters
  useEffect(() => {
    const businessProblems = searchParams.get('business-problems');
    const sourcePageParam = searchParams.get('source-page');
    
    if (businessProblems) {
      setFormData(prev => ({
        ...prev,
        crm_needs: decodeURIComponent(businessProblems)
      }));
    }
    
    if (sourcePageParam) {
      setSourcePage(decodeURIComponent(sourcePageParam));
    }
  }, [searchParams]);

  // Check notification permission on mount and show overlay if needed
  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      setShowNotificationOverlay(true);
      return;
    }

    const permission = Notification.permission;
    
    if (permission === 'granted') {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          if (subscription) {
            setNotificationStatus('subscribed');
            setShowNotificationOverlay(false);
          } else {
            setNotificationStatus('enabled');
            setShowNotificationOverlay(true);
          }
        } else {
          setNotificationStatus('enabled');
          setShowNotificationOverlay(true);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        setNotificationStatus('enabled');
        setShowNotificationOverlay(true);
      }
    } else {
      setNotificationStatus('disabled');
      setShowNotificationOverlay(true);
    }
  };

  const setupFullNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
      toast({
        title: "Notifications Not Supported",
        description: "Your browser doesn't support notifications.",
        variant: "destructive"
      });
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
        toast({
          title: "Notifications Blocked",
          description: "Please allow notifications to receive updates about your inquiry.",
          variant: "destructive"
        });
        return;
      }

      setNotificationStatus('enabled');

      // Step 3: Subscribe to push notifications for background support
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (!existingSubscription && formData.email) {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });

        // Save subscription to database using the email from the form
        const subscriptionData = {
          user_email: formData.email,
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
          toast({
            title: "Subscription Error",
            description: "Failed to save notification subscription. Please try again.",
            variant: "destructive"
          });
        } else {
          console.log('Push subscription saved successfully');
          setNotificationStatus('subscribed');
          setShowNotificationOverlay(false);
          
          // Send test notification
          new Notification('Elismet CRM System', {
            body: 'Perfect! You\'ll receive updates about your CRM inquiry.',
            icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png'
          });
          
          toast({
            title: "All Notifications Enabled!",
            description: "You'll receive updates everywhere - background, other tabs, even when browser is closed.",
          });
        }
      } else {
        console.log('Already subscribed to push notifications');
        setNotificationStatus('subscribed');
        setShowNotificationOverlay(false);
        
        toast({
          title: "Notifications Already Enabled!",
          description: "You're all set to receive updates about your inquiry.",
        });
      }

    } catch (error) {
      console.error('Error setting up notifications:', error);
      toast({
        title: "Setup Error",
        description: "There was an issue setting up notifications. Please try refreshing the page.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is provided for subscription
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please provide your email address first.",
        variant: "destructive"
      });
      return;
    }

    // Check notification setup
    if (notificationStatus !== 'subscribed') {
      setShowNotificationOverlay(true);
      toast({
        title: "Enable Notifications First",
        description: "Please enable notifications to receive updates about your inquiry.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.company_name || !formData.phone || !formData.crm_needs) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add user identifier and source page to the inquiry (for admin use only)
      const inquiryWithIdentifier = {
        ...formData,
        user_identifier: userIdentifier,
        source_page: sourcePage || 'Direct'
      };
      
      const success = await saveCRMInquiry(inquiryWithIdentifier);
      
      if (success) {
        toast({
          title: "Inquiry Submitted Successfully!",
          description: "We've received your CRM requirements. You'll receive updates via notifications!",
        });
        
        // Send immediate notification to user
        new Notification('CRM Inquiry Submitted', {
          body: 'Your CRM inquiry has been submitted successfully. We will contact you soon!',
          icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png'
        });
        
        // Reset form but keep source page
        setFormData({
          company_name: '',
          email: '',
          phone: '',
          crm_needs: ''
        });
      } else {
        throw new Error('Failed to submit inquiry');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // If email is being updated and notifications are not set up, re-check status
    if (field === 'email' && value && notificationStatus !== 'subscribed') {
      checkNotificationStatus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <Navbar />
      
      {/* Notification Overlay */}
      {showNotificationOverlay && notificationStatus !== 'subscribed' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
              
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-10 mx-auto mb-4" 
              />
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Enable Universal Notifications
              </h2>
              
              <p className="text-gray-600 text-sm mb-6">
                Get updates everywhere - in background, other tabs, even when browser is closed. We'll keep you posted on your CRM project.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={setupFullNotifications}
                  disabled={!formData.email}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Enable All Notifications
                  <Bell className="ml-2 w-4 h-4" />
                </Button>
                
                {!formData.email && (
                  <p className="text-xs text-amber-600">
                    Enter your email first to enable notifications
                  </p>
                )}
                
                <p className="text-xs text-gray-400">
                  Works in background, other tabs, and when browser is closed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Get Started
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Build Your Custom CRM
            </h1>
            <p className="text-gray-600 text-lg">
              Tell us about your business needs and we'll create the perfect solution
            </p>
          </div>

          {/* Notification Status */}
          {notificationStatus === 'subscribed' && (
            <div className="mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                <Bell className="w-4 h-4 text-green-600" />
                <span className="text-green-800 text-sm font-medium">Universal notifications enabled - you'll get updates everywhere!</span>
              </div>
            </div>
          )}

          {/* Main Form */}
          <Card className={`shadow-lg border-0 bg-white/90 backdrop-blur transition-all ${showNotificationOverlay ? 'opacity-30 pointer-events-none' : ''}`}>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Source Page - Only show if source page exists */}
                {sourcePage && (
                  <div>
                    <Input
                      id="source_page"
                      type="text"
                      value={sourcePage}
                      placeholder="Source page"
                      className="h-12 text-base border-gray-300 bg-gray-50 rounded-lg"
                      readOnly
                      disabled
                    />
                  </div>
                )}

                {/* Company Name */}
                <div>
                  <Input
                    id="company_name"
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    placeholder="Your company name"
                    className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg bg-white"
                    required
                  />
                </div>

                {/* Contact Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Your email"
                    className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg bg-white"
                    required
                  />
                  
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Your personal phone number"
                    className="h-12 text-base border-gray-300 focus:border-blue-500 rounded-lg bg-white"
                    required
                  />
                </div>

                {/* Business Problems */}
                <div>
                  <Textarea
                    id="crm_needs"
                    value={formData.crm_needs}
                    onChange={(e) => handleInputChange('crm_needs', e.target.value)}
                    placeholder="All problems you got on your business - customer management, inventory tracking, scheduling issues, payment problems, staff coordination, or any operational challenges..."
                    className="min-h-[120px] text-base border-gray-300 focus:border-blue-500 rounded-lg resize-none bg-white"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting || notificationStatus !== 'subscribed'}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Your Request
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="mt-10">
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 text-center">What happens next?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">1</div>
                  <p className="text-blue-800">Review within 24 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">2</div>
                  <p className="text-blue-800">Schedule consultation call</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-pool flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
                  <p className="text-blue-800">Receive detailed proposal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactDirect;
