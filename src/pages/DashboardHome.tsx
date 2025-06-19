
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MessageSquare, 
  Monitor, 
  DollarSign, 
  AlertCircle, 
  Mail, 
  Image, 
  TrendingUp 
} from 'lucide-react';

export default function DashboardHome() {
  // Mock data for demonstration
  const stats = {
    totalMessages: 127,
    totalImages: 45,
    demosSent: 8,
    moneySpent: 2450,
    pendingPayments: 3,
    activeProjects: 2,
    completionRate: 75,
    supportTickets: 2
  };

  const recentEvents = [
    { id: 1, type: 'Demo Sent', project: 'Website Redesign', time: '2 hours ago' },
    { id: 2, type: 'Payment Received', project: 'Mobile App', time: '1 day ago' },
    { id: 3, type: 'Message Received', project: 'Brand Identity', time: '2 days ago' },
    { id: 4, type: 'Project Updated', project: 'Website Redesign', time: '3 days ago' },
  ];

  const messages = [
    { id: 1, from: 'John Smith', subject: 'Project Update Required', time: '1 hour ago', unread: true },
    { id: 2, from: 'Sarah Johnson', subject: 'Payment Confirmation', time: '3 hours ago', unread: false },
    { id: 3, from: 'Mike Wilson', subject: 'Demo Feedback', time: '1 day ago', unread: true },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>
        <Badge variant="outline" className="text-elismet-blue border-elismet-blue">
          {stats.activeProjects} Active Projects
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demos Sent</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.demosSent}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.moneySpent}</div>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images Uploaded</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImages}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <Progress value={stats.completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.supportTickets}</div>
            <p className="text-xs text-muted-foreground">1 open, 1 resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Messages */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>Latest activities across your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-elismet-blue rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.type}</p>
                    <p className="text-xs text-muted-foreground">{event.project}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages & Emails</CardTitle>
            <CardDescription>Recent communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${message.unread ? 'bg-elismet-orange' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{message.from}</p>
                    <p className="text-xs text-muted-foreground">{message.subject}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Project Progression</CardTitle>
          <CardDescription>Current status of your active projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Website Redesign</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Mobile App Development</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Brand Identity</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
