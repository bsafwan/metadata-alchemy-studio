import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Loader2 } from 'lucide-react';
import ProjectPaymentManager from '@/components/ProjectPaymentManager';

export default function PaymentsAndDues() {
  const { user } = useAuth();

  const { data: projects, isLoading } = useQuery({
    queryKey: ['user-projects-payments', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Payments & Dues</h2>
          <p className="text-muted-foreground">Manage your project payments</p>
        </div>
        
        <Card>
          <CardContent className="py-8 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No active projects</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payments & Dues</h2>
        <p className="text-muted-foreground">Manage your project payments</p>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {project.project_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium">Project Progress</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={project.progression_percentage || 0} className="flex-1" />
                    <span className="text-sm font-medium">{project.progression_percentage || 0}%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-lg font-bold">${(project.total_project_amount || 0).toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">50% Milestone</p>
                  <p className="text-lg font-bold">${((project.total_project_amount || 0) * 0.5).toFixed(2)}</p>
                </div>
              </div>

              {(project.progression_percentage || 0) >= 50 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    🎉 Project has reached 50% - Payment initialized
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <ProjectPaymentManager projectId={project.id} isAdminView={false} />
        </div>
      ))}
    </div>
  );
}
