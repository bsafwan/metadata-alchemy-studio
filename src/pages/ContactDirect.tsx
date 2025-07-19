import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Building, Mail, Phone, Calendar } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { saveCRMInquiry } from '@/utils/crmInquiryService';
import MeetingScheduler from '@/components/MeetingScheduler';

const ContactDirect = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState<string>('');
  const [sourcePage, setSourcePage] = useState<string>('');
  const [showScheduler, setShowScheduler] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
          description: "We've received your CRM requirements. We will contact you soon!",
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Build Your Custom CRM
            </h1>
            <p className="text-gray-600 text-lg">
              Tell us about your business needs and we'll create the perfect solution
            </p>
          </div>

          {/* Schedule Meeting Option */}
          <div className="mb-12">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-xl">
              <CardContent className="p-6 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Fast-Track Your Project</h2>
                <p className="text-blue-700 mb-6 md:mb-8 text-base md:text-lg">Schedule a professional consultation with our experts</p>
                
                <Button 
                  onClick={() => setShowScheduler(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-12 py-3 md:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-base md:text-lg w-full md:w-auto"
                >
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  Schedule Professional Meeting
                </Button>

                <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-blue-600">
                  <span className="flex items-center gap-2 text-xs md:text-sm font-medium">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Thursday & Friday Only
                  </span>
                  <span className="flex items-center gap-2 text-xs md:text-sm font-medium">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    30-Minute Sessions
                  </span>
                  <span className="flex items-center gap-2 text-xs md:text-sm font-medium">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    Eastern Time (EDT)
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Section */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader className="p-6 md:p-8 pb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Contact Us Directly
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8 pt-0">
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

                {/* Business Problems - Enhanced Email-like Design */}
                <div className="space-y-2">
                  <Label htmlFor="crm_needs" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Describe Your Business Challenges
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="crm_needs"
                      value={formData.crm_needs}
                      onChange={(e) => handleInputChange('crm_needs', e.target.value)}
                      placeholder="Describe the main challenges in your business:

• Customer management issues
• Inventory or stock problems  
• Scheduling conflicts
• Payment delays
• Staff coordination
• Manual processes
• Data organization

Please provide specific details about your situation so we can create the right solution for you."
                      className="min-h-[400px] text-base leading-relaxed border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg resize-none bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-400"
                      required
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded">
                      {formData.crm_needs.length} characters
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 The more details you provide, the better we can tailor your CRM solution
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
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

        </div>
      </div>

      <Footer />
      
      {/* Meeting Scheduler Modal */}
      {showScheduler && (
        <MeetingScheduler onClose={() => setShowScheduler(false)} />
      )}
    </div>
  );
};

export default ContactDirect;
