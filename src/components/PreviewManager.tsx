
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Eye, CheckCircle, XCircle, Clock, MessageSquare, Link as LinkIcon, Github, Image, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Preview {
  id: string;
  project_id: string;
  phase_id: string;
  title: string;
  description: string | null;
  preview_files: any[];
  status: string;
  user_feedback: string | null;
  approved_at: string | null;
  created_at: string;
  project_phases: {
    phase_name: string;
    phase_order: number;
  };
}

interface ProjectPhase {
  id: string;
  phase_name: string;
  phase_order: number;
  status: string;
}

interface PreviewManagerProps {
  projectId: string;
  isAdminView?: boolean;
}

export default function PreviewManager({ projectId, isAdminView = false }: PreviewManagerProps) {
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phase_id: '',
    title: '',
    description: '',
    preview_files: [{ type: 'link', url: '', description: '' }]
  });

  useEffect(() => {
    fetchPreviews();
    fetchPhases();
    
    // Real-time subscription
    const channel = supabase
      .channel('previews')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'previews',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          fetchPreviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId]);

  const fetchPreviews = async () => {
    try {
      const { data, error } = await supabase
        .from('previews')
        .select(`
          *,
          project_phases(phase_name, phase_order)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPreviews(data || []);
    } catch (error) {
      console.error('Error fetching previews:', error);
    }
  };

  const fetchPhases = async () => {
    try {
      const { data, error } = await supabase
        .from('project_phases')
        .select('id, phase_name, phase_order, status')
        .eq('project_id', projectId)
        .order('phase_order', { ascending: true });

      if (error) throw error;
      setPhases(data || []);
    } catch (error) {
      console.error('Error fetching phases:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.phase_id) {
      toast.error('Title and Phase are required');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('previews')
        .insert([{
          project_id: projectId,
          phase_id: formData.phase_id,
          title: formData.title,
          description: formData.description,
          preview_files: formData.preview_files.filter(file => file.url)
        }]);
      
      if (error) throw error;
      toast.success('Preview created');
      resetForm();
    } catch (error) {
      console.error('Error creating preview:', error);
      toast.error('Failed to create preview');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      phase_id: '',
      title: '',
      description: '',
      preview_files: [{ type: 'link', url: '', description: '' }]
    });
    setShowForm(false);
  };

  const addPreviewFile = () => {
    setFormData({
      ...formData,
      preview_files: [...formData.preview_files, { type: 'link', url: '', description: '' }]
    });
  };

  const updatePreviewFile = (index: number, field: string, value: string) => {
    const updated = [...formData.preview_files];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, preview_files: updated });
  };

  const removePreviewFile = (index: number) => {
    setFormData({
      ...formData,
      preview_files: formData.preview_files.filter((_, i) => i !== index)
    });
  };

  const handleApproval = async (previewId: string, status: string, feedback?: string) => {
    try {
      const updateData: any = { status };
      if (status === 'approved') {
        updateData.approved_at = new Date().toISOString();
      }
      if (feedback) {
        updateData.user_feedback = feedback;
      }

      const { error } = await supabase
        .from('previews')
        .update(updateData)
        .eq('id', previewId);
      
      if (error) throw error;
      toast.success(`Preview ${status}`);
    } catch (error) {
      console.error('Error updating preview:', error);
      toast.error('Failed to update preview');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      case 'revision_requested': return 'outline';
      default: return 'secondary';
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'file': return <FileText className="w-4 h-4" />;
      default: return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Phase Previews</h2>
        {isAdminView && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Preview
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phase_id">Phase</Label>
                  <Select value={formData.phase_id} onValueChange={(value) => setFormData({ ...formData, phase_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phases.map((phase) => (
                        <SelectItem key={phase.id} value={phase.id}>
                          {phase.phase_order}. {phase.phase_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Preview Files/Links</Label>
                  <Button type="button" size="sm" onClick={addPreviewFile}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
                {formData.preview_files.map((file, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                    <Select
                      value={file.type}
                      onValueChange={(value) => updatePreviewFile(index, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="file">File</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="URL"
                      value={file.url}
                      onChange={(e) => updatePreviewFile(index, 'url', e.target.value)}
                    />
                    <Input
                      placeholder="Description"
                      value={file.description}
                      onChange={(e) => updatePreviewFile(index, 'description', e.target.value)}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removePreviewFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Preview'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {previews.map((preview) => (
          <Card key={preview.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {preview.title}
                    <Badge variant={getStatusColor(preview.status)}>
                      {preview.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Phase {preview.project_phases.phase_order}: {preview.project_phases.phase_name}
                  </CardDescription>
                </div>
                {preview.status === 'approved' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {preview.description && (
                <p className="text-sm text-muted-foreground mb-4">{preview.description}</p>
              )}

              {preview.preview_files.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Files & Links:</h4>
                  {preview.preview_files.map((file: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                      {getFileTypeIcon(file.type)}
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {file.description || file.url}
                      </a>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(preview.created_at).toLocaleDateString()}
                  {preview.approved_at && (
                    <span className="ml-2">
                      • Approved: {new Date(preview.approved_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!isAdminView && preview.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApproval(preview.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const feedback = prompt('Feedback (optional):');
                          handleApproval(preview.id, 'rejected', feedback || undefined);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {preview.user_feedback && (
                <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-sm">
                  <strong>Feedback:</strong> {preview.user_feedback}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {previews.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Eye className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No previews available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
