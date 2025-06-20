import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Paperclip, Download, Image, ArrowLeft, Loader2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Attachment {
  name: string;
  url: string;
  type: string;
  size?: number;
}

interface Message {
  id: string;
  sender_type: 'user' | 'admin';
  sender_name: string;
  sender_email: string;
  message_content: string;
  attachments: Attachment[];
  created_at: string;
}

interface DatabaseMessage {
  id: string;
  sender_type: string;
  sender_name: string;
  sender_email: string;
  message_content: string;
  attachments: any;
  created_at: string;
}

interface Conversation {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
  project_id: string | null;
  users: {
    first_name: string;
    last_name: string;
    email: string;
    business_name: string;
  };
}

export default function ProjectAdminMessages() {
  const { projectId } = useParams();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('Current projectId:', projectId);

  // First query all conversations to understand the data structure
  const { data: allConversations } = useQuery({
    queryKey: ['all-conversations-debug'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      console.log('All conversations:', data);
      return data;
    }
  });

  // Query conversations for this project - first try exact match, then fallback to user-based search
  const { data: conversations, isLoading } = useQuery({
    queryKey: ['project-conversations', projectId],
    queryFn: async () => {
      console.log('Fetching conversations for project:', projectId);
      
      // First try to find by exact project_id match
      let { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('project_id', projectId)
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }

      console.log('Direct project conversations:', data);

      // If no direct matches, try to find conversations for users who have this project
      if (!data || data.length === 0) {
        console.log('No direct project conversations found, trying user-based search...');
        
        // Get the project owner first
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('user_id')
          .eq('id', projectId)
          .single();

        if (projectError) {
          console.error('Error fetching project:', projectError);
          return [];
        }

        // Now get conversations for this user that might need project association
        const { data: userConversations, error: userError } = await supabase
          .from('conversations')
          .select(`
            *,
            users!inner(first_name, last_name, email, business_name)
          `)
          .eq('user_id', projectData.user_id)
          .order('updated_at', { ascending: false });

        if (userError) {
          console.error('Error fetching user conversations:', userError);
          return [];
        }

        console.log('User conversations found:', userConversations);
        
        // Update conversations to have the correct project_id
        if (userConversations && userConversations.length > 0) {
          console.log('Updating conversations with project_id...');
          
          for (const conv of userConversations) {
            if (!conv.project_id) {
              const { error: updateError } = await supabase
                .from('conversations')
                .update({ project_id: projectId })
                .eq('id', conv.id);
              
              if (updateError) {
                console.error('Error updating conversation project_id:', updateError);
              } else {
                console.log(`Updated conversation ${conv.id} with project_id ${projectId}`);
              }
            }
          }
          
          // Refresh the data after updates
          queryClient.invalidateQueries({ queryKey: ['project-conversations'] });
        }

        return userConversations || [];
      }
      
      return data as Conversation[];
    },
    enabled: !!projectId
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
      
      return (data as DatabaseMessage[]).map((msg): Message => ({
        id: msg.id,
        sender_type: msg.sender_type as 'user' | 'admin',
        sender_name: msg.sender_name,
        sender_email: msg.sender_email,
        message_content: msg.message_content,
        attachments: Array.isArray(msg.attachments) ? msg.attachments as Attachment[] : [],
        created_at: msg.created_at
      }));
    },
    enabled: !!selectedConversation
  });

  // Create test conversation mutation
  const createTestConversationMutation = useMutation({
    mutationFn: async () => {
      // First get the user for this project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('user_id')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      const { data, error } = await supabase
        .from('conversations')
        .insert({
          project_id: projectId,
          user_id: projectData.user_id,
          subject: 'Test Conversation for Project',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Test conversation created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['project-conversations'] });
    },
    onError: (error) => {
      console.error('Error creating test conversation:', error);
      toast({
        title: "Error",
        description: "Failed to create test conversation",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    if (selectedConversation) {
      const channel = supabase
        .channel(`conversation-${selectedConversation}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'conversation_messages',
            filter: `conversation_id=eq.${selectedConversation}`
          },
          (payload) => {
            console.log('New message received:', payload);
            queryClient.invalidateQueries({ queryKey: ['conversation-messages', selectedConversation] });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation, queryClient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const uploadFiles = async (): Promise<Attachment[]> => {
    if (!files || files.length === 0) return [];

    const uploadedFiles = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const filePath = `${selectedConversation}/${fileName}`;

        console.log('Uploading file:', fileName);

        const { error: uploadError } = await supabase.storage
          .from('conversation-files')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Failed to upload ${file.name}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('conversation-files')
          .getPublicUrl(filePath);

        uploadedFiles.push({
          name: file.name,
          url: publicUrl,
          type: file.type || 'application/octet-stream'
        });
      }
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload files",
        variant: "destructive"
      });
      throw error;
    }

    return uploadedFiles;
  };

  const handleDownload = async (attachment: Attachment) => {
    try {
      console.log('Downloading file:', attachment.name);
      
      const response = await fetch(attachment.url);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = attachment.name;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "Success",
        description: `Downloaded ${attachment.name}`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download file",
        variant: "destructive"
      });
    }
  };

  const sendReplyMutation = useMutation({
    mutationFn: async ({ conversationId, message, attachments }: { 
      conversationId: string; 
      message: string; 
      attachments: Attachment[] 
    }) => {
      const { error: messageError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversationId,
          message_content: message,
          sender_type: 'admin',
          sender_name: 'Super Admin',
          sender_email: 'admin@elismet.com',
          attachments: attachments as any
        });

      if (messageError) throw messageError;

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      const { error: emailError } = await supabase.functions.invoke('send-conversation-email', {
        body: {
          conversationId,
          messageContent: message,
          attachments
        }
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
      }

      return true;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
      setNewMessage('');
      setFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      queryClient.invalidateQueries({ queryKey: ['conversation-messages'] });
      queryClient.invalidateQueries({ queryKey: ['project-conversations'] });
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConversation || (!newMessage.trim() && (!files || files.length === 0)) || loading) return;

    setLoading(true);
    
    try {
      const attachments = await uploadFiles();

      sendReplyMutation.mutate({
        conversationId: selectedConversation,
        message: newMessage.trim() || '(File attachment)',
        attachments
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const isImage = (type: string) => type.startsWith('image/');

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!selectedConversation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Project Conversations</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{conversations?.length || 0} Conversations</Badge>
            <Button 
              onClick={() => createTestConversationMutation.mutate()}
              disabled={createTestConversationMutation.isPending}
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Test Conversation
            </Button>
          </div>
        </div>

        {/* Debug Information */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-sm">Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Project ID:</strong> {projectId}</p>
              <p><strong>Total conversations in DB:</strong> {allConversations?.length || 0}</p>
              <p><strong>Project-specific conversations:</strong> {conversations?.length || 0}</p>
              {allConversations && allConversations.length > 0 && (
                <div>
                  <p><strong>All conversations project_ids:</strong></p>
                  <ul className="list-disc list-inside pl-4">
                    {allConversations.map(conv => (
                      <li key={conv.id}>
                        {conv.subject} - project_id: {conv.project_id || 'null'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {conversations?.map((conversation) => (
            <Card key={conversation.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedConversation(conversation.id)}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{conversation.subject}</CardTitle>
                      <CardDescription>
                        Client: {conversation.users.first_name} {conversation.users.last_name} ({conversation.users.business_name})
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                    {conversation.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(conversation.updated_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}

          {!conversations || conversations.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No conversations found for this project</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try creating a test conversation using the button above.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  const currentConversation = conversations?.find(c => c.id === selectedConversation);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setSelectedConversation(null)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Conversations
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{currentConversation?.subject}</h2>
          <p className="text-muted-foreground">
            Client: {currentConversation?.users.first_name} {currentConversation?.users.last_name} ({currentConversation?.users.business_name})
          </p>
        </div>
        <Badge variant={currentConversation?.status === 'active' ? 'default' : 'secondary'}>
          {currentConversation?.status}
        </Badge>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-lg ${
                      message.sender_type === 'admin'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">
                        {message.sender_name}
                      </span>
                      <span className="text-xs opacity-70">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    {message.message_content && (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.message_content}
                      </div>
                    )}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="border border-white/20 rounded-lg p-3 bg-black/10">
                            {isImage(attachment.type) ? (
                              <div>
                                <img
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="max-w-full h-auto rounded-md mb-2"
                                  style={{ maxHeight: '250px' }}
                                />
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium">{attachment.name}</span>
                                  <button
                                    onClick={() => handleDownload(attachment)}
                                    className="text-xs underline hover:opacity-80 flex items-center gap-1 cursor-pointer"
                                  >
                                    <Download className="w-3 h-3" />
                                    Download
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Paperclip className="w-4 h-4" />
                                  <span className="text-xs font-medium">{attachment.name}</span>
                                </div>
                                <button
                                  onClick={() => handleDownload(attachment)}
                                  className="text-xs underline hover:opacity-80 flex items-center gap-1 cursor-pointer"
                                  >
                                  <Download className="w-3 h-3" />
                                  Download
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4 flex-shrink-0 bg-white">
            <form onSubmit={handleSendMessage} className="space-y-3">
              {files && files.length > 0 && (
                <div className="border rounded-lg p-3 space-y-2 bg-gray-50">
                  <p className="text-sm font-medium">Attached files:</p>
                  {Array.from(files).map((file, index) => (
                    <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      {isImage(file.type) ? <Image className="w-4 h-4" /> : <Paperclip className="w-4 h-4" />}
                      {file.name} ({formatFileSize(file.size)})
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={3}
                  className="flex-1 resize-none"
                  disabled={loading || sendReplyMutation.isPending}
                />
                <div className="flex flex-col gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-10 w-10"
                    disabled={loading || sendReplyMutation.isPending}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading || sendReplyMutation.isPending || (!newMessage.trim() && (!files || files.length === 0))}
                    size="sm"
                    className="h-10 w-10"
                  >
                    {loading || sendReplyMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
