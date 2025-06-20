
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PreviewManager from '@/components/PreviewManager';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ProjectAdminPreviews() {
  const { projectId } = useParams();

  const { data: project, isLoading } = useQuery({
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Project Previews</h2>
        <p className="text-muted-foreground">
          Project: {project.project_name} | Client: {project.users.first_name} {project.users.last_name}
        </p>
      </div>

      <PreviewManager projectId={project.id} isAdminView={true} />
    </div>
  );
}
