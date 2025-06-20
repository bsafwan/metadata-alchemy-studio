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
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Json } from '@/integrations/supabase/types';
import { EmailService } from '@/utils/emailService';

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
      
      // Ensure data is properly typed
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
      // Check if items already exist
      const { data: existingItems } = await supabase
        .from('delivery_items')
        .select('id')
        .eq('project_id', projectId);

      if (!existingItems || existingItems.length === 0) {
        // Initialize default delivery items
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

      // Send email notification for status changes
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

        // Also notify admins about the delivery update
        if (newStatus === 'delivered') {
          const adminEmails = ['admin@elismet.com']; // Replace with actual admin emails
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

  // Helper function to safely render links
  const renderLinks = (links: Json) => {
    if (!Array.isArray(links) || links.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-2">
        {links.map((link: any, index: number) => (
          <Button key={index} size="sm" variant="outline" asChild>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <LinkIcon className="w-4 h-4 mr-1" />
              {link.title || 'Link'}
            </a>
          </Button>
        ))}
      </div>
    );
  };

  // Helper function to safely render content
  const renderContent = (content: Json) => {
    if (!content || typeof content !== 'object' || Object.keys(content).length === 0) return null;
    
    return (
      <div className="text-sm">
        <strong>Details:</strong>
        <pre className="bg-gray-50 p-2 rounded mt-1 text-xs overflow-auto">
          {JSON.stringify(content, null, 2)}
        </pre>
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
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openEditModal(item)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {canViewItem(item) ? (
                <div className="space-y-3">
                  {renderContent(item.content)}
                  {renderLinks(item.links)}

                  {item.admin_notes && (
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Admin Notes:</strong> {item.admin_notes}
                      </p>
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
