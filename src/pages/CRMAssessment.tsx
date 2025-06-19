
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MessageSquare, CheckCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

const crmFeatures = [
  { id: 'customer_management', label: 'Customer Management & Contact Database' },
  { id: 'appointment_scheduling', label: 'Appointment Scheduling & Calendar' },
  { id: 'job_tracking', label: 'Job/Service Tracking & Status Updates' },
  { id: 'invoicing_billing', label: 'Invoicing & Billing System' },
  { id: 'payment_processing', label: 'Payment Processing & Tracking' },
  { id: 'inventory_management', label: 'Inventory & Equipment Management' },
  { id: 'employee_management', label: 'Employee & Team Management' },
  { id: 'reporting_analytics', label: 'Reporting & Analytics Dashboard' },
  { id: 'mobile_app', label: 'Mobile App for Field Workers' },
  { id: 'customer_portal', label: 'Customer Self-Service Portal' },
  { id: 'automated_reminders', label: 'Automated Reminders & Notifications' },
  { id: 'quote_estimation', label: 'Quote & Estimation Tools' }
];

const CRMAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');

  const registrationData = location.state?.registrationData;

  if (!registrationData) {
    navigate('/onboard');
    return null;
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFeatures.length === 0) {
      toast({
        title: "Select Features",
        description: "Please select at least one CRM feature you need.",
        variant: "destructive"
      });
      return;
    }

    const assessmentData = {
      ...registrationData,
      selectedFeatures,
      customRequirements,
      currentChallenges,
      businessGoals,
      registrationDate: new Date().toISOString()
    };

    console.log('Complete registration data:', assessmentData);

    toast({
      title: "Registration Complete!",
      description: "Welcome to Elismet! Your account has been created successfully.",
    });

    // Navigate to dashboard or login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/verify-otp" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Verification
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Your CRM Needs</h1>
            <p className="text-gray-600">Help us understand what you need to build the perfect business management system for {registrationData.businessName}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                CRM Requirements Assessment
              </CardTitle>
              <CardDescription>
                Select the features you need and tell us about your business challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">What CRM features do you need? *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {crmFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature.id}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                        />
                        <Label htmlFor={feature.id} className="text-sm font-normal">
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customRequirements">Any specific custom requirements?</Label>
                  <Textarea
                    id="customRequirements"
                    placeholder="Describe any specific features or integrations you need that aren't listed above..."
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentChallenges">What are your current business challenges?</Label>
                  <Textarea
                    id="currentChallenges"
                    placeholder="Tell us about the problems you're facing that you want this CRM to solve..."
                    value={currentChallenges}
                    onChange={(e) => setCurrentChallenges(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessGoals">What are your business goals for the next year?</Label>
                  <Textarea
                    id="businessGoals"
                    placeholder="Share your growth plans and how this CRM system can help you achieve them..."
                    value={businessGoals}
                    onChange={(e) => setBusinessGoals(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• We'll review your requirements and create a custom proposal</li>
                        <li>• Our team will contact you within 24 hours to discuss your needs</li>
                        <li>• We'll provide you with a timeline and pricing for your custom CRM</li>
                        <li>• Once approved, we'll start building your personalized business management system</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Complete Registration
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

export default CRMAssessment;
