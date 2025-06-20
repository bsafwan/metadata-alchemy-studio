import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ConversationView from '@/components/ConversationView';
import AdminNewConversationDialog from '@/components/AdminNewConversationDialog';

interface Conversation {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
  latest_message?: {
    message_content: string;
    sender_name: string;
    sender_type: string;
    created_at: string;
  };
  message_count: number;
}

export default function ProjectAdminMessages() {
  const { projectId } = useParams();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { data: project, isLoading: projectLoading } = useQuery({
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

  const fetchConversations = async () => {
    if (!projectId) return;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          conversation_messages (
            message_content,
            sender_name,
            sender_type,
            created_at
          )
        `)
        .eq('project_id', projectId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const processedConversations = data.map(conv => {
        const messages = conv.conversation_messages || [];
        const latestMessage = messages.length > 0 
          ? messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
          : null;

        return {
          id: conv.id,
          subject: conv.subject,
          status: conv.status,
          created_at: conv.created_at,
          updated_at: conv.updated_at,
          latest_message: latestMessage,
          message_count: messages.length
        };
      });

      setConversations(processedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchConversations();
    }
  }, [projectId]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  if (selectedConversation) {
    return (
      <ConversationView
        conversationId={selectedConversation}
        onBack={() => setSelectedConversation(null)}
        isAdminView={true}
      />
    );
  }

  if (projectLoading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/admin/project/${projectId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Project
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Messages - {project.project_name}</h2>
          <p className="text-muted-foreground">
            Client: {project.users.first_name} {project.users.last_name} ({project.users.business_name})
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline">{conversations.length} Total Conversations</Badge>
        </div>
        <AdminNewConversationDialog 
          onConversationCreated={fetchConversations} 
          preSelectedProjectId={projectId}
        />
      </div>

      {conversations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start the first conversation with this project owner
            </p>
            <AdminNewConversationDialog 
              onConversationCreated={fetchConversations} 
              preSelectedProjectId={projectId}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {conversations.map((conv) => (
            <Card 
              key={conv.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedConversation(conv.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{conv.subject}</CardTitle>
                      <CardDescription className="text-sm">
                        {conv.latest_message ? (
                          <>
                            <span className="font-medium">
                              {conv.latest_message.sender_type === 'admin' ? 'Admin' : `${project.users.first_name} ${project.users.last_name}`}:
                            </span>{' '}
                            {conv.latest_message.message_content.length > 60
                              ? `${conv.latest_message.message_content.substring(0, 60)}...`
                              : conv.latest_message.message_content}
                          </>
                        ) : (
                          'No messages yet'
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(conv.latest_message?.created_at || conv.created_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={conv.status === 'active' ? 'default' : 'secondary'}>
                        {conv.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {conv.message_count} msg{conv.message_count !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
