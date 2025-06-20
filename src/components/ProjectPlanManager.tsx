
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  React.useEffect(() => {
    fetchProjectPlan();
  }, [projectId]);

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

  const savePlan = async () => {
    if (!planDetails.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('project_plans')
        .insert({
          project_id: projectId,
          plan_details: planDetails,
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success('Project plan saved successfully');
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
      const { error } = await supabase
        .from('project_plans')
        .update({ status })
        .eq('id', plan.id);

      if (error) throw error;
      
      toast.success(`Plan ${status} successfully`);
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
            ? 'Create and manage the project overview plan' 
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
            <Button onClick={savePlan} disabled={loading || !planDetails.trim()}>
              {loading ? 'Saving...' : 'Save Project Plan'}
            </Button>
          </>
        ) : (
          plan && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {plan.plan_details}
                </pre>
              </div>
              {plan.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => updatePlanStatus('confirmed')} 
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Confirm Plan
                  </Button>
                  <Button 
                    onClick={() => updatePlanStatus('rejected')} 
                    disabled={loading}
                    variant="destructive"
                  >
                    Reject Plan
                  </Button>
                </div>
              )}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
