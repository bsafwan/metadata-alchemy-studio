
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Bell, Users, Loader2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

export default function AdminMessages() {
  const { data: conversationsOverview, isLoading } = useQuery({
    queryKey: ['admin-conversations-overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name),
          projects(project_name, id),
          conversation_messages(id, created_at)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: projectsWithMessages } = useQuery({
    queryKey: ['projects-with-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name),
          conversations(id, subject, status, updated_at)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const messageStats = {
    totalMessages: conversationsOverview?.reduce((acc, conv) => acc + (conv.conversation_messages?.length || 0), 0) || 0,
    activeConversations: conversationsOverview?.filter(conv => conv.status === 'active').length || 0,
    todayMessages: conversationsOverview?.filter(conv => 
      new Date(conv.updated_at).toDateString() === new Date().toDateString()
    ).length || 0,
    totalProjects: projectsWithMessages?.length || 0
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
        <h2 className="text-2xl font-bold">Messages & Conversations Overview</h2>
        <div className="flex gap-2">
          <Badge variant="outline">{messageStats.activeConversations} Active</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.todayMessages}</div>
            <p className="text-xs text-muted-foreground">Updated today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <Mail className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{messageStats.activeConversations}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">With conversations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projects with Conversations</CardTitle>
          <CardDescription>Manage conversations by project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectsWithMessages?.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{project.project_name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {project.users.business_name}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {project.conversations?.length || 0} conversations
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Client: {project.users.first_name} {project.users.last_name} ({project.users.email})
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {project.status} • Created: {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" asChild>
                      <Link to={`/admin/project/${project.id}/messages`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Messages
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {project.conversations && project.conversations.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-200">
                    <p className="text-sm font-medium mb-2">Recent Conversations:</p>
                    {project.conversations.slice(0, 2).map((conv: any) => (
                      <div key={conv.id} className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{conv.subject}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={conv.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {conv.status}
                          </Badge>
                          <span>{new Date(conv.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    {project.conversations.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{project.conversations.length - 2} more conversations
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {!projectsWithMessages || projectsWithMessages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No projects with conversations found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
