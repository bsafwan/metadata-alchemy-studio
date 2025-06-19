
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Server, Database, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminStatus() {
  const systemStatus = [
    { service: 'Web Server', status: 'Online', uptime: '99.9%', icon: Server, color: 'text-green-500' },
    { service: 'Database', status: 'Online', uptime: '99.8%', icon: Database, color: 'text-green-500' },
    { service: 'File Storage', status: 'Online', uptime: '100%', icon: Activity, color: 'text-green-500' },
    { service: 'Email Service', status: 'Warning', uptime: '98.5%', icon: AlertTriangle, color: 'text-orange-500' },
    { service: 'Payment Gateway', status: 'Online', uptime: '99.7%', icon: CheckCircle, color: 'text-green-500' },
    { service: 'CDN', status: 'Online', uptime: '99.9%', icon: Wifi, color: 'text-green-500' },
  ];

  const recentEvents = [
    { event: 'Server restart completed', time: '2 min ago', type: 'info' },
    { event: 'High memory usage detected', time: '15 min ago', type: 'warning' },
    { event: 'Database backup completed', time: '1 hour ago', type: 'success' },
    { event: 'New user registration spike', time: '3 hours ago', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Status</h2>
        <Badge variant="outline" className="text-green-600">All Systems Operational</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {systemStatus.map((system, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <system.icon className={`w-5 h-5 ${system.color}`} />
                <Badge variant={system.status === 'Online' ? 'default' : 'secondary'}>
                  {system.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm">{system.service}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Uptime: {system.uptime}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent System Events</CardTitle>
          <CardDescription>Latest system activity and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'success' ? 'bg-green-500' : 
                    event.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-sm">{event.event}</span>
                </div>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
