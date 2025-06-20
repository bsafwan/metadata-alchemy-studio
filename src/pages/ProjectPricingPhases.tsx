
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ProjectPlanManager from '@/components/ProjectPlanManager';
import ProjectPhaseManager from '@/components/ProjectPhaseManager';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProjectPricingPhases() {
  const { user } = useAuth();

  const { data: project, isLoading, refetch } = useQuery({
    queryKey: ['user-project', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Real-time subscription for project updates
  useEffect(() => {
    if (!project?.id) return;

    const channel = supabase
      .channel('project-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public', 
          table: 'projects',
          filter: `id=eq.${project.id}`
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [project?.id, refetch]);

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
          <p className="text-muted-foreground">No active project found. Please contact support if you believe this is an error.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Planning & Pricing</h2>
        <p className="text-muted-foreground">
          Project: {project.project_name} | Status: {project.status}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600">Real-time updates enabled</span>
        </div>
      </div>

      <ProjectPlanManager 
        projectId={project.id} 
        isAdminView={false}
        onPlanUpdate={refetchData}
      />
      
      <ProjectPhaseManager 
        projectId={project.id} 
        isAdminView={false}
        onPhaseUpdate={refetchData}
      />
    </div>
  );
}
