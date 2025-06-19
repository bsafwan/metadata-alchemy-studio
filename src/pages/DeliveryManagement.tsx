
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

export default function DeliveryManagement() {
  const deliveries = [
    { id: 'DEL001', project: 'Website Files', status: 'Delivered', progress: 100, eta: 'Completed' },
    { id: 'DEL002', project: 'Mobile Assets', status: 'In Transit', progress: 75, eta: '2 hours' },
    { id: 'DEL003', project: 'Brand Package', status: 'Preparing', progress: 30, eta: '1 day' },
    { id: 'DEL004', project: 'Logo Files', status: 'Pending', progress: 0, eta: '3 days' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'In Transit': return 'secondary';
      case 'Preparing': return 'outline';
      case 'Pending': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Delivery Management</h2>
        <Badge variant="outline">4 Deliveries</Badge>
      </div>

      <div className="grid gap-4">
        {deliveries.map((delivery) => (
          <Card key={delivery.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-blue rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{delivery.project}</CardTitle>
                    <CardDescription>ID: {delivery.id}</CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(delivery.status)}>
                  {delivery.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{delivery.progress}%</span>
                </div>
                <Progress value={delivery.progress} />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ETA: {delivery.eta}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Digital Delivery
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
