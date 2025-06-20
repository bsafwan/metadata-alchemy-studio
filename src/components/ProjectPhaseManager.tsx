
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, DollarSign, CheckCircle, Clock, Mail, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useZohoMail } from '@/hooks/useZohoMail';
import TotalPriceNegotiator from './TotalPriceNegotiator';

interface ProjectPhase {
  id: string;
  phase_name: string;
  admin_proposed_price: number | null;
  user_proposed_price: number | null;
  final_agreed_price: number | null;
  status: string;
  phase_order: number;
  original_percentage: number | null;
  is_percentage_locked: boolean | null;
  created_at: string;
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
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [project, setProject] = useState<any>(null);
  const { sendEmail, isSending } = useZohoMail();

  useEffect(() => {
    fetchPhases();
    fetchProject();
    
    // Real-time subscription for phases
    const channel = supabase
      .channel('project-phases')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_phases',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          fetchPhases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        .select('*')
        .eq('project_id', projectId)
        .order('phase_order', { ascending: true });

      if (error) throw error;
      setPhases(data || []);
    } catch (error) {
      console.error('Error fetching phases:', error);
    }
  };

  const sendPhasesCreatedEmail = async (phases: ProjectPhase[]) => {
    if (!project) return;

    const recipientEmail = project.users.email;
    const customerName = `${project.users.first_name} ${project.users.last_name}`;
    const totalPrice = phases.reduce((sum, p) => sum + (p.admin_proposed_price || 0), 0);

    const phasesTable = phases.map(phase => ({
      name: phase.phase_name,
      price: phase.admin_proposed_price?.toFixed(2) || '0.00',
      percentage: phase.original_percentage?.toFixed(1) || '0.0'
    }));

    await sendEmail({
      to: [recipientEmail],
      subject: `Project Phases Created - ${project.project_name}`,
      template: 'project-update',
      templateData: {
        customerName,
        projectName: project.project_name,
        phases: phasesTable,
        totalPrice: totalPrice.toFixed(2),
        action: 'Project phases have been created with detailed pricing breakdown',
        actionRequired: 'Please review the total price and individual phases. You can negotiate the total price if needed.'
      }
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
      const totalPrice = validPhases.reduce((sum, phase) => sum + parseFloat(phase.admin_proposed_price), 0);
      
      const phasesToInsert = validPhases.map((phase, index) => {
        const phasePrice = parseFloat(phase.admin_proposed_price);
        const percentage = (phasePrice / totalPrice) * 100;
        
        return {
          project_id: projectId,
          phase_name: phase.phase_name,
          admin_proposed_price: phasePrice,
          phase_order: index + 1,
          status: 'pending',
          original_percentage: percentage,
          is_percentage_locked: true
        };
      });

      const { data, error } = await supabase
        .from('project_phases')
        .insert(phasesToInsert)
        .select();

      if (error) throw error;
      
      await sendPhasesCreatedEmail(data);
      
      toast.success(`${data.length} phases created and user notified via email`);
      setBulkPhases([{ phase_name: '', admin_proposed_price: '' }]);
      setDialogOpen(false);
      onPhaseUpdate?.();
    } catch (error) {
      console.error('Error creating phases:', error);
      toast.error('Failed to create phases');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agreed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agreed': return 'default';
      default: return 'outline';
    }
  };

  const originalTotal = phases.reduce((sum, phase) => sum + (phase.admin_proposed_price || 0), 0);
  const allPhasesAgreed = phases.length > 0 && phases.every(phase => phase.status === 'agreed');

  return (
    <div className="space-y-6">
      {/* Total Price Negotiation Section */}
      {phases.length > 0 && originalTotal > 0 && (
        <TotalPriceNegotiator
          projectId={projectId}
          originalTotal={originalTotal}
          isAdminView={isAdminView}
          onNegotiationUpdate={onPhaseUpdate}
        />
      )}

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
                  ? 'Create project phases with pricing structure. Total price negotiations will update all phases proportionally.' 
                  : 'Review project phases and negotiate total pricing'
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
                      Add all project phases with pricing. Percentages will be calculated automatically.
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
                      <TableHead className="w-[120px]">Original Price</TableHead>
                      <TableHead className="w-[100px]">Percentage</TableHead>
                      <TableHead className="w-[120px]">Current Price</TableHead>
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
                          {phase.original_percentage && (
                            <div className="text-sm text-muted-foreground">
                              {phase.original_percentage.toFixed(1)}%
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {phase.final_agreed_price ? (
                            <div className="font-bold text-emerald-600">
                              ${phase.final_agreed_price.toFixed(2)}
                            </div>
                          ) : phase.admin_proposed_price ? (
                            <div className="font-semibold text-blue-600">
                              ${phase.admin_proposed_price.toFixed(2)}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Summary */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Project Cost:</span>
                  <div className="text-right">
                    {allPhasesAgreed ? (
                      <div className="font-bold text-emerald-600 text-lg">
                        ${phases.reduce((sum, phase) => sum + (phase.final_agreed_price || 0), 0).toFixed(2)}
                      </div>
                    ) : (
                      <div className="font-semibold text-blue-600 text-lg">
                        ${originalTotal.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {allPhasesAgreed && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">🎉 All phases finalized! Project is ready to begin.</span>
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
