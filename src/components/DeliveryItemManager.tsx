import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  Upload, 
  Link as LinkIcon, 
  Lock,
  Github,
  Database,
  Server,
  Globe,
  FileText,
  Key,
  Video,
  Settings,
  Download,
  X
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';
import { EmailService } from '@/utils/emailService';
import FileUploader from '@/components/FileUploader';
import FileDisplay from '@/components/FileDisplay';

interface DeliveryItem {
  id: string;
  project_id: string;
  item_type: string;
  title: string;
  description: string | null;
  content: Json;
  files: Json;
  links: Json;
  status: string;
  requires_full_payment: boolean;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface DeliveryItemManagerProps {
  projectId: string;
  isAdminView?: boolean;
  paymentCompleted?: boolean;
}

export default function DeliveryItemManager({ 
  projectId, 
  isAdminView = false, 
  paymentCompleted = false 
}: DeliveryItemManagerProps) {
  const [deliveryItems, setDeliveryItems] = useState<DeliveryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState<{open: boolean, item: DeliveryItem | null}>({open: false, item: null});
  const [uploadModal, setUploadModal] = useState<{open: boolean, item: DeliveryItem | null}>({open: false, item: null});
  const [formData, setFormData] = useState({
    content: '',
    files: [] as any[],
    links: [] as any[],
    admin_notes: '',
    status: 'pending'
  });
  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    fetchDeliveryItems();
    initializeDeliveryItems();
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          project_name,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setProjectData(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const fetchDeliveryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('delivery_items')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const typedData = (data || []).map(item => ({
        ...item,
        content: item.content || {},
        files: item.files || [],
        links: item.links || []
      })) as DeliveryItem[];
      
      setDeliveryItems(typedData);
    } catch (error) {
      console.error('Error fetching delivery items:', error);
    }
  };

  const initializeDeliveryItems = async () => {
    try {
      const { data: existingItems } = await supabase
        .from('delivery_items')
        .select('id')
        .eq('project_id', projectId);

      if (!existingItems || existingItems.length === 0) {
        const { error } = await supabase.rpc('initialize_default_delivery_items', {
          p_project_id: projectId
        });
        
        if (error) throw error;
        fetchDeliveryItems();
      }
    } catch (error) {
      console.error('Error initializing delivery items:', error);
    }
  };

  const updateDeliveryItem = async () => {
    if (!editModal.item || !projectData) return;

    setLoading(true);
    try {
      let contentJson = {};
      try {
        contentJson = JSON.parse(formData.content || '{}');
      } catch (e) {
        contentJson = {};
      }

      const previousStatus = editModal.item.status;
      const newStatus = formData.status;

      const { error } = await supabase
        .from('delivery_items')
        .update({
          content: contentJson,
          files: formData.files,
          links: formData.links,
          admin_notes: formData.admin_notes,
          status: formData.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', editModal.item.id);

      if (error) throw error;

      if (isAdminView && previousStatus !== newStatus) {
        const statusMessages = {
          'pending': 'is being prepared',
          'ready': 'is ready for review',
          'delivered': 'has been delivered'
        };

        const emailSuccess = await EmailService.sendEmail({
          to: [projectData.users.email],
          subject: `Delivery Update: ${editModal.item.title}`,
          template: 'delivery-update',
          templateData: {
            client_name: `${projectData.users.first_name} ${projectData.users.last_name}`,
            project_name: projectData.project_name,
            item_title: editModal.item.title,
            item_description: editModal.item.description || 'Project deliverable',
            status: newStatus,
            status_message: statusMessages[newStatus as keyof typeof statusMessages] || 'has been updated',
            admin_notes: formData.admin_notes || '',
            update_date: new Date().toLocaleDateString()
          }
        });

        if (newStatus === 'delivered') {
          const adminEmails = ['admin@elismet.com'];
          await EmailService.sendEmail({
            to: adminEmails,
            subject: `✅ Delivery Item Completed: ${editModal.item.title}`,
            template: 'admin-delivery-update',
            templateData: {
              project_name: projectData.project_name,
              client_name: `${projectData.users.first_name} ${projectData.users.last_name}`,
              item_title: editModal.item.title,
              completion_date: new Date().toLocaleDateString(),
              admin_notes: formData.admin_notes || 'No additional notes'
            }
          });
        }

        if (emailSuccess) {
          toast.success('Delivery item updated and client notified');
        } else {
          toast.success('Delivery item updated (email notification failed)');
        }
      } else {
        toast.success('Delivery item updated successfully');
      }

      setEditModal({open: false, item: null});
      fetchDeliveryItems();
    } catch (error) {
      console.error('Error updating delivery item:', error);
      toast.error('Failed to update delivery item');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: any[]) => {
    if (!uploadModal.item) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('delivery_items')
        .update({
          files: files,
          updated_at: new Date().toISOString()
        })
        .eq('id', uploadModal.item.id);

      if (error) throw error;

      toast.success('Files uploaded successfully');
      setUploadModal({open: false, item: null});
      fetchDeliveryItems();
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed to upload files');
    } finally {
      setLoading(false);
    }
  };

  const getItemIcon = (itemType: string) => {
    switch (itemType) {
      case 'github_repo': return <Github className="w-5 h-5" />;
      case 'supabase_admin': return <Database className="w-5 h-5" />;
      case 'vps_access': return <Server className="w-5 h-5" />;
      case 'domain_setup': return <Globe className="w-5 h-5" />;
      case 'management_docs': return <FileText className="w-5 h-5" />;
      case 'api_keys_setup': return <Key className="w-5 h-5" />;
      case 'management_video': return <Video className="w-5 h-5" />;
      case 'integration_video': return <Video className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'ready': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'ready': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const canViewItem = (item: DeliveryItem) => {
    if (isAdminView) return true;
    return !item.requires_full_payment || paymentCompleted;
  };

  const canDownloadFiles = (item: DeliveryItem) => {
    if (isAdminView) return true;
    return paymentCompleted && (!item.requires_full_payment || paymentCompleted);
  };

  const openEditModal = (item: DeliveryItem) => {
    setEditModal({open: true, item});
    setFormData({
      content: JSON.stringify(item.content || {}, null, 2),
      files: Array.isArray(item.files) ? item.files : [],
      links: Array.isArray(item.links) ? item.links : [],
      admin_notes: item.admin_notes || '',
      status: item.status
    });
  };

  const openUploadModal = (item: DeliveryItem) => {
    setUploadModal({open: true, item});
  };

  const renderFiles = (files: Json, item: DeliveryItem) => {
    if (!Array.isArray(files) || files.length === 0) return null;
    
    const canDownload = canDownloadFiles(item);
    
    return (
      <div className="space-y-2">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Package className="w-4 h-4" />
          Files ({files.length})
          {!canDownload && <Lock className="w-4 h-4 text-amber-500" />}
        </h4>
        <div className="grid gap-2">
          {files.map((file: any, index: number) => (
            <div key={index} className={`border rounded-lg p-3 ${!canDownload ? 'opacity-50' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText className="w-4 h-4" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    {file.size && (
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {canDownload ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = file.url;
                          link.download = file.name;
                          link.click();
                        }}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600">
                      <Lock className="w-4 h-4" />
                      <span className="text-xs">Payment Required</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLinks = (links: Json, item: DeliveryItem) => {
    if (!Array.isArray(links) || links.length === 0) return null;
    
    const canAccess = canDownloadFiles(item);
    
    return (
      <div className="space-y-2">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          Links ({links.length})
          {!canAccess && <Lock className="w-4 h-4 text-amber-500" />}
        </h4>
        <div className="flex flex-wrap gap-2">
          {links.map((link: any, index: number) => (
            <Button 
              key={index} 
              size="sm" 
              variant="outline" 
              disabled={!canAccess}
              onClick={() => canAccess && window.open(link.url, '_blank')}
              className={!canAccess ? 'opacity-50' : ''}
            >
              <LinkIcon className="w-4 h-4 mr-1" />
              {link.title || 'Link'}
              {!canAccess && <Lock className="w-4 h-4 ml-1" />}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = (content: Json, item: DeliveryItem) => {
    if (!content || typeof content !== 'object' || Object.keys(content).length === 0) return null;
    
    const canView = canDownloadFiles(item);
    
    return (
      <div className="text-sm">
        <div className="flex items-center gap-2 mb-2">
          <strong>Details:</strong>
          {!canView && <Lock className="w-4 h-4 text-amber-500" />}
        </div>
        {canView ? (
          <pre className="bg-gray-50 p-2 rounded mt-1 text-xs overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
        ) : (
          <div className="bg-amber-50 p-2 rounded border border-amber-200">
            <p className="text-xs text-amber-700">Content restricted - Payment required</p>
          </div>
        )}
      </div>
    );
  };

  const completedItems = deliveryItems.filter(item => item.status === 'delivered').length;
  const totalItems = deliveryItems.length;
  const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Delivery</h2>
        <Badge variant="outline">
          {completedItems} / {totalItems} Delivered
        </Badge>
      </div>

      {totalItems > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Delivery Progress
            </CardTitle>
            <CardDescription>
              {Math.round(progressPercent)}% of delivery items completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Completed: {completedItems}</span>
              <span>Remaining: {totalItems - completedItems}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {deliveryItems.map((item) => (
          <Card key={item.id} className={!canViewItem(item) ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-blue rounded-lg flex items-center justify-center">
                    {getItemIcon(item.item_type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {item.title}
                      {item.requires_full_payment && !paymentCompleted && !isAdminView && (
                        <Lock className="w-4 h-4 text-amber-500" />
                      )}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(item.status)} className="gap-1">
                    {getStatusIcon(item.status)}
                    {item.status}
                  </Badge>
                  {isAdminView && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openUploadModal(item)}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openEditModal(item)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {canViewItem(item) ? (
                <div className="space-y-4">
                  {renderContent(item.content, item)}
                  {renderFiles(item.files, item)}
                  {renderLinks(item.links, item)}

                  {item.admin_notes && (
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Admin Notes:</strong> {item.admin_notes}
                      </p>
                    </div>
                  )}

                  {!paymentCompleted && item.requires_full_payment && !isAdminView && (
                    <div className="bg-amber-50 p-3 rounded border border-amber-200">
                      <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">Payment Required for Full Access</p>
                          <p className="text-xs text-amber-700">Complete all payments to download files and access links</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-amber-500" />
                  <p>This delivery item requires full payment completion</p>
                  <p className="text-xs">Complete all payments to unlock access</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      {uploadModal.open && uploadModal.item && (
        <Dialog open={uploadModal.open} onOpenChange={() => setUploadModal({open: false, item: null})}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Files: {uploadModal.item.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <FileUploader 
                onFilesUploaded={handleFileUpload}
                maxFiles={10}
                acceptedTypes={['*/*']}
              />
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setUploadModal({open: false, item: null})}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {editModal.open && editModal.item && (
        <Dialog open={editModal.open} onOpenChange={() => setEditModal({open: false, item: null})}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Delivery Item: {editModal.item.title}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div>
                <Label htmlFor="content">Content (JSON)</Label>
                <Textarea
                  id="content"
                  placeholder='{"url": "https://github.com/repo", "credentials": "..."}'
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  placeholder="Internal notes about this delivery item..."
                  value={formData.admin_notes}
                  onChange={(e) => setFormData({...formData, admin_notes: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setEditModal({open: false, item: null})}
              >
                Cancel
              </Button>
              <Button onClick={updateDeliveryItem} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
