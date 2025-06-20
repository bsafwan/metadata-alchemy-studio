
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Package, Clock, CheckCircle, Lock, AlertTriangle, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DeliveryItemManager from '@/components/DeliveryItemManager';
import ProjectApiKeyManager from '@/components/ProjectApiKeyManager';
import PhasePaymentManager from '@/components/PhasePaymentManager';

export default function DeliveryManagement() {
  const { projectId } = useParams();
  const [deliveryStats, setDeliveryStats] = useState({
    totalItems: 0,
    completedItems: 0,
    pendingPayments: 0,
    paymentCompleted: false,
    progressPercent: 0
  });

  const { data: project } = useQuery({
    queryKey: ['user-project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId!)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!projectId
  });

  useEffect(() => {
    if (projectId) {
      fetchDeliveryStats();
    }
  }, [projectId]);

  const fetchDeliveryStats = async () => {
    try {
      // Fetch delivery items stats
      const { data: deliveryItems } = await supabase
        .from('delivery_items')
        .select('status, requires_full_payment')
        .eq('project_id', projectId!);

      // Fetch payment stats
      const { data: payments } = await supabase
        .from('project_payments')
        .select('status')
        .eq('project_id', projectId!);

      const totalItems = deliveryItems?.length || 0;
      const completedItems = deliveryItems?.filter(item => item.status === 'delivered').length || 0;
      const pendingPayments = payments?.filter(payment => payment.status !== 'paid').length || 0;
      const paymentCompleted = pendingPayments === 0 && (payments?.length || 0) > 0;
      const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

      setDeliveryStats({
        totalItems,
        completedItems,
        pendingPayments,
        paymentCompleted,
        progressPercent
      });
    } catch (error) {
      console.error('Error fetching delivery stats:', error);
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading delivery information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Delivery</h2>
          <p className="text-muted-foreground">
            Track your project deliverables and manage API keys
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {deliveryStats.completedItems} / {deliveryStats.totalItems} Delivered
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Delivery Progress
          </CardTitle>
          <CardDescription>
            {deliveryStats.progressPercent}% of deliverables completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={deliveryStats.progressPercent} className="h-3" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{deliveryStats.completedItems}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{deliveryStats.totalItems - deliveryStats.completedItems}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{deliveryStats.pendingPayments}</div>
              <div className="text-sm text-muted-foreground">Payments Due</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{project.progression_percentage || 0}%</div>
              <div className="text-sm text-muted-foreground">Project Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Status Alert */}
      {!deliveryStats.paymentCompleted && deliveryStats.pendingPayments > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-800 mb-1">Payment Required for Full Access</h3>
                <p className="text-sm text-amber-700 mb-3">
                  You have {deliveryStats.pendingPayments} pending payment(s). Some delivery items are locked until all payments are completed.
                </p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Payments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Tabs */}
      <Tabs defaultValue="delivery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Deliverables
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="delivery">
          <DeliveryItemManager 
            projectId={projectId!} 
            isAdminView={false}
            paymentCompleted={deliveryStats.paymentCompleted}
          />
        </TabsContent>

        <TabsContent value="api-keys">
          <ProjectApiKeyManager 
            projectId={projectId!} 
            isAdminView={false}
          />
        </TabsContent>

        <TabsContent value="payments">
          <PhasePaymentManager 
            projectId={projectId!} 
            isAdminView={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
