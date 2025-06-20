import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Monitor, Plus, Edit, Trash, Eye, Link as LinkIcon, Image, FileText, Video, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import FileUploader from './FileUploader';
import FileDisplay from './FileDisplay';

interface Demo {
  id: string;
  title: string;
  description: string | null;
  demo_type: string;
  demo_url: string | null;
  file_path: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  created_at: string;
  demo_files: any[];
}

interface DemoManagerProps {
  isAdminView?: boolean;
}

export default function DemoManager({ isAdminView = false }: DemoManagerProps) {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDemo, setEditingDemo] = useState<Demo | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    demo_type: 'link',
    demo_url: '',
    file_path: '',
    thumbnail_url: '',
    demo_files: []
  });

  useEffect(() => {
    fetchDemos();
    
    // Real-time subscription
    const channel = supabase
      .channel('demos')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'demos'
        },
        () => {
          fetchDemos();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDemos = async () => {
    try {
      const { data, error } = await supabase
        .from('demos')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDemos(data || []);
    } catch (error) {
      console.error('Error fetching demos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('Title is required');
      return;
    }

    setLoading(true);
    try {
      const demoData = {
        ...formData,
        demo_files: formData.demo_files || []
      };

      if (editingDemo) {
        const { error } = await supabase
          .from('demos')
          .update(demoData)
          .eq('id', editingDemo.id);
        
        if (error) throw error;
        toast.success('Demo updated');
      } else {
        const { error } = await supabase
          .from('demos')
          .insert([demoData]);
        
        if (error) throw error;
        toast.success('Demo created');
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving demo:', error);
      toast.error('Failed to save demo');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      demo_type: 'link',
      demo_url: '',
      file_path: '',
      thumbnail_url: '',
      demo_files: []
    });
    setShowForm(false);
    setEditingDemo(null);
  };

  const handleEdit = (demo: Demo) => {
    setFormData({
      title: demo.title,
      description: demo.description || '',
      demo_type: demo.demo_type,
      demo_url: demo.demo_url || '',
      file_path: demo.file_path || '',
      thumbnail_url: demo.thumbnail_url || '',
      demo_files: demo.demo_files || []
    });
    setEditingDemo(demo);
    setShowForm(true);
  };

  const handleFilesUploaded = (files: any[]) => {
    setFormData({ ...formData, demo_files: files });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this demo?')) return;
    
    try {
      const { error } = await supabase
        .from('demos')
        .update({ is_active: false })
        .eq('id', id);
      
      if (error) throw error;
      toast.success('Demo deleted');
    } catch (error) {
      console.error('Error deleting demo:', error);
      toast.error('Failed to delete demo');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'link': return <LinkIcon className="w-4 h-4" />;
      case 'upload': return <Download className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Business Demos</h2>
        {isAdminView && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Demo
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingDemo ? 'Edit Demo' : 'Create Demo'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="demo_type">Type</Label>
                  <Select value={formData.demo_type} onValueChange={(value) => setFormData({ ...formData, demo_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="upload">File Upload</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
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

              {formData.demo_type !== 'upload' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="demo_url">Demo URL</Label>
                    <Input
                      id="demo_url"
                      value={formData.demo_url}
                      onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                    <Input
                      id="thumbnail_url"
                      value={formData.thumbnail_url}
                      onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}

              {formData.demo_type === 'upload' && (
                <FileUploader
                  onFilesUploaded={handleFilesUploaded}
                  maxFiles={10}
                  acceptedTypes={['image/*', 'video/*', '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.zip']}
                />
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : (editingDemo ? 'Update' : 'Create')}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <Card key={demo.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(demo.demo_type)}
                  <CardTitle className="text-lg">{demo.title}</CardTitle>
                </div>
                <Badge variant="secondary">{demo.demo_type}</Badge>
              </div>
              {demo.description && (
                <CardDescription>{demo.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {demo.demo_files && demo.demo_files.length > 0 && (
                <FileDisplay files={demo.demo_files} />
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {new Date(demo.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  {demo.demo_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(demo.demo_url!, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  )}
                  {isAdminView && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(demo)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(demo.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {demos.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Monitor className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No demos available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
