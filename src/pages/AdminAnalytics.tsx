
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function AdminAnalytics() {
  const analytics = {
    monthlyGrowth: 15,
    clientRetention: 89,
    avgProjectValue: 12500,
    completionRate: 78
  };

  const monthlyStats = [
    { month: 'Jan', clients: 120, revenue: 45000, projects: 67 },
    { month: 'Feb', clients: 125, revenue: 48000, projects: 72 },
    { month: 'Mar', clients: 132, revenue: 52000, projects: 78 },
    { month: 'Apr', clients: 140, revenue: 55000, projects: 85 },
    { month: 'May', clients: 147, revenue: 58000, projects: 89 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Analytics</h2>
        <Badge variant="outline">Last 6 Months</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+{analytics.monthlyGrowth}%</div>
            <Progress value={analytics.monthlyGrowth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Retention</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.clientRetention}%</div>
            <Progress value={analytics.clientRetention} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Project Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.avgProjectValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completionRate}%</div>
            <Progress value={analytics.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Key metrics over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 items-center py-2 border-b last:border-b-0">
                <div className="font-medium">{stat.month}</div>
                <div className="text-sm text-muted-foreground">{stat.clients} clients</div>
                <div className="text-sm text-green-600">${stat.revenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">{stat.projects} projects</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
