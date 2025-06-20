
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface NewConversationDialogProps {
  onConversationCreated: () => void;
}

const NewConversationDialog = ({ onConversationCreated }: NewConversationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !subject.trim() || !message.trim()) return;

    setLoading(true);
    try {
      // Create conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          subject: subject.trim()
        })
        .select()
        .single();

      if (convError) throw convError;

      // Add first message
      const { error: msgError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: 'user',
          sender_name: `${user.first_name} ${user.last_name}`,
          sender_email: user.email,
          message_content: message.trim()
        });

      if (msgError) throw msgError;

      // Send email notification
      await fetch(`https://gemhywggtdryovqmalqh.supabase.co/functions/v1/send-conversation-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlbWh5d2dndGRyeW92cW1hbHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ4MzEsImV4cCI6MjA2NTk0MDgzMX0.PjNg5nqMq7qdPdw-PWNj-b0NtRYxgx9zpJSFdtL8Gig`
        },
        body: JSON.stringify({
          conversationId: conversation.id,
          messageContent: message.trim()
        })
      });

      toast.success('Conversation started successfully!');
      setSubject('');
      setMessage('');
      setOpen(false);
      onConversationCreated();
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to start conversation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start New Conversation</DialogTitle>
          <DialogDescription>
            Send a message directly to our support team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What would you like to discuss?"
              required
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              'Sending...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewConversationDialog;
