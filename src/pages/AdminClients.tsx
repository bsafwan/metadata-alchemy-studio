
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Building, Calendar, DollarSign } from 'lucide-react';

export default function AdminClients() {
  const clients = [
    { 
      name: 'Tech Solutions Inc', 
      email: 'contact@techsolutions.com',
      projects: 8, 
      status: 'Active', 
      revenue: 12500,
      joined: 'Jan 2024',
      lastActive: '2 hours ago'
    },
    { 
      name: 'Creative Design Co', 
      email: 'hello@creativedesign.com',
      projects: 5, 
      status: 'Active', 
      revenue: 8900,
      joined: 'Feb 2024',
      lastActive: '1 day ago'
    },
    { 
      name: 'Marketing Pro', 
      email: 'info@marketingpro.com',
      projects: 3, 
      status: 'Inactive', 
      revenue: 4200,
      joined: 'Mar 2024',
      lastActive: '1 week ago'
    },
    { 
      name: 'StartUp Hub', 
      email: 'team@startuphub.com',
      projects: 12, 
      status: 'Premium', 
      revenue: 25600,
      joined: 'Dec 2023',
      lastActive: '30 min ago'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Premium': return 'secondary';
      case 'Inactive': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Client Management</h2>
        <div className="flex gap-2">
          <Badge variant="outline">147 Total Clients</Badge>
          <Button>Add New Client</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {clients.map((client, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-elismet-blue rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>{client.email}</CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{client.projects} Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>${client.revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {client.joined}</span>
                </div>
                <div className="text-muted-foreground">
                  Last active: {client.lastActive}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
