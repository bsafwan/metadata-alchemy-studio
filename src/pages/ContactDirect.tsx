import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Building, Mail, Phone, Bell, BellOff, AlertTriangle, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { saveCRMInquiry } from '@/utils/crmInquiryService';

const ContactDirect = () => {
  const { toast } = useToast();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      <Navbar />
      
      {/* Notification Overlay */}
      {showNotificationOverlay && notificationPermission !== 'granted' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-blue-600" />
              </div>
              
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-12 mx-auto mb-4" 
              />
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Enable Notifications Required
              </h2>
              
              <p className="text-gray-600 mb-6">
                To use our CRM inquiry system, we need permission to send you important updates about your project progress and communications.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={requestNotificationPermission}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                  size="lg"
                >
                  Enable Notifications
                  <Bell className="ml-2 w-5 h-5" />
                </Button>
                
                <p className="text-sm text-gray-500">
                  Don't worry - we only send important updates about your CRM inquiry
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Get Started
            </Link>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Let's Build Your
              <span className="block text-blue-600">Custom CRM System</span>
            </h1>
          </div>

          {/* Notification Status */}
          {notificationPermission === 'granted' && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <Bell className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">✓ Notifications enabled - You're all set!</span>
              </div>
            </div>
          )}

          {/* Main Form */}
          <div className="max-w-2xl mx-auto">
            <Card className={`shadow-2xl border-0 bg-white/80 backdrop-blur transition-all ${showNotificationOverlay ? 'opacity-30 pointer-events-none' : ''}`}>
              <CardContent className="p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Company Name */}
                  <div className="space-y-3">
                    <Input
                      id="company_name"
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Your Company Name"
                      className="h-14 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                      required
                    />
                  </div>

                  {/* Contact Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contact@company.com"
                        className="h-14 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                        required
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="h-14 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  {/* Business Problems */}
                  <div className="space-y-3">
                    <Textarea
                      id="crm_needs"
                      value={formData.crm_needs}
                      onChange={(e) => handleInputChange('crm_needs', e.target.value)}
                      placeholder="What problems does your physical business face? Tell us about customer management challenges, inventory issues, scheduling problems, payment tracking, staff coordination, or any operational difficulties you're experiencing..."
                      className="min-h-[150px] text-lg border-gray-200 focus:border-blue-500 rounded-xl resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || notificationPermission !== 'granted'}
                    className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit CRM Inquiry
                        <Send className="ml-3 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-4">What Happens Next?</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">1</div>
                    <p className="text-blue-800">We review your requirements within 24 hours</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">2</div>
                    <p className="text-blue-800">Schedule a consultation call to discuss details</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">3</div>
                    <p className="text-blue-800">Receive a detailed proposal and timeline</p>
                  </div>
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
