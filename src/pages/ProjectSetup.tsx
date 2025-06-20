import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AVAILABLE_FEATURES = [
  'User Authentication',
  'Dashboard & Analytics',
  'Payment Processing',
  'File Upload & Management',
  'Real-time Chat',
  'Email Notifications',
  'API Integration',
  'Mobile Responsive Design',
  'Custom Reporting',
  'Third-party Integrations'
];

export default function ProjectSetup() {
  const [projectName, setProjectName] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [customRequirements, setCustomRequirements] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.has_completed_initial_setup) {
      navigate('/dashboard');
      return;
    }
  }, [user, navigate]);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || selectedFeatures.length === 0) return;

    setLoading(true);
    try {
      // Create the project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          project_name: projectName.trim(),
          selected_features: selectedFeatures,
          business_goals: businessGoals.trim() || null,
          current_challenges: currentChallenges.trim() || null,
          custom_requirements: customRequirements.trim() || null,
          status: 'pending'
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Create initial conversation for the project
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          project_id: project.id,
          subject: `Project Setup - ${projectName.trim()}`,
          status: 'active'
        })
        .select()
        .single();

      if (convError) throw convError;

      // Create initial welcome message
      const welcomeMessage = `Welcome to your new project: ${projectName}!

Project Details:
- Selected Features: ${selectedFeatures.join(', ')}
${businessGoals ? `- Business Goals: ${businessGoals}` : ''}
${currentChallenges ? `- Current Challenges: ${currentChallenges}` : ''}
${customRequirements ? `- Custom Requirements: ${customRequirements}` : ''}

Our team will review your project requirements and get back to you shortly with a detailed project plan and timeline. Feel free to ask any questions or provide additional information through this conversation system.`;

      const { error: msgError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: 'admin',
          sender_name: 'Elismet Team',
          sender_email: 'team@elismet.com',
          message_content: welcomeMessage
        });

      if (msgError) throw msgError;

      // Send email notification to super admin about new project
      try {
        await supabase.functions.invoke('send-conversation-email', {
          body: {
            conversationId: conversation.id,
            messageContent: welcomeMessage,
            attachments: []
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the whole operation if email fails
      }

      // Mark user setup as complete
      const { error: userError } = await supabase
        .from('users')
        .update({ has_completed_initial_setup: true })
        .eq('id', user.id);

      if (userError) throw userError;

      toast.success('Project setup completed successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error setting up project:', error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Project Setup</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Let's configure your project requirements and get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="projectName" className="text-base font-medium">Project Name *</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter your project name"
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Select Features *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AVAILABLE_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={feature}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                      />
                      <Label htmlFor={feature} className="text-sm font-medium cursor-pointer flex-1">
                        {feature}
                      </Label>
                      {selectedFeatures.includes(feature) && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
                {selectedFeatures.length === 0 && (
                  <p className="text-sm text-red-500">Please select at least one feature</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="businessGoals" className="text-base font-medium">Business Goals (Optional)</Label>
                <Textarea
                  id="businessGoals"
                  value={businessGoals}
                  onChange={(e) => setBusinessGoals(e.target.value)}
                  placeholder="Describe your main business objectives for this project"
                  rows={3}
                  className="resize-none text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="currentChallenges" className="text-base font-medium">Current Challenges (Optional)</Label>
                <Textarea
                  id="currentChallenges"
                  value={currentChallenges}
                  onChange={(e) => setCurrentChallenges(e.target.value)}
                  placeholder="What challenges are you facing that this project should address?"
                  rows={3}
                  className="resize-none text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="customRequirements" className="text-base font-medium">Custom Requirements (Optional)</Label>
                <Textarea
                  id="customRequirements"
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  placeholder="Any specific technical requirements or integrations needed?"
                  rows={3}
                  className="resize-none text-base"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading || !projectName.trim() || selectedFeatures.length === 0}
                className="w-full h-14 text-lg"
              >
                {loading ? (
                  'Setting up your project...'
                ) : (
                  <>
                    Complete Project Setup
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
