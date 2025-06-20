
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProjectPlanManager from '@/components/ProjectPlanManager';
import ProjectPhaseManager from '@/components/ProjectPhaseManager';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ProjectPricingPhases() {
  const { projectId } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('id', projectId!)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!projectId
  });

  const refetchData = () => {
    // This would trigger a refetch of any dependent data
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground">Project not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Planning & Pricing</h2>
        <p className="text-muted-foreground">
          Project: {project.project_name} | Client: {project.users.first_name} {project.users.last_name}
        </p>
      </div>

      <ProjectPlanManager 
        projectId={projectId!} 
        isAdminView={false}
        onPlanUpdate={refetchData}
      />
      
      <ProjectPhaseManager 
        projectId={projectId!} 
        isAdminView={false}
        onPhaseUpdate={refetchData}
      />
    </div>
  );
}
