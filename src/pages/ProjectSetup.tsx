
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FolderPlus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { EmailService } from '@/utils/emailService';

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

const ProjectSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [projectName, setProjectName] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customRequirements, setCustomRequirements] = useState('');
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) {
      toast({
        title: "Project Name Required",
        description: "Please enter a name for your project.",
        variant: "destructive"
      });
      return;
    }

    if (selectedFeatures.length === 0) {
      toast({
        title: "Select Features",
        description: "Please select at least one CRM feature you need.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create project in database with 'in_progress' status instead of 'pending'
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user!.id,
          project_name: projectName,
          selected_features: selectedFeatures,
          custom_requirements: customRequirements,
          current_challenges: currentChallenges,
          business_goals: businessGoals,
          status: 'in_progress'
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Mark user as having completed initial setup
      await supabase
        .from('users')
        .update({ has_completed_initial_setup: true })
        .eq('id', user!.id);

      // Create initial message for admin
      const messageContent = `New Project Request from ${user!.first_name} ${user!.last_name}

Business: ${user!.business_name} (${user!.business_category})
Email: ${user!.email}
Project Name: ${projectName}

Selected Features:
${selectedFeatures.map(f => crmFeatures.find(cf => cf.id === f)?.label).join('\n')}

Custom Requirements:
${customRequirements || 'None specified'}

Current Challenges:
${currentChallenges || 'None specified'}

Business Goals:
${businessGoals || 'None specified'}`;

      // Save message to database
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          user_id: user!.id,
          project_id: projectData.id,
          message_type: 'initial_project_request',
          content: messageContent,
          sender_email: user!.email,
          recipient_email: 'bsafwanjamil677@gmail.com'
        });

      if (messageError) throw messageError;

      // Send email notification to admin
      await EmailService.sendEmail({
        to: ['bsafwanjamil677@gmail.com'],
        subject: `New Project Request - ${projectName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Project Request</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Client Information</h3>
              <p><strong>Name:</strong> ${user!.first_name} ${user!.last_name}</p>
              <p><strong>Email:</strong> ${user!.email}</p>
              <p><strong>Business:</strong> ${user!.business_name}</p>
              <p><strong>Category:</strong> ${user!.business_category}</p>
            </div>
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Project Details</h3>
              <p><strong>Project Name:</strong> ${projectName}</p>
              <h4>Selected Features:</h4>
              <ul>
                ${selectedFeatures.map(f => `<li>${crmFeatures.find(cf => cf.id === f)?.label}</li>`).join('')}
              </ul>
              ${customRequirements ? `<p><strong>Custom Requirements:</strong><br>${customRequirements}</p>` : ''}
              ${currentChallenges ? `<p><strong>Current Challenges:</strong><br>${currentChallenges}</p>` : ''}
              ${businessGoals ? `<p><strong>Business Goals:</strong><br>${businessGoals}</p>` : ''}
            </div>
            <p>Please review and respond to the client.</p>
          </div>
        `,
        text: messageContent
      });

      // Set selected project
      localStorage.setItem('selected_project_id', projectData.id);

      toast({
        title: "Project Created!",
        description: "Your project has been submitted. We'll contact you within 24 hours.",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Project creation error:', error);
      toast({
        title: "Creation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Project</h1>
            <p className="text-gray-600">Tell us about your CRM needs for {user.business_name}</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FolderPlus className="w-5 h-5 mr-2" />
                Project Configuration
              </CardTitle>
              <CardDescription>
                Configure your custom CRM system requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    type="text"
                    placeholder="Enter a name for your CRM project"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>

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
                    placeholder="Describe any specific features or integrations you need..."
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentChallenges">What are your current business challenges?</Label>
                  <Textarea
                    id="currentChallenges"
                    placeholder="Tell us about the problems you're facing..."
                    value={currentChallenges}
                    onChange={(e) => setCurrentChallenges(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessGoals">What are your business goals for the next year?</Label>
                  <Textarea
                    id="businessGoals"
                    placeholder="Share your growth plans..."
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
                        <li>• Once approved, we'll start building your personalized system</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Creating Project..." : "Create Project"}
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

export default ProjectSetup;
