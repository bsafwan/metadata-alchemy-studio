
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Send, Paperclip, X, Image } from 'lucide-react';
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
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (conversationId: string): Promise<Array<{name: string; url: string; type: string}>> => {
    if (!files || files.length === 0) return [];

    const uploadedFiles = [];
    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${conversationId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('conversation-files')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

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
    } finally {
      setUploading(false);
    }

    return uploadedFiles;
  };

  const isImage = (type: string) => type.startsWith('image/');

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const removeFile = (index: number) => {
    if (files && fileInputRef.current) {
      const dt = new DataTransfer();
      const fileArray = Array.from(files);
      fileArray.splice(index, 1);
      fileArray.forEach(file => dt.items.add(file));
      fileInputRef.current.files = dt.files;
      setFiles(dt.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || (!subject.trim() || (!message.trim() && (!files || files.length === 0)))) return;

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

      // Upload files first
      const attachments = await uploadFiles(conversation.id);

      // Add first message
      const { error: msgError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: 'user',
          sender_name: `${user.first_name} ${user.last_name}`,
          sender_email: user.email,
          message_content: message.trim() || '(File attachment)',
          attachments: attachments
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
          messageContent: message.trim() || '(File attachment)',
          attachments
        })
      });

      toast.success('Conversation started successfully!');
      setSubject('');
      setMessage('');
      setFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Start New Conversation</DialogTitle>
          <DialogDescription className="text-base">
            Send a message directly to our support team with optional file attachments
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What would you like to discuss?"
              required
              className="h-11"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Attachments (optional)</Label>
            <div className="flex items-center gap-2">
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
                onClick={() => fileInputRef.current?.click()}
                className="h-10"
              >
                <Paperclip className="w-4 h-4 mr-2" />
                Add Files
              </Button>
              <span className="text-sm text-muted-foreground">
                {files && files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
              </span>
            </div>
            
            {files && files.length > 0 && (
              <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                {Array.from(files).map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center gap-2">
                      {isImage(file.type) ? (
                        <Image className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Paperclip className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading || uploading || (!subject.trim() || (!message.trim() && (!files || files.length === 0)))} 
            className="w-full h-11"
          >
            {loading || uploading ? (
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
