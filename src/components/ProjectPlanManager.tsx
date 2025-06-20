
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, FileText, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useZohoMail } from '@/hooks/useZohoMail';

interface ProjectPlan {
  id: string;
  plan_details: string;
  status: string;
  created_at: string;
}

interface ProjectPlanManagerProps {
  projectId: string;
  isAdminView?: boolean;
  onPlanUpdate?: () => void;
}

export default function ProjectPlanManager({ projectId, isAdminView = false, onPlanUpdate }: ProjectPlanManagerProps) {
  const [plan, setPlan] = useState<ProjectPlan | null>(null);
  const [planDetails, setPlanDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null);
  const { sendEmail, isSending } = useZohoMail();

  React.useEffect(() => {
    fetchProjectPlan();
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const fetchProjectPlan = async () => {
    try {
      const { data, error } = await supabase
        .from('project_plans')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setPlan(data);
      if (data) setPlanDetails(data.plan_details);
    } catch (error) {
      console.error('Error fetching project plan:', error);
    }
  };

  const sendPlanNotificationEmail = async (planData: ProjectPlan, action: 'new_plan' | 'confirmed' | 'rejected') => {
    if (!project) return;

    const customerName = `${project.users.first_name} ${project.users.last_name}`;
    
    // Fix email routing - admin sends to user, user sends to admin
    const recipientEmail = isAdminView 
      ? project.users.email  // Admin sends to user
      : 'bsafwanjamil677@gmail.com';  // User sends to admin
    
    let subject = '';
    let templateData = {};

    switch (action) {
      case 'new_plan':
        subject = `New Project Plan Available - ${project.project_name}`;
        templateData = {
          customerName,
          projectName: project.project_name,
          planDetails: planData.plan_details,
          action: 'A new project plan has been created for your review',
          actionRequired: 'Please review and confirm or provide feedback on the project plan',
          projectStatus: 'Plan Review Required'
        };
        break;

      case 'confirmed':
        subject = `Project Plan Confirmed - ${project.project_name}`;
        templateData = {
          customerName: 'Admin',
          projectName: project.project_name,
          planDetails: planData.plan_details,
          action: `${customerName} has confirmed the project plan`,
          actionRequired: 'You can now proceed with creating project phases and pricing',
          projectStatus: 'Plan Confirmed - Ready for Pricing'
        };
        break;

      case 'rejected':
        subject = `Project Plan Rejected - ${project.project_name}`;
        templateData = {
          customerName: 'Admin',
          projectName: project.project_name,
          planDetails: planData.plan_details,
          action: `${customerName} has rejected the project plan`,
          actionRequired: 'Please revise the project plan based on client feedback',
          projectStatus: 'Plan Rejected - Revision Needed'
        };
        break;
    }

    await sendEmail({
      to: [recipientEmail],
      subject,
      template: 'project-update',
      templateData
    });
  };

  const savePlan = async () => {
    if (!planDetails.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_plans')
        .insert({
          project_id: projectId,
          plan_details: planDetails,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      
      // Send email notification to user
      await sendPlanNotificationEmail(data, 'new_plan');
      
      toast.success('Project plan saved and user notified via email');
      fetchProjectPlan();
      onPlanUpdate?.();
    } catch (error) {
      console.error('Error saving plan:', error);
      toast.error('Failed to save project plan');
    } finally {
      setLoading(false);
    }
  };

  const updatePlanStatus = async (status: 'confirmed' | 'rejected') => {
    if (!plan) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_plans')
        .update({ status })
        .eq('id', plan.id)
        .select()
        .single();

      if (error) throw error;
      
      // Send email notification to admin
      await sendPlanNotificationEmail(data, status);
      
      toast.success(`Plan ${status} and admin notified via email`);
      fetchProjectPlan();
      onPlanUpdate?.();
    } catch (error) {
      console.error('Error updating plan status:', error);
      toast.error('Failed to update plan status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Project Plan & Overview
          {plan && (
            <Badge variant={getStatusColor(plan.status)} className="flex items-center gap-1">
              {getStatusIcon(plan.status)}
              {plan.status}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {isAdminView 
            ? 'Create and manage the project overview plan with email notifications' 
            : 'Review and confirm the project plan details'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdminView ? (
          <>
            <Textarea
              placeholder="Enter project plan details, overview, goals, and expectations..."
              value={planDetails}
              onChange={(e) => setPlanDetails(e.target.value)}
              rows={8}
              className="min-h-32"
            />
            <div className="flex items-center gap-2">
              <Button onClick={savePlan} disabled={loading || !planDetails.trim() || isSending}>
                {loading || isSending ? (
                  <>
                    <Mail className="w-4 h-4 mr-2 animate-pulse" />
                    Saving & Sending Email...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Save Plan & Notify User
                  </>
                )}
              </Button>
              {!plan && (
                <p className="text-sm text-muted-foreground">
                  User will receive an email notification when you save the plan
                </p>
              )}
            </div>
          </>
        ) : (
          plan ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-lg mb-3 text-blue-900">Project Overview</h3>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                    {plan.plan_details}
                  </pre>
                </div>
              </div>
              
              {plan.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => updatePlanStatus('confirmed')} 
                    disabled={loading || isSending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading || isSending ? (
                      <>
                        <Mail className="w-4 h-4 mr-2 animate-pulse" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Plan
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={() => updatePlanStatus('rejected')} 
                    disabled={loading || isSending}
                    variant="destructive"
                  >
                    {loading || isSending ? (
                      <>
                        <Mail className="w-4 h-4 mr-2 animate-pulse" />
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Plan
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {plan.status !== 'pending' && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {plan.status === 'confirmed' 
                      ? '✅ Plan confirmed! Admin has been notified via email.' 
                      : '❌ Plan rejected. Admin has been notified via email to revise.'}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No project plan available yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                The admin will create a project plan for your review
              </p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
