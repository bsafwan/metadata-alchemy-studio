import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Paperclip, Download, Image } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender_type: 'user' | 'admin';
  sender_name: string;
  sender_email: string;
  message_content: string;
  attachments: Array<{
    name: string;
    url: string;
    type: string;
    size?: number;
  }>;
  created_at: string;
}

interface Conversation {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ConversationViewProps {
  conversationId: string;
  onBack: () => void;
  isAdminView?: boolean;
}

const ConversationView = ({ conversationId, onBack, isAdminView = false }: ConversationViewProps) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchConversation();
    fetchMessages();
    
    // Subscribe to new messages for real-time updates
    const channel = supabase
      .channel(`conversation-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversation_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('New message received:', payload);
          const newMsg = payload.new as any;
          const formattedMessage: Message = {
            id: newMsg.id,
            sender_type: newMsg.sender_type as 'user' | 'admin',
            sender_name: newMsg.sender_name,
            sender_email: newMsg.sender_email,
            message_content: newMsg.message_content,
            attachments: Array.isArray(newMsg.attachments) ? newMsg.attachments as Array<{name: string; url: string; type: string; size?: number}> : [],
            created_at: newMsg.created_at
          };
          
          // Only add if it's not already in our messages (prevent duplicates)
          setMessages(prev => {
            const exists = prev.find(msg => msg.id === formattedMessage.id);
            if (exists) return prev;
            return [...prev, formattedMessage];
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversation_messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          console.log('Message updated:', payload);
          const updatedMsg = payload.new as any;
          const formattedMessage: Message = {
            id: updatedMsg.id,
            sender_type: updatedMsg.sender_type as 'user' | 'admin',
            sender_name: updatedMsg.sender_name,
            sender_email: updatedMsg.sender_email,
            message_content: updatedMsg.message_content,
            attachments: Array.isArray(updatedMsg.attachments) ? updatedMsg.attachments as Array<{name: string; url: string; type: string; size?: number}> : [],
            created_at: updatedMsg.created_at
          };
          
          setMessages(prev => prev.map(msg => 
            msg.id === formattedMessage.id ? formattedMessage : msg
          ));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversation = async () => {
    console.log('Fetching conversation:', conversationId);
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (error) {
      console.error('Error fetching conversation:', error);
      return;
    }

    console.log('Conversation fetched:', data);
    setConversation(data);
  };

  const fetchMessages = async () => {
    console.log('Fetching messages for conversation:', conversationId);
    const { data, error } = await supabase
      .from('conversation_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    console.log('Messages fetched:', data);
    const formattedMessages: Message[] = (data || []).map(msg => ({
      id: msg.id,
      sender_type: msg.sender_type as 'user' | 'admin',
      sender_name: msg.sender_name,
      sender_email: msg.sender_email,
      message_content: msg.message_content,
      attachments: Array.isArray(msg.attachments) ? msg.attachments as Array<{name: string; url: string; type: string; size?: number}> : [],
      created_at: msg.created_at
    }));

    setMessages(formattedMessages);
  };

  const uploadFiles = async (): Promise<Array<{name: string; url: string; type: string}>> => {
    if (!files || files.length === 0) return [];

    const uploadedFiles = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const filePath = `${conversationId}/${fileName}`;

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
      toast.error('Failed to upload files');
      throw error;
    }

    return uploadedFiles;
  };

  const handleDownload = async (attachment: {name: string; url: string; type: string}) => {
    try {
      console.log('Downloading file:', attachment.name);
      
      // Fetch the file as blob
      const response = await fetch(attachment.url);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      
      const blob = await response.blob();
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = attachment.name;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success(`Downloaded ${attachment.name}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (!newMessage.trim() && (!files || files.length === 0)) || loading) return;

    console.log('Sending message for user:', user.id);
    setLoading(true);
    
    try {
      const attachments = await uploadFiles();

      const senderType =  isAdminView ? 'admin' : 'user';
      const senderName = isAdminView ? 'Elismet Support Team' : `${user.first_name} ${user.last_name}`;
      const senderEmail = isAdminView ? 'support@elismet.com' : user.email;

      const { error: msgError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversationId,
          sender_type: senderType,
          sender_name: senderName,
          sender_email: senderEmail,
          message_content: newMessage.trim() || '(File attachment)',
          attachments: attachments
        });

      if (msgError) {
        console.error('Message creation error:', msgError);
        throw new Error('Failed to send message');
      }

      // Update conversation timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      // Send email notification
      try {
        await supabase.functions.invoke('send-conversation-email', {
          body: {
            conversationId,
            messageContent: newMessage.trim() || '(File attachment)',
            attachments
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      // Clear form immediately after successful submission
      setNewMessage('');
      setFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error((error as Error).message);
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

  if (!conversation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{conversation.subject}</h2>
          <p className="text-muted-foreground">
            Started {new Date(conversation.created_at).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
          {conversation.status}
        </Badge>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="text-lg">Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Messages Area with Scroll - Fixed height and proper scrolling */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-lg ${
                      message.sender_type === 'user'
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

          {/* Input Area - Fixed at bottom */}
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
                  disabled={loading}
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
                    disabled={loading}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading || (!newMessage.trim() && (!files || files.length === 0))}
                    size="sm"
                    className="h-10 w-10"
                  >
                    {loading ? '...' : <Send className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationView;
