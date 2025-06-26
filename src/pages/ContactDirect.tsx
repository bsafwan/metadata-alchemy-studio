
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

const ContactDirect = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [showNotificationOverlay, setShowNotificationOverlay] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState<string>('');
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    crm_needs: ''
  });

  // Generate unique identifier for user (hidden from user)
  useEffect(() => {
    let identifier = localStorage.getItem('user_identifier');
    if (!identifier) {
      identifier = 'USR-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
      localStorage.setItem('user_identifier', identifier);
    }
    setUserIdentifier(identifier);
  }, []);

  // Pre-fill business problems from URL parameters
  useEffect(() => {
    const businessProblems = searchParams.get('business-problems');
    if (businessProblems) {
      setFormData(prev => ({
        ...prev,
        crm_needs: decodeURIComponent(businessProblems)
      }));
    }
  }, [searchParams]);

  // Check notification permission on mount and show overlay if needed
  useEffect(() => {
    if ('Notification' in window) {
      const permission = Notification.permission;
      setNotificationPermission(permission);
      
      // Show overlay if permission is not granted
      if (permission !== 'granted') {
        setShowNotificationOverlay(true);
      }
    } else {
      // Browser doesn't support notifications
      setShowNotificationOverlay(true);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        if (permission === 'granted') {
          setShowNotificationOverlay(false);
          
          // Send test notification
          new Notification('Elismet CRM System', {
            body: 'Notifications enabled! We can now keep you updated on your inquiry.',
            icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png'
          });
          
          toast({
            title: "Notifications Enabled!",
            description: "Perfect! You'll receive updates about your CRM inquiry.",
          });
        } else {
          toast({
            title: "Notifications Blocked",
            description: "Please click the notification icon in your browser's address bar to enable notifications.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        toast({
          title: "Notification Error",
          description: "There was an issue with notification permissions. Please try refreshing the page.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check notification permission before allowing submission
    if (notificationPermission !== 'granted') {
      setShowNotificationOverlay(true);
      toast({
        title: "Enable Notifications First",
        description: "Please allow notifications to submit your inquiry.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.company_name || !formData.email || !formData.phone || !formData.crm_needs) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add user identifier to the inquiry (for admin use only)
      const inquiryWithIdentifier = {
        ...formData,
        user_identifier: userIdentifier
      };
      
      const success = await saveCRMInquiry(inquiryWithIdentifier);
      
      if (success) {
        toast({
          title: "Inquiry Submitted Successfully!",
          description: "We've received your CRM requirements. Check your notifications for updates!",
        });
        
        // Send notification to user
        new Notification('CRM Inquiry Submitted', {
          body: 'Your CRM inquiry has been submitted successfully. We will contact you soon!',
          icon: '/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png'
        });
        
        // Reset form
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      <Navbar />
      
      {/* Notification Overlay */}
      {showNotificationOverlay && notificationPermission !== 'granted' && (
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
                Enable Notifications
              </h2>
              
              <p className="text-gray-600 text-sm mb-6">
                Allow notifications to receive important updates about your CRM project progress.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={requestNotificationPermission}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Enable Notifications
                  <Bell className="ml-2 w-4 h-4" />
                </Button>
                
                <p className="text-xs text-gray-400">
                  We only send updates about your inquiry
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
          {notificationPermission === 'granted' && (
            <div className="mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                <Bell className="w-4 h-4 text-green-600" />
                <span className="text-green-800 text-sm font-medium">Notifications enabled</span>
              </div>
            </div>
          )}

          {/* Main Form */}
          <Card className={`shadow-lg border-0 bg-white/90 backdrop-blur transition-all ${showNotificationOverlay ? 'opacity-30 pointer-events-none' : ''}`}>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  disabled={isSubmitting || notificationPermission !== 'granted'}
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
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-semibold">3</div>
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
