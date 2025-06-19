
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeadphonesIcon, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function SupportTickets() {
  const tickets = [
    { id: '#001', title: 'Login Issue', priority: 'High', status: 'Open', time: '2 hours ago' },
    { id: '#002', title: 'Design Feedback', priority: 'Medium', status: 'In Progress', time: '1 day ago' },
    { id: '#003', title: 'Payment Question', priority: 'Low', status: 'Resolved', time: '3 days ago' },
    { id: '#004', title: 'File Access', priority: 'High', status: 'Open', time: '5 hours ago' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Support Tickets</h2>
        <Badge variant="outline">2 Open</Badge>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-orange rounded-lg flex items-center justify-center">
                    <HeadphonesIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{ticket.title}</CardTitle>
                    <CardDescription>{ticket.id} • {ticket.time}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    {getStatusIcon(ticket.status)}
                    {ticket.status}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
