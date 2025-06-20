
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Package, CheckCircle, Clock, Key, DollarSign, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DeliveryItemManager from '@/components/DeliveryItemManager';
import ProjectApiKeyManager from '@/components/ProjectApiKeyManager';
import PhasePaymentManager from '@/components/PhasePaymentManager';

export default function ProjectAdminDelivery() {
  const { projectId } = useParams();
  const [deliveryStats, setDeliveryStats] = useState({
    totalItems: 0,
    completedItems: 0,
    pendingPayments: 0,
    paymentCompleted: false
  });

  const { data: project } = useQuery({
    queryKey: ['admin-project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          users!inner(first_name, last_name, email, business_name)
        `)
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
        .select('status')
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

      setDeliveryStats({
        totalItems,
        completedItems,
        pendingPayments,
        paymentCompleted
      });
    } catch (error) {
      console.error('Error fetching delivery stats:', error);
    }
  };

  const initializeDelivery = async () => {
    try {
      const { error } = await supabase
        .from('project_deliveries')
        .insert([{
          project_id: projectId!,
          delivery_status: 'preparing',
          initiated_at: new Date().toISOString()
        }]);

      if (error) throw error;
      fetchDeliveryStats();
    } catch (error) {
      console.error('Error initializing delivery:', error);
    }
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading project delivery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Delivery Management</h2>
          <p className="text-muted-foreground">
            Project: {project.project_name} | Client: {project.users.first_name} {project.users.last_name}
          </p>
        </div>
        <Button onClick={initializeDelivery}>
          <Truck className="w-4 h-4 mr-2" />
          Initialize Delivery
        </Button>
      </div>

      {/* Delivery Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="text-center pb-3">
            <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
            <CardTitle className="text-lg">Completed</CardTitle>
            <CardDescription>{deliveryStats.completedItems} items delivered</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center pb-3">
            <Package className="w-8 h-8 mx-auto text-blue-500" />
            <CardTitle className="text-lg">Total Items</CardTitle>
            <CardDescription>{deliveryStats.totalItems} delivery items</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center pb-3">
            <DollarSign className="w-8 h-8 mx-auto text-orange-500" />
            <CardTitle className="text-lg">Payments</CardTitle>
            <CardDescription>
              {deliveryStats.pendingPayments > 0 ? `${deliveryStats.pendingPayments} pending` : 'All completed'}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center pb-3">
            {deliveryStats.paymentCompleted ? (
              <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
            ) : (
              <AlertTriangle className="w-8 h-8 mx-auto text-amber-500" />
            )}
            <CardTitle className="text-lg">Status</CardTitle>
            <CardDescription>
              {deliveryStats.paymentCompleted ? 'Ready for delivery' : 'Awaiting payment'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Payment Status Warning */}
      {!deliveryStats.paymentCompleted && deliveryStats.pendingPayments > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-800">Payment Required for Full Delivery</h3>
                <p className="text-sm text-amber-700">
                  {deliveryStats.pendingPayments} payment(s) pending. Some delivery items are locked until all payments are completed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Management Tabs */}
      <Tabs defaultValue="delivery" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="delivery">Delivery Items</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="delivery">
          <DeliveryItemManager 
            projectId={projectId!} 
            isAdminView={true}
            paymentCompleted={deliveryStats.paymentCompleted}
          />
        </TabsContent>

        <TabsContent value="api-keys">
          <ProjectApiKeyManager 
            projectId={projectId!} 
            isAdminView={true}
          />
        </TabsContent>

        <TabsContent value="payments">
          <PhasePaymentManager 
            projectId={projectId!} 
            isAdminView={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
