
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PaymentEmailService } from '@/utils/paymentEmailService';

interface ProjectProgressionManagerProps {
  projectId: string;
  currentProgression: number;
  totalAmount: number;
  onProgressionUpdate: () => void;
}

export default function ProjectProgressionManager({ 
  projectId, 
  currentProgression, 
  totalAmount,
  onProgressionUpdate 
}: ProjectProgressionManagerProps) {
  const [loading, setLoading] = useState(false);

  const updateProgression = async (newPercentage: number) => {
    if (newPercentage < 0 || newPercentage > 100) return;
    
    setLoading(true);
    try {
      console.log('Updating progression to:', newPercentage, 'for project:', projectId);
      
      // First, ensure the total project amount is set
      let projectTotal = totalAmount;
      
      if (!projectTotal || projectTotal === 0) {
        console.log('Total amount is 0, fetching from negotiations...');
        
        // Get the total from agreed negotiations
        const { data: negotiation, error: negError } = await supabase
          .from('total_price_negotiations')
          .select('proposed_total_price')
          .eq('project_id', projectId)
          .eq('status', 'accepted')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (negError) {
          console.error('Error fetching negotiations:', negError);
        } else if (negotiation) {
          projectTotal = negotiation.proposed_total_price;
          console.log('Found negotiated total:', projectTotal);
        } else {
          console.log('No accepted negotiations found, calculating from phases...');
          
          // Fallback: calculate from project phases
          const { data: phases, error: phaseError } = await supabase
            .from('project_phases')
            .select('final_agreed_price, admin_proposed_price')
            .eq('project_id', projectId);

          if (phaseError) {
            console.error('Error fetching phases:', phaseError);
          } else if (phases && phases.length > 0) {
            projectTotal = phases.reduce((sum, phase) => 
              sum + (phase.final_agreed_price || phase.admin_proposed_price || 0), 0
            );
            console.log('Calculated total from phases:', projectTotal);
          }
        }
      }

      console.log('Final project total:', projectTotal);

      // Check if we're reaching 50% for the first time
      const isReaching50Percent = newPercentage >= 50 && currentProgression < 50;

      // Update both progression and total amount
      const { error } = await supabase
        .from('projects')
        .update({ 
          progression_percentage: newPercentage,
          total_project_amount: projectTotal
        })
        .eq('id', projectId);

      if (error) {
        console.error('Error updating project:', error);
        throw error;
      }
      
      console.log('Project updated successfully');

      // If we just reached 50%, send the payment invoice email
      if (isReaching50Percent && projectTotal > 0) {
        console.log('50% milestone reached, sending invoice email...');
        
        // Get project and user details for the email
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select(`
            project_name,
            users!inner(first_name, last_name, email, business_name, business_category)
          `)
          .eq('id', projectId)
          .single();

        if (projectError) {
          console.error('Error fetching project data for email:', projectError);
        } else if (projectData) {
          // Get the payment record that should have been created by the trigger
          const { data: paymentData, error: paymentError } = await supabase
            .from('project_payments')
            .select('reference_number, due_date')
            .eq('project_id', projectId)
            .eq('is_automatic', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (paymentError) {
            console.error('Error fetching payment data:', paymentError);
          } else if (paymentData) {
            const emailSuccess = await PaymentEmailService.sendPaymentInvoice({
              client_email: projectData.users.email,
              client_name: `${projectData.users.first_name} ${projectData.users.last_name}`,
              project_name: projectData.project_name,
              amount: projectTotal * 0.5,
              reference_number: paymentData.reference_number,
              due_date: paymentData.due_date ? new Date(paymentData.due_date).toLocaleDateString() : 'Upon receipt',
              client_business: projectData.users.business_name,
              client_industry: projectData.users.business_category
            });

            if (emailSuccess) {
              toast.success(`50% payment initialized! Invoice sent to ${projectData.users.email}`);
            } else {
              toast.error('Payment initialized but failed to send invoice email');
            }
          } else {
            toast.warning('Payment initialized but invoice details not found');
          }
        }
      } else {
        toast.success(`Project progression updated to ${newPercentage}%`);
      }
      
      onProgressionUpdate();
    } catch (error) {
      console.error('Error updating progression:', error);
      toast.error('Failed to update project progression');
    } finally {
      setLoading(false);
    }
  };

  const adjustProgression = (increment: number) => {
    const newPercentage = Math.max(0, Math.min(100, currentProgression + increment));
    updateProgression(newPercentage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Project Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Progress</span>
          <Badge variant={currentProgression >= 50 ? 'default' : 'secondary'}>
            {currentProgression}%
          </Badge>
        </div>
        
        <Progress value={currentProgression} className="mb-4" />
        
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(-5)}
            disabled={loading || currentProgression <= 0}
          >
            <Minus className="w-4 h-4" />
            5%
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(-1)}
            disabled={loading || currentProgression <= 0}
          >
            <Minus className="w-4 h-4" />
            1%
          </Button>
          
          <span className="mx-4 text-lg font-bold">{currentProgression}%</span>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(1)}
            disabled={loading || currentProgression >= 100}
          >
            <Plus className="w-4 h-4" />
            1%
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(5)}
            disabled={loading || currentProgression >= 100}
          >
            <Plus className="w-4 h-4" />
            5%
          </Button>
        </div>

        {currentProgression >= 50 && totalAmount > 0 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              🎉 50% milestone reached! Invoice sent for ${(totalAmount * 0.5).toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
