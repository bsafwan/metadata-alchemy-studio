
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { FolderKanban, Calendar, DollarSign, User, Settings, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AdminProjects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
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

  const calculateProgress = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 10;
      case 'in_progress': return 60;
      case 'active': return 75;
      case 'review': return 90;
      case 'completed': return 100;
      default: return 25;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Projects</h2>
        <Badge variant="outline">{projects?.length || 0} Total Projects</Badge>
      </div>

      <div className="grid gap-6">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-orange rounded-lg flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{project.project_name}</CardTitle>
                    <CardDescription>
                      Client: {project.users.first_name} {project.users.last_name} ({project.users.business_name})
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Button size="sm" asChild>
                    <Link to={`/admin/project/${project.id}`}>
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{calculateProgress(project.status)}%</span>
                </div>
                <Progress value={calculateProgress(project.status)} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {project.users.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created {new Date(project.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <FolderKanban className="w-4 h-4" />
                  {project.selected_features?.length || 0} features
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!projects || projects.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No projects found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
