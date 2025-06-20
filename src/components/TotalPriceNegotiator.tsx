
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { DollarSign, MessageSquare, CheckCircle, Clock, Mail, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useZohoMail } from '@/hooks/useZohoMail';

interface TotalPriceNegotiation {
  id: string;
  project_id: string;
  original_total_price: number;
  proposed_total_price: number;
  proposed_by: string;
  message: string | null;
  status: string;
  round_number: number;
  created_at: string;
}

interface TotalPriceNegotiatorProps {
  projectId: string;
  originalTotal: number;
  isAdminView?: boolean;
  onNegotiationUpdate?: () => void;
}

export default function TotalPriceNegotiator({ 
  projectId, 
  originalTotal, 
  isAdminView = false, 
  onNegotiationUpdate 
}: TotalPriceNegotiatorProps) {
  const [negotiations, setNegotiations] = useState<TotalPriceNegotiation[]>([]);
  const [counterOffer, setCounterOffer] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null);
  const { sendEmail, isSending } = useZohoMail();

  useEffect(() => {
    fetchNegotiations();
    fetchProject();
    
    // Real-time subscription
    const channel = supabase
      .channel('total-price-negotiations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'total_price_negotiations',
          filter: `project_id=eq.${projectId}`
        },
        () => {
          fetchNegotiations();
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

  const fetchNegotiations = async () => {
    try {
      const { data, error } = await supabase
        .from('total_price_negotiations')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNegotiations(data || []);
    } catch (error) {
      console.error('Error fetching negotiations:', error);
    }
  };

  const sendNegotiationEmail = async (negotiation: TotalPriceNegotiation, action: 'new_negotiation' | 'accepted') => {
    if (!project) return;

    const recipientEmail = isAdminView 
      ? project.users.email 
      : 'bsafwanjamil677@gmail.com';
    
    const customerName = `${project.users.first_name} ${project.users.last_name}`;
    
    let subject = '';
    let templateData = {};

    switch (action) {
      case 'new_negotiation':
        subject = `Price Negotiation Round ${negotiation.round_number} - ${project.project_name}`;
        templateData = {
          customerName: isAdminView ? customerName : 'Admin',
          projectName: project.project_name,
          originalPrice: negotiation.original_total_price,
          proposedPrice: negotiation.proposed_total_price,
          roundNumber: negotiation.round_number,
          message: negotiation.message || 'No additional message',
          action: `${isAdminView ? 'Admin' : customerName} has proposed a new total price`,
          actionRequired: 'Please review and respond to this price negotiation'
        };
        break;

      case 'accepted':
        subject = `Price Agreement Confirmed - ${project.project_name}`;
        templateData = {
          customerName: isAdminView ? customerName : 'Admin',
          projectName: project.project_name,
          finalPrice: negotiation.proposed_total_price,
          action: 'Total project price has been agreed upon!',
          actionRequired: 'Project phases have been updated with proportional pricing'
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

  const submitCounterOffer = async () => {
    if (!counterOffer || parseFloat(counterOffer) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setLoading(true);
    try {
      const latestRound = negotiations.length > 0 ? Math.max(...negotiations.map(n => n.round_number)) : 0;
      
      const { data, error } = await supabase
        .from('total_price_negotiations')
        .insert({
          project_id: projectId,
          original_total_price: originalTotal,
          proposed_total_price: parseFloat(counterOffer),
          proposed_by: isAdminView ? 'admin' : 'user',
          message: message || null,
          status: 'pending',
          round_number: latestRound + 1
        })
        .select()
        .single();

      if (error) throw error;
      
      await sendNegotiationEmail(data, 'new_negotiation');
      
      toast.success('Counter offer submitted and notification sent');
      setCounterOffer('');
      setMessage('');
      onNegotiationUpdate?.();
    } catch (error) {
      console.error('Error submitting counter offer:', error);
      toast.error('Failed to submit counter offer');
    } finally {
      setLoading(false);
    }
  };

  const acceptPrice = async (negotiationId: string, price: number) => {
    setLoading(true);
    try {
      // Update negotiation status
      const { data: updatedNegotiation, error: updateError } = await supabase
        .from('total_price_negotiations')
        .update({ status: 'accepted' })
        .eq('id', negotiationId)
        .select()
        .single();

      if (updateError) throw updateError;

      // Update phase prices using the database function
      const { error: functionError } = await supabase
        .rpc('update_phase_prices_from_total', {
          p_project_id: projectId,
          p_new_total: price
        });

      if (functionError) throw functionError;

      // Update project status
      await supabase
        .from('projects')
        .update({ status: 'active' })
        .eq('id', projectId);

      await sendNegotiationEmail(updatedNegotiation, 'accepted');
      
      toast.success('🎉 Price accepted! All phases updated proportionally!');
      onNegotiationUpdate?.();
    } catch (error) {
      console.error('Error accepting price:', error);
      toast.error('Failed to accept price');
    } finally {
      setLoading(false);
    }
  };

  const latestNegotiation = negotiations[0];
  const canNegotiate = !latestNegotiation || latestNegotiation.status !== 'accepted';
  const isMyTurn = !latestNegotiation || 
    (isAdminView && latestNegotiation.proposed_by === 'user') ||
    (!isAdminView && latestNegotiation.proposed_by === 'admin');

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Total Price Negotiation
          {latestNegotiation && (
            <Badge variant={latestNegotiation.status === 'accepted' ? 'default' : 'secondary'}>
              {latestNegotiation.status === 'accepted' ? 'Agreed' : `Round ${latestNegotiation.round_number}`}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Original total: ${originalTotal.toFixed(2)} | 
          {latestNegotiation && ` Latest offer: $${latestNegotiation.proposed_total_price.toFixed(2)}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Negotiation History */}
        {negotiations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Negotiation History</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {negotiations.map((negotiation) => (
                <div key={negotiation.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Round {negotiation.round_number}</Badge>
                      <span className="font-medium">${negotiation.proposed_total_price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">
                        by {negotiation.proposed_by}
                      </span>
                      {negotiation.status === 'accepted' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    {negotiation.message && (
                      <p className="text-sm text-muted-foreground mt-1">{negotiation.message}</p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(negotiation.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accept Latest Offer */}
        {latestNegotiation && latestNegotiation.status === 'pending' && isMyTurn && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">
                  Latest Offer: ${latestNegotiation.proposed_total_price.toFixed(2)}
                </p>
                <p className="text-sm text-green-600">
                  Proposed by {latestNegotiation.proposed_by} in Round {latestNegotiation.round_number}
                </p>
              </div>
              <Button 
                onClick={() => acceptPrice(latestNegotiation.id, latestNegotiation.proposed_total_price)}
                disabled={loading || isSending}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading || isSending ? (
                  <>
                    <Mail className="w-4 h-4 mr-2 animate-pulse" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Price
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Counter Offer Form */}
        {canNegotiate && (
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Make Counter Offer</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="counter-offer">Your Price ($)</Label>
                <Input
                  id="counter-offer"
                  type="number"
                  placeholder="Enter your price..."
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="savings">Savings</Label>
                <Input
                  id="savings"
                  type="text"
                  value={counterOffer ? `$${(originalTotal - parseFloat(counterOffer)).toFixed(2)}` : '$0.00'}
                  readOnly
                  className="bg-muted"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a note about your offer..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              onClick={submitCounterOffer} 
              disabled={loading || !counterOffer || isSending}
              className="w-full"
            >
              {loading || isSending ? (
                <>
                  <Mail className="w-4 h-4 mr-2 animate-pulse" />
                  Submitting Offer...
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Submit Counter Offer
                </>
              )}
            </Button>
          </div>
        )}

        {/* Agreement Status */}
        {latestNegotiation?.status === 'accepted' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">
                🎉 Price Agreement: ${latestNegotiation.proposed_total_price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              All project phases have been updated with proportional pricing
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
