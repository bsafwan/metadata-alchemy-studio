
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const CRMAssessment = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companySize: '',
    currentCRM: '',
    challenges: '',
    budget: '',
    timeline: '',
    priorities: []
  });

  const handleSubmit = () => {
    toast({
      title: "Assessment Completed!",
      description: "Thank you for completing the CRM assessment. We'll contact you soon with recommendations.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Get Started
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              CRM Assessment
            </h1>
            <p className="text-xl text-gray-600">
              Help us understand your needs to recommend the perfect CRM solution
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select onValueChange={(value) => setFormData({...formData, companySize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="200+">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="challenges">Main Challenges</Label>
                  <Textarea
                    placeholder="Describe your current challenges..."
                    value={formData.challenges}
                    onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  Complete Assessment
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CRMAssessment;
