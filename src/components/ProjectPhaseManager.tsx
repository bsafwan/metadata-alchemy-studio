
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, DollarSign, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  React.useEffect(() => {
    fetchPhases();
  }, [projectId]);

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

  const addPhase = async () => {
    if (!newPhaseName.trim() || !newPhasePrice) return;
    
    setLoading(true);
    try {
      const maxOrder = Math.max(...phases.map(p => p.phase_order), 0);
      
      const { error } = await supabase
        .from('project_phases')
        .insert({
          project_id: projectId,
          phase_name: newPhaseName,
          admin_proposed_price: parseFloat(newPhasePrice),
          phase_order: maxOrder + 1,
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success('Phase added successfully');
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

      const { error: phaseError } = await supabase
        .from('project_phases')
        .update(updateData)
        .eq('id', phaseId);

      if (phaseError) throw phaseError;
      
      toast.success('Counter offer submitted');
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
      const { error } = await supabase
        .from('project_phases')
        .update({
          final_agreed_price: price,
          status: 'agreed'
        })
        .eq('id', phaseId);

      if (error) throw error;
      
      toast.success('Price accepted');
      fetchPhases();
      onPhaseUpdate?.();
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project Phases & Pricing</CardTitle>
              <CardDescription>
                {isAdminView 
                  ? 'Manage project phases and pricing structure' 
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
                      Create a new project phase with pricing
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
                    <Button onClick={addPhase} disabled={loading || !newPhaseName.trim() || !newPhasePrice}>
                      {loading ? 'Adding...' : 'Add Phase'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {phases.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {isAdminView ? 'No phases created yet' : 'No phases available for this project'}
            </p>
          ) : (
            <div className="space-y-4">
              {phases.map((phase) => (
                <Card key={phase.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{phase.phase_name}</h3>
                        <Badge variant={getStatusColor(phase.status)} className="flex items-center gap-1">
                          {getStatusIcon(phase.status)}
                          {phase.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {phase.admin_proposed_price && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-blue-700">Admin Price</div>
                          <div className="text-lg font-bold text-blue-900">
                            ${phase.admin_proposed_price.toFixed(2)}
                          </div>
                        </div>
                      )}
                      {phase.user_proposed_price && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-green-700">Your Price</div>
                          <div className="text-lg font-bold text-green-900">
                            ${phase.user_proposed_price.toFixed(2)}
                          </div>
                        </div>
                      )}
                      {phase.final_agreed_price && (
                        <div className="bg-emerald-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-emerald-700">Agreed Price</div>
                          <div className="text-lg font-bold text-emerald-900">
                            ${phase.final_agreed_price.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>

                    {phase.status === 'pending' && !isAdminView && phase.admin_proposed_price && (
                      <div className="space-y-3 border-t pt-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => acceptPrice(phase.id, phase.admin_proposed_price!)}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept ${phase.admin_proposed_price.toFixed(2)}
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Counter Offer</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="Your price..."
                              value={counterOffer[phase.id] || ''}
                              onChange={(e) => setCounterOffer(prev => ({ ...prev, [phase.id]: e.target.value }))}
                            />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => submitCounterOffer(phase.id)}
                              disabled={loading || !counterOffer[phase.id]}
                            >
                              Submit
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Optional: Add a message with your counter offer..."
                            value={negotiationMessage[phase.id] || ''}
                            onChange={(e) => setNegotiationMessage(prev => ({ ...prev, [phase.id]: e.target.value }))}
                            rows={2}
                          />
                        </div>
                      </div>
                    )}

                    {phase.status === 'negotiating' && isAdminView && phase.user_proposed_price && (
                      <div className="space-y-3 border-t pt-4">
                        <p className="text-sm text-muted-foreground">
                          User proposed: ${phase.user_proposed_price.toFixed(2)}
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => acceptPrice(phase.id, phase.user_proposed_price!)}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Accept User's Price
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {allPhasesAgreed && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">All phases agreed! Project can now begin.</span>
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
