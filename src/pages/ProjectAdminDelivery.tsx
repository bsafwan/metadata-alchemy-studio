
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Package, CheckCircle, Clock, Download } from 'lucide-react';

export default function ProjectAdminDelivery() {
  const deliveries = [
    {
      id: 1,
      name: 'Initial Design Assets',
      type: 'Design Files',
      status: 'Delivered',
      deliveryDate: '2024-11-15',
      description: 'Complete UI/UX design files and style guide'
    },
    {
      id: 2,
      name: 'Beta Version',
      type: 'Software',
      status: 'In Progress',
      deliveryDate: '2024-12-20',
      description: 'Functional beta version with core features'
    },
    {
      id: 3,
      name: 'Final Product',
      type: 'Software',
      status: 'Scheduled',
      deliveryDate: '2024-12-30',
      description: 'Complete production-ready application'
    },
    {
      id: 4,
      name: 'Documentation',
      type: 'Documentation',
      status: 'Scheduled',
      deliveryDate: '2024-12-30',
      description: 'User manual and technical documentation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'default';
      case 'In Progress': return 'secondary';
      case 'Scheduled': return 'outline';
      case 'Delayed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return CheckCircle;
      case 'In Progress': return Package;
      case 'Scheduled': return Clock;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Delivery Management</h2>
        <Button>
          <Truck className="w-4 h-4 mr-2" />
          Schedule Delivery
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
            <CardTitle className="text-lg">Delivered</CardTitle>
            <CardDescription>1 item completed</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Package className="w-8 h-8 mx-auto text-blue-500" />
            <CardTitle className="text-lg">In Progress</CardTitle>
            <CardDescription>1 item in progress</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Clock className="w-8 h-8 mx-auto text-orange-500" />
            <CardTitle className="text-lg">Scheduled</CardTitle>
            <CardDescription>2 items scheduled</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delivery Items</h3>
        {deliveries.map((delivery) => {
          const StatusIcon = getStatusIcon(delivery.status);
          return (
            <Card key={delivery.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{delivery.name}</CardTitle>
                      <CardDescription>
                        {delivery.type} • Due: {delivery.deliveryDate}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(delivery.status)}>
                      {delivery.status}
                    </Badge>
                    {delivery.status === 'Delivered' && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{delivery.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
