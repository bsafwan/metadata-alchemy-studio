
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeadphonesIcon, AlertCircle, CheckCircle, Clock, Reply } from 'lucide-react';

export default function ProjectAdminSupport() {
  const tickets = [
    {
      id: 1,
      title: 'Login Issue with Mobile App',
      priority: 'High',
      status: 'Open',
      client: 'Tech Solutions Inc',
      createdDate: '2024-12-18',
      lastUpdate: '2 hours ago',
      description: 'Users unable to login on mobile devices after latest update'
    },
    {
      id: 2,
      title: 'Feature Request: Dark Mode',
      priority: 'Medium',
      status: 'In Progress',
      client: 'Tech Solutions Inc',
      createdDate: '2024-12-15',
      lastUpdate: '1 day ago',
      description: 'Client requesting dark mode theme option for the application'
    },
    {
      id: 3,
      title: 'Payment Gateway Error',
      priority: 'High',
      status: 'Resolved',
      client: 'Tech Solutions Inc',
      createdDate: '2024-12-10',
      lastUpdate: '3 days ago',
      description: 'Payment gateway returning error codes during checkout process'
    },
    {
      id: 4,
      title: 'Performance Optimization',
      priority: 'Low',
      status: 'Open',
      client: 'Tech Solutions Inc',
      createdDate: '2024-12-05',
      lastUpdate: '1 week ago',
      description: 'Request to optimize loading times for the dashboard page'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'destructive';
      case 'In Progress': return 'secondary';
      case 'Resolved': return 'default';
      case 'Closed': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return AlertCircle;
      case 'In Progress': return Clock;
      case 'Resolved': return CheckCircle;
      default: return HeadphonesIcon;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <Button>
          <HeadphonesIcon className="w-4 h-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-red-500" />
            <CardTitle className="text-lg">Open</CardTitle>
            <CardDescription>2 active tickets</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Clock className="w-8 h-8 mx-auto text-blue-500" />
            <CardTitle className="text-lg">In Progress</CardTitle>
            <CardDescription>1 ticket in progress</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
            <CardTitle className="text-lg">Resolved</CardTitle>
            <CardDescription>1 ticket resolved</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-orange-500" />
            <CardTitle className="text-lg">High Priority</CardTitle>
            <CardDescription>2 urgent tickets</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Tickets</h3>
        {tickets.map((ticket) => {
          const StatusIcon = getStatusIcon(ticket.status);
          return (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">#{ticket.id} - {ticket.title}</CardTitle>
                      <CardDescription>
                        Created: {ticket.createdDate} • Last update: {ticket.lastUpdate}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{ticket.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
