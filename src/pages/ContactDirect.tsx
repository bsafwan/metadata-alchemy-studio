import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { saveCRMInquiry } from '@/utils/crmInquiryService';

const ContactDirect = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState('');
  const [sourcePage, setSourcePage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    crm_needs: ''
  });

  useEffect(() => {
    let identifier = localStorage.getItem('user_identifier');
    if (!identifier) {
      identifier = 'USR-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
      localStorage.setItem('user_identifier', identifier);
    }
    setUserIdentifier(identifier);
  }, []);

  useEffect(() => {
    const businessProblems = searchParams.get('business-problems');
    const sourcePageParam = searchParams.get('source-page');
    if (businessProblems) {
      setFormData(prev => ({ ...prev, crm_needs: decodeURIComponent(businessProblems) }));
    }
    if (sourcePageParam) {
      setSourcePage(decodeURIComponent(sourcePageParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name || !formData.email || !formData.phone || !formData.crm_needs) {
      toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const productLabel = selectedProduct === 'docwise' ? 'DocWise Pro' : selectedProduct === 'other' ? 'Other' : '';
      const inquiryWithIdentifier = {
        ...formData,
        crm_needs: productLabel ? `[${productLabel}] ${formData.crm_needs}` : formData.crm_needs,
        user_identifier: userIdentifier,
        source_page: sourcePage || 'Direct'
      };

      const success = await saveCRMInquiry(inquiryWithIdentifier);
      if (success) {
        toast({ title: "Inquiry Submitted!", description: "We've received your message. We'll get back to you soon." });
        setFormData({ company_name: '', email: '', phone: '', crm_needs: '' });
        setSelectedProduct('');
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">Tell us what you need. We'll respond within 24 hours.</p>
          </div>

          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground text-center">Contact Us</CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Fill out the form below and we'll get back to you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {sourcePage && (
                  <Input value={sourcePage} className="bg-muted text-muted-foreground" readOnly disabled />
                )}

                <Input
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Company or full name"
                  required
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Email address"
                    required
                  />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Phone number"
                    required
                  />
                </div>

                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product or service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="docwise">DocWise Pro</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  value={formData.crm_needs}
                  onChange={(e) => handleInputChange('crm_needs', e.target.value)}
                  placeholder="Describe what you're looking for — a product inquiry, custom project, partnership, or anything else."
                  className="min-h-[200px] resize-none"
                  required
                />

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Send Message
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
    </div>
  );
};

export default ContactDirect;
