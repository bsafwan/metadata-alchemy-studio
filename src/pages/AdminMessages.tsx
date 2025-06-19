
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Bell, Users } from 'lucide-react';

export default function AdminMessages() {
  const messageStats = {
    totalMessages: 1247,
    unread: 23,
    todayMessages: 45,
    activeConversations: 28
  };

  const recentMessages = [
    { 
      client: 'Tech Solutions Inc', 
      project: 'E-commerce Platform',
      message: 'Can we schedule a review call for tomorrow?', 
      time: '5 min ago',
      unread: true 
    },
    { 
      client: 'Creative Design Co', 
      project: 'Brand Website',
      message: 'The logo looks great! Ready for next phase.', 
      time: '1 hour ago',
      unread: true 
    },
    { 
      client: 'StartUp Hub', 
      project: 'Mobile App',
      message: 'Payment has been processed successfully.', 
      time: '3 hours ago',
      unread: false 
    },
    { 
      client: 'Marketing Pro', 
      project: 'Marketing Campaign',
      message: 'Thank you for the quick turnaround!', 
      time: '1 day ago',
      unread: false 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="flex gap-2">
          <Badge variant="outline">{messageStats.unread} Unread</Badge>
          <Button>Compose Message</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Bell className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.todayMessages}</div>
            <p className="text-xs text-muted-foreground">New messages today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Mail className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{messageStats.unread}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messageStats.activeConversations}</div>
            <p className="text-xs text-muted-foreground">Ongoing conversations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Latest client communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((msg, index) => (
              <div key={index} className={`p-3 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{msg.client}</span>
                      <Badge variant="outline" className="text-xs">{msg.project}</Badge>
                      {msg.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                    <p className="text-sm text-muted-foreground">{msg.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
