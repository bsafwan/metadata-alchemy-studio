
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, DollarSign, MessageSquare, CheckCircle, XCircle, Clock, Mail, Trash2 } from 'lucide-react';
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

interface BulkPhase {
  phase_name: string;
  admin_proposed_price: string;
}

interface ProjectPhaseManagerProps {
  projectId: string;
  isAdminView?: boolean;
  onPhaseUpdate?: () => void;
}

export default function ProjectPhaseManager({ projectId, isAdminView = false, onPhaseUpdate }: ProjectPhaseManagerProps) {
  const [phases, setPhases] = useState<ProjectPhase[]>([]);
  const [bulkPhases, setBulkPhases] = useState<BulkPhase[]>([{ phase_name: '', admin_proposed_price: '' }]);
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

  const sendPricingNotificationEmail = async (phases: ProjectPhase[], action: 'new_pricing' | 'counter_offer' | 'accepted') => {
    if (!project) return;

    const recipientEmail = isAdminView 
      ? project.users.email  // Admin sends to user
      : 'bsafwanjamil677@gmail.com';  // User sends to admin
    
    const customerName = `${project.users.first_name} ${project.users.last_name}`;
    
    let subject = '';
    let templateData = {};

    switch (action) {
      case 'new_pricing':
        subject = `New Pricing Phases Available - ${project.project_name}`;
        templateData = {
          customerName,
          projectName: project.project_name,
          phases: phases.map(p => ({
            name: p.phase_name,
            price: p.admin_proposed_price
          })),
          totalPrice: phases.reduce((sum, p) => sum + (p.admin_proposed_price || 0), 0),
          action: 'New pricing phases have been created for your project',
          actionRequired: 'Please review each phase and confirm or negotiate pricing'
        };
        break;

      case 'counter_offer':
        subject = `Counter Offer Received - ${project.project_name}`;
        templateData = {
          customerName: isAdminView ? 'Admin' : customerName,
          projectName: project.project_name,
          phases: phases.map(p => ({
            name: p.phase_name,
            price: isAdminView ? p.admin_proposed_price : p.user_proposed_price
          })),
          action: 'A counter offer has been submitted for project phases',
          actionRequired: 'Review and respond to the counter offer'
        };
        break;

      case 'accepted':
        subject = `All Phases Accepted - Project Started! - ${project.project_name}`;
        templateData = {
          customerName: isAdminView ? 'Admin' : customerName,
          projectName: project.project_name,
          phases: phases.map(p => ({
            name: p.phase_name,
            price: p.final_agreed_price
          })),
          totalPrice: phases.reduce((sum, p) => sum + (p.final_agreed_price || 0), 0),
          action: 'All pricing phases have been accepted and your project is now starting!',
          actionRequired: 'Project development will begin shortly'
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

  const addBulkPhase = () => {
    setBulkPhases([...bulkPhases, { phase_name: '', admin_proposed_price: '' }]);
  };

  const removeBulkPhase = (index: number) => {
    if (bulkPhases.length > 1) {
      setBulkPhases(bulkPhases.filter((_, i) => i !== index));
    }
  };

  const updateBulkPhase = (index: number, field: keyof BulkPhase, value: string) => {
    const updated = [...bulkPhases];
    updated[index][field] = value;
    setBulkPhases(updated);
  };

  const createAllPhases = async () => {
    const validPhases = bulkPhases.filter(p => p.phase_name.trim() && p.admin_proposed_price);
    if (validPhases.length === 0) {
      toast.error('Please add at least one valid phase');
      return;
    }
    
    setLoading(true);
    try {
      const phasesToInsert = validPhases.map((phase, index) => ({
        project_id: projectId,
        phase_name: phase.phase_name,
        admin_proposed_price: parseFloat(phase.admin_proposed_price),
        phase_order: index + 1,
        status: 'pending'
      }));

      const { data, error } = await supabase
        .from('project_phases')
        .insert(phasesToInsert)
        .select();

      if (error) throw error;
      
      // Send email notification to user
      await sendPricingNotificationEmail(data, 'new_pricing');
      
      toast.success(`${data.length} phases created and user notified via email`);
      setBulkPhases([{ phase_name: '', admin_proposed_price: '' }]);
      setDialogOpen(false);
      fetchPhases();
      onPhaseUpdate?.();
    } catch (error) {
      console.error('Error creating phases:', error);
      toast.error('Failed to create phases');
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
      await sendPricingNotificationEmail([updatedPhase], 'counter_offer');
      
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
      
      toast.success('Price accepted');
      fetchPhases();
      onPhaseUpdate?.();
      
      // Check if all phases are agreed to start project
      const { data: allPhases } = await supabase
        .from('project_phases')
        .select('*')
        .eq('project_id', projectId);
      
      if (allPhases?.every(p => p.status === 'agreed')) {
        await supabase
          .from('projects')
          .update({ status: 'active' })
          .eq('id', projectId);
        
        // Send project started email
        await sendPricingNotificationEmail(allPhases, 'accepted');
        
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
                  ? 'Create project phases with pricing structure (user will be notified via email)' 
                  : 'Review and negotiate pricing for each project phase'
                }
              </CardDescription>
            </div>
            {isAdminView && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create All Phases
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create All Project Phases</DialogTitle>
                    <DialogDescription>
                      Add all project phases with pricing at once (user will be notified via email)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {bulkPhases.map((phase, index) => (
                      <div key={index} className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Label>Phase Name</Label>
                          <Input
                            placeholder="e.g., Design & Planning"
                            value={phase.phase_name}
                            onChange={(e) => updateBulkPhase(index, 'phase_name', e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={phase.admin_proposed_price}
                            onChange={(e) => updateBulkPhase(index, 'admin_proposed_price', e.target.value)}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBulkPhase(index)}
                          disabled={bulkPhases.length === 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={addBulkPhase}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Phase
                      </Button>
                      <Button onClick={createAllPhases} disabled={loading || isSending}>
                        {loading || isSending ? (
                          <>
                            <Mail className="w-4 h-4 mr-2 animate-pulse" />
                            Creating & Sending Email...
                          </>
                        ) : (
                          'Create All Phases & Notify User'
                        )}
                      </Button>
                    </div>
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
                  Create project phases to start the pricing process
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Phase Name</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[120px]">Admin Price</TableHead>
                      <TableHead className="w-[120px]">Your Price</TableHead>
                      <TableHead className="w-[120px]">Agreed Price</TableHead>
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
                          <div className="space-y-2">
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
                                  Accept ${phase.user_proposed_price.toFixed(2)}
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
              </div>

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
