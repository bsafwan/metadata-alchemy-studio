
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Calendar, 
  User, 
  MessageSquare, 
  Monitor, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function ProjectAdminOverview() {
  const projectData = {
    name: 'E-commerce Platform',
    client: 'Tech Solutions Inc',
    progress: 85,
    status: 'In Progress',
    budget: 15000,
    paid: 10000,
    deadline: 'Dec 30, 2024',
    team: 4,
    lastActivity: '2 hours ago'
  };

  const quickStats = [
    { label: 'Total Budget', value: `$${projectData.budget.toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Amount Paid', value: `$${projectData.paid.toLocaleString()}`, icon: CheckCircle, color: 'text-blue-500' },
    { label: 'Due Amount', value: `$${(projectData.budget - projectData.paid).toLocaleString()}`, icon: AlertCircle, color: 'text-orange-500' },
    { label: 'Team Size', value: projectData.team, icon: User, color: 'text-purple-500' },
  ];

  const recentActivity = [
    { action: 'Demo uploaded', time: '2 hours ago', type: 'demo' },
    { action: 'Payment received', time: '1 day ago', type: 'payment' },
    { action: 'Support ticket opened', time: '2 days ago', type: 'support' },
    { action: 'Status updated', time: '3 days ago', type: 'status' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{projectData.name}</h2>
          <p className="text-muted-foreground">Client: {projectData.client}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{projectData.status}</Badge>
          <Button>Send Message</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Current completion status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{projectData.progress}%</span>
              </div>
              <Progress value={projectData.progress} />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Due: {projectData.deadline}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last activity: {projectData.lastActivity}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest project updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'payment' ? 'bg-green-500' : 
                      activity.type === 'demo' ? 'bg-blue-500' : 
                      activity.type === 'support' ? 'bg-orange-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-sm">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <MessageSquare className="w-8 h-8 mx-auto text-blue-500" />
            <CardTitle className="text-lg">Messages</CardTitle>
            <CardDescription>3 unread messages</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <Monitor className="w-8 h-8 mx-auto text-green-500" />
            <CardTitle className="text-lg">Demos</CardTitle>
            <CardDescription>2 demos ready</CardDescription>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader className="text-center">
            <AlertCircle className="w-8 h-8 mx-auto text-orange-500" />
            <CardTitle className="text-lg">Support</CardTitle>
            <CardDescription>1 open ticket</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
