
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Key, Plus, Edit, Eye, EyeOff, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ApiKey {
  id: string;
  project_id: string;
  key_name: string;
  key_description: string | null;
  key_value: string | null;
  key_type: string;
  service_name: string;
  is_required: boolean;
  status: string;
  provided_by: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface ProjectApiKeyManagerProps {
  projectId: string;
  isAdminView?: boolean;
}

export default function ProjectApiKeyManager({ projectId, isAdminView = false }: ProjectApiKeyManagerProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const [showKey, setShowKey] = useState<{[key: string]: boolean}>({});
  const [editModal, setEditModal] = useState<{open: boolean, key: ApiKey | null, isNew: boolean}>({
    open: false, 
    key: null, 
    isNew: false
  });
  const [formData, setFormData] = useState({
    key_name: '',
    key_description: '',
    key_value: '',
    key_type: 'production',
    service_name: '',
    is_required: false,
    admin_notes: ''
  });

  useEffect(() => {
    fetchApiKeys();
  }, [projectId]);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('project_api_keys')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    }
  };

  const saveApiKey = async () => {
    setLoading(true);
    try {
      if (editModal.isNew) {
        const { error } = await supabase
          .from('project_api_keys')
          .insert([{
            project_id: projectId,
            ...formData,
            status: 'pending',
            provided_by: isAdminView ? 'admin' : 'client'
          }]);

        if (error) throw error;
        toast.success('API key added successfully');
      } else if (editModal.key) {
        const { error } = await supabase
          .from('project_api_keys')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editModal.key.id);

        if (error) throw error;
        toast.success('API key updated successfully');
      }

      setEditModal({open: false, key: null, isNew: false});
      fetchApiKeys();
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    try {
      const { error } = await supabase
        .from('project_api_keys')
        .delete()
        .eq('id', keyId);

      if (error) throw error;
      toast.success('API key deleted successfully');
      fetchApiKeys();
    } catch (error) {
      console.error('Error deleting API key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const updateKeyStatus = async (keyId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('project_api_keys')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', keyId);

      if (error) throw error;
      toast.success('API key status updated');
      fetchApiKeys();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const openNewKeyModal = () => {
    setEditModal({open: true, key: null, isNew: true});
    setFormData({
      key_name: '',
      key_description: '',
      key_value: '',
      key_type: 'production',
      service_name: '',
      is_required: false,
      admin_notes: ''
    });
  };

  const openEditModal = (key: ApiKey) => {
    setEditModal({open: true, key, isNew: false});
    setFormData({
      key_name: key.key_name,
      key_description: key.key_description || '',
      key_value: key.key_value || '',
      key_type: key.key_type,
      service_name: key.service_name,
      is_required: key.is_required,
      admin_notes: key.admin_notes || ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'configured': return 'default';
      case 'provided': return 'secondary';
      case 'pending': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'configured': return <CheckCircle className="w-4 h-4" />;
      case 'provided': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({...prev, [keyId]: !prev[keyId]}));
  };

  const maskKey = (key: string) => {
    if (!key) return 'Not provided';
    const visibleLength = Math.min(4, key.length);
    return key.substring(0, visibleLength) + '*'.repeat(Math.max(0, key.length - visibleLength));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">API Keys Management</h2>
        {isAdminView && (
          <Button onClick={openNewKeyModal}>
            <Plus className="w-4 h-4 mr-2" />
            Add API Key
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-blue rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {apiKey.key_name}
                      {apiKey.is_required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {apiKey.service_name} • {apiKey.key_type}
                      {apiKey.key_description && ` • ${apiKey.key_description}`}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(apiKey.status)} className="gap-1">
                    {getStatusIcon(apiKey.status)}
                    {apiKey.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">API Key:</Label>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                  {showKey[apiKey.id] ? (apiKey.key_value || 'Not provided') : maskKey(apiKey.key_value || '')}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleKeyVisibility(apiKey.id)}
                >
                  {showKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>

              {apiKey.admin_notes && (
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Notes:</strong> {apiKey.admin_notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 border-t pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditModal(apiKey)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>

                {isAdminView && apiKey.status === 'provided' && (
                  <Button
                    size="sm"
                    onClick={() => updateKeyStatus(apiKey.id, 'configured')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Configured
                  </Button>
                )}

                {isAdminView && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteApiKey(apiKey.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {apiKeys.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center">
              <Key className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No API keys configured yet</p>
              {isAdminView && (
                <Button className="mt-3" onClick={openNewKeyModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First API Key
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit/Add Modal */}
      {editModal.open && (
        <Dialog open={editModal.open} onOpenChange={() => setEditModal({open: false, key: null, isNew: false})}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editModal.isNew ? 'Add New API Key' : 'Edit API Key'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="key_name">Key Name *</Label>
                <Input
                  id="key_name"
                  placeholder="e.g., Stripe Secret Key"
                  value={formData.key_name}
                  onChange={(e) => setFormData({...formData, key_name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="service_name">Service Name *</Label>
                <Input
                  id="service_name"
                  placeholder="e.g., stripe, openai, sendgrid"
                  value={formData.service_name}
                  onChange={(e) => setFormData({...formData, service_name: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="key_type">Key Type</Label>
                <select 
                  id="key_type"
                  value={formData.key_type}
                  onChange={(e) => setFormData({...formData, key_type: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="production">Production</option>
                  <option value="testing">Testing</option>
                  <option value="sample">Sample</option>
                </select>
              </div>

              <div>
                <Label htmlFor="key_value">API Key Value</Label>
                <Input
                  id="key_value"
                  type="password"
                  placeholder="Enter the actual API key"
                  value={formData.key_value}
                  onChange={(e) => setFormData({...formData, key_value: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="key_description">Description</Label>
                <Input
                  id="key_description"
                  placeholder="Brief description of this key's purpose"
                  value={formData.key_description}
                  onChange={(e) => setFormData({...formData, key_description: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_required"
                  checked={formData.is_required}
                  onChange={(e) => setFormData({...formData, is_required: e.target.checked})}
                />
                <Label htmlFor="is_required">This API key is required for the project</Label>
              </div>

              {isAdminView && (
                <div>
                  <Label htmlFor="admin_notes">Admin Notes</Label>
                  <Textarea
                    id="admin_notes"
                    placeholder="Internal notes about this API key..."
                    value={formData.admin_notes}
                    onChange={(e) => setFormData({...formData, admin_notes: e.target.value})}
                    rows={3}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setEditModal({open: false, key: null, isNew: false})}
              >
                Cancel
              </Button>
              <Button onClick={saveApiKey} disabled={loading}>
                {loading ? 'Saving...' : (editModal.isNew ? 'Add Key' : 'Save Changes')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
