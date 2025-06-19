
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Send, Building, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { saveCRMInquiry } from '@/utils/crmInquiryService';

const ContactDirect = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    crm_needs: ''
  });

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
      const success = await saveCRMInquiry(formData);
      
      if (success) {
        toast({
          title: "Inquiry Submitted!",
          description: "We've received your CRM requirements and will contact you soon with a customized proposal.",
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Get Started
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CRM Plan Inquiry</h1>
            <p className="text-gray-600">Tell us about your business and CRM requirements</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    CRM Requirements
                  </CardTitle>
                  <CardDescription>
                    Share your business details and CRM needs for a customized solution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company_name" className="flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          Company Name *
                        </Label>
                        <Input
                          id="company_name"
                          type="text"
                          value={formData.company_name}
                          onChange={(e) => handleInputChange('company_name', e.target.value)}
                          placeholder="Your Company Name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="contact@yourcompany.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="crm_needs">
                        Tell us about your CRM needs *
                      </Label>
                      <Textarea
                        id="crm_needs"
                        value={formData.crm_needs}
                        onChange={(e) => handleInputChange('crm_needs', e.target.value)}
                        placeholder="Describe your business requirements, current challenges, team size, integration needs, specific features you're looking for, budget range, timeline, etc."
                        className="min-h-[200px] resize-vertical"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit CRM Inquiry'}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">What to Include?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800 space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Business Information</h4>
                    <p>• Industry type & company size<br/>• Current CRM challenges<br/>• Team structure</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Technical Requirements</h4>
                    <p>• Integration needs<br/>• Data migration requirements<br/>• Security & compliance needs</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Project Details</h4>
                    <p>• Budget expectations<br/>• Timeline requirements<br/>• Success metrics</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Our team reviews your requirements</li>
                    <li>• We prepare a customized CRM proposal</li>
                    <li>• Schedule a consultation call</li>
                    <li>• Provide detailed project timeline</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Response time:</strong> Within 24 hours
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactDirect;
