
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Shield, Database, Bell, Users, Lock } from 'lucide-react';

export default function AdminSettings() {
  const systemSettings = [
    { category: 'User Management', description: 'Manage user roles and permissions', icon: Users },
    { category: 'Security Settings', description: 'Configure system security', icon: Shield },
    { category: 'Database Management', description: 'Monitor and manage databases', icon: Database },
    { category: 'Notifications', description: 'System notification settings', icon: Bell },
    { category: 'Access Control', description: 'Configure access policies', icon: Lock },
  ];

  const systemInfo = [
    { label: 'System Version', value: 'v2.1.4' },
    { label: 'Database Status', value: 'Healthy' },
    { label: 'Active Sessions', value: '1,247' },
    { label: 'Storage Used', value: '78.5 GB' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Settings</h2>
        <Badge variant="outline" className="text-red-600 border-red-600">
          Super Admin
        </Badge>
      </div>

      {/* System Settings */}
      <div className="grid gap-4">
        {systemSettings.map((setting, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <setting.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{setting.category}</CardTitle>
                    <CardDescription>{setting.description}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemInfo.map((info, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-muted-foreground">{info.label}</div>
                <div className="text-lg font-semibold mt-1">{info.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Backup System</Button>
            <Button variant="outline">Export Data</Button>
            <Button variant="outline">System Logs</Button>
            <Button variant="outline">Performance Report</Button>
            <Button variant="destructive">Emergency Shutdown</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
