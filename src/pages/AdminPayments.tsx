
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, CreditCard, AlertCircle, TrendingUp } from 'lucide-react';

export default function AdminPayments() {
  const paymentStats = {
    totalRevenue: 125400,
    pendingPayments: 8,
    thisMonth: 45600,
    overdue: 3
  };

  const recentPayments = [
    { client: 'Tech Solutions Inc', amount: 5000, status: 'Paid', project: 'E-commerce Platform', date: '2 hours ago' },
    { client: 'Creative Design Co', amount: 3200, status: 'Pending', project: 'Brand Website', date: '1 day ago' },
    { client: 'StartUp Hub', amount: 8500, status: 'Overdue', project: 'Mobile App', date: '3 days ago' },
    { client: 'Marketing Pro', amount: 2100, status: 'Paid', project: 'Marketing Campaign', date: '1 week ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'default';
      case 'Pending': return 'secondary';
      case 'Overdue': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentStats.thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{paymentStats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{paymentStats.overdue}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Latest payment activities across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.client}</p>
                  <p className="text-sm text-muted-foreground">{payment.project} • {payment.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${payment.amount.toLocaleString()}</span>
                  <Badge variant={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
