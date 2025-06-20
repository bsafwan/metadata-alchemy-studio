import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Send, Paperclip, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminNewConversationDialogProps {
  onConversationCreated: () => void;
  preSelectedProjectId?: string;
}

interface Project {
  id: string;
  project_name: string;
  status: string;
  user_id: string;
  users: {
    first_name: string;
    last_name: string;
    email: string;
    business_name: string;
  };
}

const AdminNewConversationDialog = ({ onConversationCreated, preSelectedProjectId }: AdminNewConversationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(preSelectedProjectId || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      fetchProjects();
    }
  }, [open]);

  useEffect(() => {
    if (preSelectedProjectId) {
      setSelectedProjectId(preSelectedProjectId);
    }
  }, [preSelectedProjectId]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          project_name,
          status,
          user_id,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);

      if (data && data.length > 0 && !selectedProjectId && !preSelectedProjectId) {
        setSelectedProjectId(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    }
  };

  const uploadFiles = async (conversationId: string): Promise<Array<{name: string; url: string; type: string}>> => {
    if (!files || files.length === 0) return [];

    const uploadedFiles = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const filePath = `${conversationId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('conversation-files')
          .upload(filePath, file);

        if (uploadError) {
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
    if (!selectedProjectId || (!subject.trim() || (!message.trim() && (!files || files.length === 0)))) return;
    if (loading) return;

    setLoading(true);
    
    try {
      const selectedProject = projects.find(p => p.id === selectedProjectId);
      if (!selectedProject) throw new Error('Project not found');

      // Create conversation
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert({
          user_id: selectedProject.user_id,
          project_id: selectedProjectId,
          subject: subject.trim()
        })
        .select()
        .single();

      if (convError) {
        console.error('Conversation creation error:', convError);
        throw new Error('Failed to create conversation');
      }

      // Upload files
      const attachments = await uploadFiles(conversation.id);

      // Add admin message
      const { error: msgError } = await supabase
        .from('conversation_messages')
        .insert({
          conversation_id: conversation.id,
          sender_type: 'admin',
          sender_name: 'Elismet Support Team',
          sender_email: 'support@elismet.com',
          message_content: message.trim() || '(File attachment)',
          attachments: attachments
        });

      if (msgError) {
        console.error('Message creation error:', msgError);
        throw new Error('Failed to send message');
      }

      // Send email notification to project owner
      try {
        await supabase.functions.invoke('send-conversation-email', {
          body: {
            conversationId: conversation.id,
            messageContent: message.trim() || '(File attachment)',
            attachments
          }
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast.success('Conversation started successfully!');
      setSubject('');
      setMessage('');
      setFiles(null);
      setSelectedProjectId(preSelectedProjectId || (projects[0]?.id || ''));
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setOpen(false);
      onConversationCreated();
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Start New Conversation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Start New Conversation (Admin)</DialogTitle>
          <DialogDescription className="text-lg">
            Start a conversation with a project owner
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
          {!preSelectedProjectId && (
            <div className="space-y-3">
              <Label htmlFor="project" className="text-base font-medium">Project *</Label>
              {projects.length > 0 ? (
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId} required>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.project_name} - {project.users.business_name} ({project.users.first_name} {project.users.last_name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600">No active projects found.</p>
                </div>
              )}
            </div>
          )}

          {selectedProject && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Conversation will be sent to:</h4>
              <p className="text-blue-700">
                {selectedProject.users.first_name} {selectedProject.users.last_name} ({selectedProject.users.email})
              </p>
              <p className="text-sm text-blue-600">
                Business: {selectedProject.users.business_name} | Project: {selectedProject.project_name}
              </p>
            </div>
          )}
          
          <div className="space-y-3">
            <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What would you like to discuss?"
              required
              className="h-12 text-base"
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-medium">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              className="resize-none text-base min-h-[200px]"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Attachments (optional)</Label>
            <div className="flex items-center gap-3">
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
                className="h-12 px-6"
              >
                <Paperclip className="w-5 h-5 mr-2" />
                Add Files
              </Button>
              <span className="text-base text-muted-foreground">
                {files && files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
              </span>
            </div>
            
            {files && files.length > 0 && (
              <div className="border rounded-lg p-6 space-y-3 bg-gray-50">
                <p className="text-base font-medium text-gray-700">Selected files:</p>
                {Array.from(files).map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-4 rounded border">
                    <div className="flex items-center gap-3">
                      {isImage(file.type) ? (
                        <Image className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      )}
                      <span className="text-base font-medium">{file.name}</span>
                      <span className="text-sm text-gray-500">({formatFileSize(file.size)})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading || !selectedProjectId || (!subject.trim() || (!message.trim() && (!files || files.length === 0)))} 
            className="w-full h-14 text-lg"
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminNewConversationDialog;
