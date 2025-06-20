
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProjectPlanManager from '@/components/ProjectPlanManager';
import ProjectPhaseManager from '@/components/ProjectPhaseManager';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AdminProjectPricingPhases() {
  const { projectId } = useParams();

  const { data: project, isLoading, refetch } = useQuery({
    queryKey: ['admin-project', projectId],
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

  // Real-time subscription for project updates
  useEffect(() => {
    if (!projectId) return;

    const channel = supabase
      .channel('admin-project-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, refetch]);

  const refetchData = () => {
    refetch();
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
        <h2 className="text-2xl font-bold">Manage Project Planning & Pricing</h2>
        <p className="text-muted-foreground">
          Project: {project.project_name} | Client: {project.users.first_name} {project.users.last_name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600">Real-time updates enabled</span>
        </div>
      </div>

      <ProjectPlanManager 
        projectId={projectId!} 
        isAdminView={true}
        onPlanUpdate={refetchData}
      />
      
      <ProjectPhaseManager 
        projectId={projectId!} 
        isAdminView={true}
        onPhaseUpdate={refetchData}
      />
    </div>
  );
}
