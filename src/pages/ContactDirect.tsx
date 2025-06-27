import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Building, Mail, Phone } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { saveCRMInquiry } from '@/utils/crmInquiryService';

const ContactDirect = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState<string>('');
  const [sourcePage, setSourcePage] = useState<string>('');
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

          {/* Main Form */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
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
