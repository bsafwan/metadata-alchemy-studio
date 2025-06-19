
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Reply } from 'lucide-react';

export default function ProjectAdminMessages() {
  const messages = [
    {
      id: 1,
      from: 'Client',
      subject: 'Project Update Request',
      preview: 'Hi, could you provide an update on the current progress...',
      time: '2 hours ago',
      status: 'unread'
    },
    {
      id: 2,
      from: 'Team Member',
      subject: 'Design Approval Needed',
      preview: 'The latest designs are ready for client review...',
      time: '1 day ago',
      status: 'read'
    },
    {
      id: 3,
      from: 'Client',
      subject: 'Payment Confirmation',
      preview: 'Payment has been processed successfully...',
      time: '2 days ago',
      status: 'replied'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'destructive';
      case 'read': return 'secondary';
      case 'replied': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Messages</h2>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">{message.subject}</CardTitle>
                    <CardDescription>From: {message.from} • {message.time}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(message.status)}>
                    {message.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{message.preview}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
