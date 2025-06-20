
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
        subject = `Price Negotiation R${negotiation.round_number} - ${project.project_name}`;
        templateData = {
          customerName: isAdminView ? customerName : 'Admin',
          projectName: project.project_name,
          originalPrice: negotiation.original_total_price,
          proposedPrice: negotiation.proposed_total_price,
          roundNumber: negotiation.round_number,
          message: negotiation.message || 'No message',
          action: `${isAdminView ? 'Admin' : customerName} proposed new total price`,
          actionRequired: 'Review and respond to price negotiation'
        };
        break;

      case 'accepted':
        subject = `Price Agreed - ${project.project_name}`;
        templateData = {
          customerName: isAdminView ? customerName : 'Admin',
          projectName: project.project_name,
          finalPrice: negotiation.proposed_total_price,
          action: 'Total project price agreed!',
          actionRequired: 'All phases updated with proportional pricing'
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
      toast.error('Enter valid price');
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
      
      toast.success('Counter offer submitted');
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
      
      toast.success('🎉 Price accepted! All phases updated!');
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
    <Card className="mb-3">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-4 h-4" />
          Price Negotiation
          {latestNegotiation && (
            <Badge variant={latestNegotiation.status === 'accepted' ? 'default' : 'secondary'} className="text-xs">
              {latestNegotiation.status === 'accepted' ? 'Agreed' : `R${latestNegotiation.round_number}`}
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-xs">
          Original: ${originalTotal.toFixed(0)}
          {latestNegotiation && ` | Latest: $${latestNegotiation.proposed_total_price.toFixed(0)}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Negotiation History */}
        {negotiations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">History</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {negotiations.map((negotiation) => (
                <div key={negotiation.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs px-1 h-4">R{negotiation.round_number}</Badge>
                      <span className="font-medium">${negotiation.proposed_total_price.toFixed(0)}</span>
                      <span className="text-xs text-muted-foreground">
                        by {negotiation.proposed_by}
                      </span>
                      {negotiation.status === 'accepted' && (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      )}
                    </div>
                    {negotiation.message && (
                      <p className="text-xs text-muted-foreground mt-1">{negotiation.message}</p>
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
          <div className="p-2 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800 text-sm">
                  Latest: ${latestNegotiation.proposed_total_price.toFixed(0)}
                </p>
                <p className="text-xs text-green-600">
                  By {latestNegotiation.proposed_by} in R{latestNegotiation.round_number}
                </p>
              </div>
              <Button 
                onClick={() => acceptPrice(latestNegotiation.id, latestNegotiation.proposed_total_price)}
                disabled={loading || isSending}
                className="bg-green-600 hover:bg-green-700 h-7 text-xs"
                size="sm"
              >
                {loading || isSending ? (
                  <>
                    <Mail className="w-3 h-3 mr-1 animate-pulse" />
                    Accepting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Accept
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Counter Offer Form */}
        {canNegotiate && (
          <div className="space-y-2 p-2 border rounded">
            <h4 className="font-medium text-sm">Make Counter Offer</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="counter-offer" className="text-xs">Your Price ($)</Label>
                <Input
                  id="counter-offer"
                  type="number"
                  placeholder="Enter price..."
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                  min="0"
                  step="0.01"
                  className="text-sm h-7"
                />
              </div>
              <div>
                <Label htmlFor="savings" className="text-xs">Savings</Label>
                <Input
                  id="savings"
                  type="text"
                  value={counterOffer ? `$${(originalTotal - parseFloat(counterOffer)).toFixed(0)}` : '$0'}
                  readOnly
                  className="bg-muted text-sm h-7"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="text-xs">Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add note about your offer..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="text-sm"
              />
            </div>
            <Button 
              onClick={submitCounterOffer} 
              disabled={loading || !counterOffer || isSending}
              className="w-full h-7 text-xs"
              size="sm"
            >
              {loading || isSending ? (
                <>
                  <Mail className="w-3 h-3 mr-1 animate-pulse" />
                  Submitting...
                </>
              ) : (
                <>
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Submit Counter Offer
                </>
              )}
            </Button>
          </div>
        )}

        {/* Agreement Status */}
        {latestNegotiation?.status === 'accepted' && (
          <div className="p-2 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-3 h-3" />
              <span className="font-semibold">
                🎉 Agreed: ${latestNegotiation.proposed_total_price.toFixed(0)}
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              All phases updated proportionally
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
