
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
      subject: `Phase Group Created - ${project.project_name}`,
      template: 'project-update',
      templateData: {
        customerName,
        projectName: project.project_name,
        phases: phasesTable,
        totalPrice: totalPrice.toFixed(2),
        action: 'New phase group created with pricing breakdown',
        actionRequired: 'Review pricing and negotiate total if needed'
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

  const createPhaseGroup = async () => {
    const validPhases = bulkPhases.filter(p => p.phase_name.trim() && p.admin_proposed_price);
    if (validPhases.length === 0) {
      toast.error('Add at least one valid phase');
      return;
    }
    
    setLoading(true);
    try {
      const totalPrice = validPhases.reduce((sum, phase) => sum + parseFloat(phase.admin_proposed_price), 0);
      const nextOrder = phases.length > 0 ? Math.max(...phases.map(p => p.phase_order)) + 1 : 1;
      
      const phasesToInsert = validPhases.map((phase, index) => {
        const phasePrice = parseFloat(phase.admin_proposed_price);
        const percentage = (phasePrice / totalPrice) * 100;
        
        return {
          project_id: projectId,
          phase_name: phase.phase_name,
          admin_proposed_price: phasePrice,
          phase_order: nextOrder + index,
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
      
      toast.success(`Phase group created (${data.length} phases)`);
      setBulkPhases([{ phase_name: '', admin_proposed_price: '' }]);
      setDialogOpen(false);
      onPhaseUpdate?.();
    } catch (error) {
      console.error('Error creating phases:', error);
      toast.error('Failed to create phase group');
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
  const agreedPhasesTotal = phases
    .filter(phase => phase.status === 'agreed')
    .reduce((sum, phase) => sum + (phase.final_agreed_price || 0), 0);
  const allPhasesAgreed = phases.length > 0 && phases.every(phase => phase.status === 'agreed');

  return (
    <div className="space-y-4">
      {/* Total Price Negotiation */}
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5" />
                Project Phases
              </CardTitle>
              <CardDescription className="text-sm">
                {isAdminView ? 'Create phase groups with pricing' : 'Review phases and negotiate'}
              </CardDescription>
            </div>
            {isAdminView && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Phase Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Phase Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    {bulkPhases.map((phase, index) => (
                      <div key={index} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <Label className="text-xs">Phase Name</Label>
                          <Input
                            placeholder="e.g., Design & Planning"
                            value={phase.phase_name}
                            onChange={(e) => updateBulkPhase(index, 'phase_name', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="w-28">
                          <Label className="text-xs">Price ($)</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={phase.admin_proposed_price}
                            onChange={(e) => updateBulkPhase(index, 'admin_proposed_price', e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBulkPhase(index)}
                          disabled={bulkPhases.length === 1}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2 pt-2">
                      <Button type="button" variant="outline" size="sm" onClick={addBulkPhase}>
                        <Plus className="w-3 h-3 mr-1" />
                        Add Phase
                      </Button>
                      <Button onClick={createPhaseGroup} disabled={loading || isSending} size="sm">
                        {loading || isSending ? (
                          <>
                            <Mail className="w-3 h-3 mr-1 animate-pulse" />
                            Creating...
                          </>
                        ) : (
                          'Create Group'
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
            <div className="text-center py-8">
              <DollarSign className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {isAdminView ? 'No phases created' : 'No phases available'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded border">
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs">
                      <TableHead className="py-2">Phase</TableHead>
                      <TableHead className="py-2 w-20">Status</TableHead>
                      <TableHead className="py-2 w-24">Original</TableHead>
                      <TableHead className="py-2 w-16">%</TableHead>
                      <TableHead className="py-2 w-24">Current</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phases.map((phase) => (
                      <TableRow key={phase.id} className="text-sm">
                        <TableCell className="py-2 font-medium">{phase.phase_name}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant={getStatusColor(phase.status)} className="text-xs px-1 py-0">
                            {getStatusIcon(phase.status)}
                            {phase.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-2">
                          {phase.admin_proposed_price && (
                            <span className="font-medium text-blue-600">
                              ${phase.admin_proposed_price.toFixed(0)}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-2">
                          {phase.original_percentage && (
                            <span className="text-xs text-muted-foreground">
                              {phase.original_percentage.toFixed(0)}%
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="py-2">
                          {phase.final_agreed_price ? (
                            <span className="font-bold text-emerald-600">
                              ${phase.final_agreed_price.toFixed(0)}
                            </span>
                          ) : phase.admin_proposed_price ? (
                            <span className="font-medium text-blue-600">
                              ${phase.admin_proposed_price.toFixed(0)}
                            </span>
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
              <div className="bg-muted/30 p-3 rounded">
                <div className="flex justify-between text-sm">
                  <span>Total Cost:</span>
                  <div className="text-right">
                    {allPhasesAgreed ? (
                      <span className="font-bold text-emerald-600">
                        ${agreedPhasesTotal.toFixed(0)}
                      </span>
                    ) : (
                      <span className="font-semibold text-blue-600">
                        ${originalTotal.toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>
                {agreedPhasesTotal > 0 && !allPhasesAgreed && (
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Agreed Phases:</span>
                    <span className="font-medium text-emerald-600">
                      ${agreedPhasesTotal.toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              {allPhasesAgreed && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="py-3">
                    <div className="flex items-center gap-2 text-green-700 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">All phases finalized! Project ready.</span>
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
