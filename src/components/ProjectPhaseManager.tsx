
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, DollarSign, MessageSquare, CheckCircle, XCircle, Clock, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useZohoMail } from '@/hooks/useZohoMail';

interface ProjectPhase {
  id: string;
  phase_name: string;
  admin_proposed_price: number | null;
  user_proposed_price: number | null;
  final_agreed_price: number | null;
  status: string;
  phase_order: number;
  created_at: string;
  pricing_negotiations?: Array<{
    id: string;
    proposed_by: string;
    proposed_price: number;
    message: string | null;
    status: string;
    created_at: string;
  }>;
}

interface ProjectPhaseManagerProps {
  projectId: string;
  isAdminView?: boolean;
  onPhaseUpdate?: () => void;
}

export default function ProjectPhaseManager({ projectId, isAdminView = false, onPhaseUpdate }: ProjectPhaseManagerProps) {
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [newPhaseName, setNewPhaseName] = useState('');
  const [newPhasePrice, setNewPhasePrice] = useState('');
  const [counterOffer, setCounterOffer] = useState<{ [key: string]: string }>({});
  const [negotiationMessage, setNegotiationMessage] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [project, setProject] = useState<any>(null);
  const { sendEmail, isSending } = useZohoMail();

  React.useEffect(() => {
    fetchPhases();
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const fetchPhases = async () => {
    try {
      const { data, error } = await supabase
        .from('project_phases')
        .select(`
          *,
          pricing_negotiations(*)
        `)
        .eq('project_id', projectId)
        .order('phase_order', { ascending: true });

      if (error) throw error;
      setPhases(data || []);
    } catch (error) {
      console.error('Error fetching phases:', error);
    }
  };

  const sendPricingNotificationEmail = async (phase: ProjectPhase, action: 'new_pricing' | 'counter_offer' | 'accepted') => {
    if (!project) return;

    const isAdminAction = isAdminView;
    const recipientEmail = isAdminAction ? 'bsafwanjamil677@gmail.com' : project.users.email;
    const customerName = `${project.users.first_name} ${project.users.last_name}`;
    
    let subject = '';
    let templateData = {};

    switch (action) {
      case 'new_pricing':
        subject = isAdminAction 
          ? `New Pricing Phases - ${project.project_name}`
          : `New Pricing Available - ${project.project_name}`;
        templateData = {
          customerName: isAdminAction ? 'Admin' : customerName,
          projectName: project.project_name,
          phaseName: phase.phase_name,
          proposedPrice: phase.admin_proposed_price,
          action: 'New pricing phases have been created',
          actionRequired: isAdminView ? 'Review and respond' : 'Review pricing and confirm or negotiate'
        };
        break;

      case 'counter_offer':
        subject = `Counter Offer Received - ${project.project_name}`;
        templateData = {
          customerName: isAdminAction ? 'Admin' : customerName,
          projectName: project.project_name,
          phaseName: phase.phase_name,
          proposedPrice: isAdminAction ? phase.admin_proposed_price : phase.user_proposed_price,
          action: 'A counter offer has been submitted',
          actionRequired: 'Review and respond to the counter offer'
        };
        break;

      case 'accepted':
        subject = `Phase Price Accepted - ${project.project_name}`;
        templateData = {
          customerName: isAdminAction ? 'Admin' : customerName,
          projectName: project.project_name,
          phaseName: phase.phase_name,
          proposedPrice: phase.final_agreed_price,
          action: 'Phase pricing has been accepted',
          actionRequired: 'Continue with project planning'
        };
        break;
    }

    await sendEmail({
      to: [recipientEmail],
      subject,
      template: 'project-update',
      templateData
    });
  };

  const addPhase = async () => {
    if (!newPhaseName.trim() || !newPhasePrice) return;
    
    setLoading(true);
    try {
      const maxOrder = Math.max(...phases.map(p => p.phase_order), 0);
      
      const { data, error } = await supabase
        .from('project_phases')
        .insert({
          project_id: projectId,
          phase_name: newPhaseName,
          admin_proposed_price: parseFloat(newPhasePrice),
          phase_order: maxOrder + 1,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      
      // Send email notification
      await sendPricingNotificationEmail(data, 'new_pricing');
      
      toast.success('Phase added and user notified via email');
      setNewPhaseName('');
      setNewPhasePrice('');
      setDialogOpen(false);
      fetchPhases();
      onPhaseUpdate?.();
    } catch (error) {
      console.error('Error adding phase:', error);
      toast.error('Failed to add phase');
    } finally {
      setLoading(false);
    }
  };

  const submitCounterOffer = async (phaseId: string) => {
    const price = counterOffer[phaseId];
    const message = negotiationMessage[phaseId];
    
    if (!price) return;
    
    setLoading(true);
    try {
      // Create negotiation record
      const { error: negotiationError } = await supabase
        .from('pricing_negotiations')
        .insert({
          phase_id: phaseId,
          proposed_by: isAdminView ? 'admin' : 'user',
          proposed_price: parseFloat(price),
          message: message || null,
          status: 'pending'
        });

      if (negotiationError) throw negotiationError;

      // Update phase with user proposed price and status
      const updateData = isAdminView 
        ? { admin_proposed_price: parseFloat(price), status: 'negotiating' }
        : { user_proposed_price: parseFloat(price), status: 'negotiating' };

      const { data: updatedPhase, error: phaseError } = await supabase
        .from('project_phases')
        .update(updateData)
        .eq('id', phaseId)
        .select()
        .single();

      if (phaseError) throw phaseError;
      
      // Send email notification
      await sendPricingNotificationEmail(updatedPhase, 'counter_offer');
      
      toast.success('Counter offer submitted and notification sent');
      setCounterOffer(prev => ({ ...prev, [phaseId]: '' }));
      setNegotiationMessage(prev => ({ ...prev, [phaseId]: '' }));
      fetchPhases();
      onPhaseUpdate?.();
    } catch (error) {
      console.error('Error submitting counter offer:', error);
      toast.error('Failed to submit counter offer');
    } finally {
      setLoading(false);
    }
  };

  const acceptPrice = async (phaseId: string, price: number) => {
    setLoading(true);
    try {
      const { data: updatedPhase, error } = await supabase
        .from('project_phases')
        .update({
          final_agreed_price: price,
          status: 'agreed'
        })
        .eq('id', phaseId)
        .select()
        .single();

      if (error) throw error;
      
      // Send email notification
      await sendPricingNotificationEmail(updatedPhase, 'accepted');
      
      toast.success('Price accepted and notification sent');
      fetchPhases();
      onPhaseUpdate?.();
      
      // Check if all phases are agreed to start project
      const allPhases = await supabase
        .from('project_phases')
        .select('status')
        .eq('project_id', projectId);
      
      if (allPhases.data?.every(p => p.status === 'agreed')) {
        await supabase
          .from('projects')
          .update({ status: 'active' })
          .eq('id', projectId);
        
        toast.success('🎉 All phases agreed! Project is now active!');
      }
    } catch (error) {
      console.error('Error accepting price:', error);
      toast.error('Failed to accept price');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agreed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'negotiating': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agreed': return 'default';
      case 'rejected': return 'destructive';
      case 'negotiating': return 'secondary';
      default: return 'outline';
    }
  };

  const allPhasesAgreed = phases.length > 0 && phases.every(phase => phase.status === 'agreed');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Project Phases & Pricing
              </CardTitle>
              <CardDescription>
                {isAdminView 
                  ? 'Manage project phases and pricing structure with email notifications' 
                  : 'Review and negotiate pricing for each project phase'
                }
              </CardDescription>
            </div>
            {isAdminView && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Phase
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Phase</DialogTitle>
                    <DialogDescription>
                      Create a new project phase with pricing (user will be notified via email)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phase-name">Phase Name</Label>
                      <Input
                        id="phase-name"
                        placeholder="e.g., Design & Planning"
                        value={newPhaseName}
                        onChange={(e) => setNewPhaseName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phase-price">Price ($)</Label>
                      <Input
                        id="phase-price"
                        type="number"
                        placeholder="0.00"
                        value={newPhasePrice}
                        onChange={(e) => setNewPhasePrice(e.target.value)}
                      />
                    </div>
                    <Button onClick={addPhase} disabled={loading || !newPhaseName.trim() || !newPhasePrice || isSending}>
                      {loading || isSending ? 'Adding & Sending Email...' : 'Add Phase & Notify User'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {phases.length === 0 ? (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {isAdminView ? 'No phases created yet' : 'No phases available for this project'}
              </p>
              {isAdminView && (
                <p className="text-sm text-muted-foreground mt-2">
                  Add project phases to start the pricing process
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Phase</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Admin Price</TableHead>
                    <TableHead>Your Price</TableHead>
                    <TableHead>Agreed Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phases.map((phase) => (
                    <TableRow key={phase.id}>
                      <TableCell className="font-medium">{phase.phase_name}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(phase.status)} className="flex items-center gap-1 w-fit">
                          {getStatusIcon(phase.status)}
                          {phase.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {phase.admin_proposed_price && (
                          <div className="font-semibold text-blue-600">
                            ${phase.admin_proposed_price.toFixed(2)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {phase.user_proposed_price && (
                          <div className="font-semibold text-green-600">
                            ${phase.user_proposed_price.toFixed(2)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {phase.final_agreed_price && (
                          <div className="font-bold text-emerald-600">
                            ${phase.final_agreed_price.toFixed(2)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          {/* User actions */}
                          {phase.status === 'pending' && !isAdminView && phase.admin_proposed_price && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                onClick={() => acceptPrice(phase.id, phase.admin_proposed_price!)}
                                disabled={loading || isSending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                            </div>
                          )}

                          {/* Admin actions */}
                          {phase.status === 'negotiating' && isAdminView && phase.user_proposed_price && (
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                onClick={() => acceptPrice(phase.id, phase.user_proposed_price!)}
                                disabled={loading || isSending}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Accept User's Price
                              </Button>
                            </div>
                          )}

                          {/* Counter offer section */}
                          {((phase.status === 'pending' && !isAdminView) || 
                            (phase.status === 'negotiating' && isAdminView)) && (
                            <div className="space-y-2 pt-2 border-t">
                              <div className="flex gap-2">
                                <Input
                                  type="number"
                                  placeholder="Counter offer..."
                                  value={counterOffer[phase.id] || ''}
                                  onChange={(e) => setCounterOffer(prev => ({ ...prev, [phase.id]: e.target.value }))}
                                  className="w-32"
                                />
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => submitCounterOffer(phase.id)}
                                  disabled={loading || !counterOffer[phase.id] || isSending}
                                >
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Counter
                                </Button>
                              </div>
                              <Textarea
                                placeholder="Optional message..."
                                value={negotiationMessage[phase.id] || ''}
                                onChange={(e) => setNegotiationMessage(prev => ({ ...prev, [phase.id]: e.target.value }))}
                                rows={2}
                                className="text-xs"
                              />
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {allPhasesAgreed && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">🎉 All phases agreed! Project is now active and ready to begin.</span>
                    </div>
                    <div className="mt-2 text-sm text-green-600">
                      Total project cost: ${phases.reduce((sum, phase) => sum + (phase.final_agreed_price || 0), 0).toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
