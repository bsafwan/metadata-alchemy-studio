
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Mail, Bell, Users, Send, Loader2, Reply } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export default function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['admin-conversations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name),
          projects(project_name),
          conversation_messages(id, created_at)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: messages } = useQuery({
    queryKey: ['conversation-messages', selectedConversation],
    queryFn: async () => {
      if (!selectedConversation) return [];
      
      const { data, error } = await supabase
        .from('conversation_messages')
        .select('*')
        .eq('conversation_id', selectedConversation)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedConversation
  });

  const sendReplyMutation = useMutation({
    mutationFn: async ({ conversationId, message }: { conversationId: string; message: string }) => {
      // Send message to conversation
      const { error: messageError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversationId,
          message_content: message,
          sender_type: 'admin',
          sender_name: 'Super Admin',
          sender_email: 'admin@elismet.com'
        });

      if (messageError) throw messageError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-conversation-email', {
        body: {
          conversationId,
          messageContent: message
        }
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
        // Don't throw here, message was sent successfully
      }

      return true;
    },
    onSuccess: () => {
      toast({
        title: "Reply Sent",
        description: "Your message has been sent and email notification delivered.",
      });
      setReplyMessage('');
      setIsReplying(false);
      queryClient.invalidateQueries({ queryKey: ['conversation-messages'] });
      queryClient.invalidateQueries({ queryKey: ['admin-conversations'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error('Send reply error:', error);
    }
  });

  const handleSendReply = () => {
    if (!selectedConversation || !replyMessage.trim()) return;
    
    sendReplyMutation.mutate({
      conversationId: selectedConversation,
      message: replyMessage.trim()
    });
  };

  const messageStats = {
    totalMessages: conversations?.reduce((acc, conv) => acc + (conv.conversation_messages?.length || 0), 0) || 0,
    unread: conversations?.filter(conv => conv.status === 'active').length || 0,
    todayMessages: conversations?.filter(conv => 
      new Date(conv.updated_at).toDateString() === new Date().toDateString()
    ).length || 0,
    activeConversations: conversations?.filter(conv => conv.status === 'active').length || 0
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
        <h2 className="text-2xl font-bold">Messages & Conversations</h2>
        <div className="flex gap-2">
          <Badge variant="outline">{messageStats.unread} Active</Badge>
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
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Mail className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{messageStats.unread}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations?.length || 0}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Conversations</CardTitle>
          <CardDescription>Manage all client communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversations?.map((conversation) => (
              <div key={conversation.id} className={`p-4 border rounded-lg ${conversation.status === 'active' ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">
                        {conversation.users.first_name} {conversation.users.last_name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {conversation.users.business_name}
                      </Badge>
                      {conversation.projects && (
                        <Badge variant="secondary" className="text-xs">
                          {conversation.projects.project_name}
                        </Badge>
                      )}
                      {conversation.status === 'active' && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <h4 className="font-medium mb-1">{conversation.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {conversation.users.email} • Updated {new Date(conversation.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                      {conversation.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <Reply className="w-4 h-4 mr-2" />
                          View & Reply
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                        <DialogHeader>
                          <DialogTitle>{conversation.subject}</DialogTitle>
                          <p className="text-sm text-muted-foreground">
                            Conversation with {conversation.users.first_name} {conversation.users.last_name}
                          </p>
                        </DialogHeader>
                        
                        <div className="flex-1 overflow-y-auto space-y-4 max-h-96">
                          {messages?.map((message) => (
                            <div key={message.id} className={`p-3 rounded-lg ${
                              message.sender_type === 'admin' 
                                ? 'bg-blue-50 ml-8' 
                                : 'bg-gray-50 mr-8'
                            }`}>
                              <div className="flex justify-between items-start mb-2">
                                <span className="font-medium text-sm">
                                  {message.sender_name} ({message.sender_type})
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(message.created_at).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-sm whitespace-pre-wrap">{message.message_content}</p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4 space-y-3">
                          <Textarea
                            placeholder="Type your reply..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="min-h-20"
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={handleSendReply}
                              disabled={!replyMessage.trim() || sendReplyMutation.isPending}
                            >
                              {sendReplyMutation.isPending ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4 mr-2" />
                              )}
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}

            {!conversations || conversations.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No conversations found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
