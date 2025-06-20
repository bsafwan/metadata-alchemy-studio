
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, DollarSign, User, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProjectProgressionManager from '@/components/ProjectProgressionManager';

export default function ProjectAdminOverview() {
  const { projectId } = useParams();

  const { data: project, isLoading, refetch } = useQuery({
    queryKey: ['admin-project', projectId],
    queryFn: async () => {
      if (!projectId) throw new Error('Project ID is required');
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name, business_category)
        `)
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!projectId
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'in_progress': return 'default';
      case 'completed': return 'secondary';
      case 'on_hold': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Overview</h2>
        <Badge variant={getStatusColor(project.status)}>
          {project.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Client Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Name: </span>
              {project.users.first_name} {project.users.last_name}
            </div>
            <div>
              <span className="font-medium">Business: </span>
              {project.users.business_name}
            </div>
            <div>
              <span className="font-medium">Industry: </span>
              {project.users.business_category}
            </div>
            <div>
              <span className="font-medium">Email: </span>
              {project.users.email}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Project Financials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Total Amount: </span>
              ${project.total_project_amount?.toFixed(2) || '0.00'}
            </div>
            <div>
              <span className="font-medium">50% Milestone: </span>
              ${((project.total_project_amount || 0) * 0.5).toFixed(2)}
            </div>
            <div>
              <span className="font-medium">Created: </span>
              {new Date(project.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <ProjectProgressionManager
        projectId={project.id}
        currentProgression={project.progression_percentage || 0}
        totalAmount={project.total_project_amount || 0}
        onProgressionUpdate={refetch}
      />

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Project Name</h4>
            <p className="text-muted-foreground">{project.project_name}</p>
          </div>
          
          {project.business_goals && (
            <div>
              <h4 className="font-medium mb-2">Business Goals</h4>
              <p className="text-muted-foreground">{project.business_goals}</p>
            </div>
          )}

          {project.selected_features && project.selected_features.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Selected Features</h4>
              <div className="flex flex-wrap gap-2">
                {project.selected_features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
