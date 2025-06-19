
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Status() {
  const statusItems = [
    { title: 'System Health', status: 'Healthy', icon: CheckCircle, color: 'text-green-500' },
    { title: 'Project Progress', status: 'On Track', icon: TrendingUp, color: 'text-blue-500' },
    { title: 'Team Activity', status: 'Active', icon: Activity, color: 'text-purple-500' },
    { title: 'Pending Issues', status: '2 Open', icon: AlertTriangle, color: 'text-orange-500' },
  ];

  const recentActivity = [
    { event: 'Design Review Completed', time: '30 min ago', type: 'success' },
    { event: 'Payment Received', time: '2 hours ago', type: 'info' },
    { event: 'New Message from Client', time: '4 hours ago', type: 'warning' },
    { event: 'Project Milestone Reached', time: '1 day ago', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Status Overview</h2>
        <Badge variant="outline">All Systems</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statusItems.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <Badge variant="outline">{item.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm">{item.title}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-sm">{activity.event}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
