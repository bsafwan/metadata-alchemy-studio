import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import NewConversationDialog from '@/components/NewConversationDialog';
import ConversationView from '@/components/ConversationView';

interface Conversation {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
  project: {
    id: string;
    project_name: string;
  };
  latest_message?: {
    message_content: string;
    sender_name: string;
    sender_type: string;
    created_at: string;
  };
  message_count: number;
}

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Get conversations with project info and latest message and message count
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          projects!conversations_project_id_fkey(id, project_name),
          conversation_messages (
            message_content,
            sender_name,
            sender_type,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Process conversations to get latest message and count
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
          project: conv.projects,
          latest_message: latestMessage,
          message_count: messages.length
        };
      });

      setConversations(processedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

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
      />
    );
  }

  if (loading) {
    return <div>Loading conversations...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Conversations</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline">{conversations.length} Total</Badge>
          <NewConversationDialog onConversationCreated={fetchConversations} />
        </div>
      </div>

      {conversations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Start your first conversation with our support team
            </p>
            <NewConversationDialog onConversationCreated={fetchConversations} />
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
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {conv.project.project_name}
                          </Badge>
                        </div>
                        {conv.latest_message ? (
                          <>
                            <span className="font-medium">
                              {conv.latest_message.sender_type === 'user' ? 'You' : conv.latest_message.sender_name}:
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
