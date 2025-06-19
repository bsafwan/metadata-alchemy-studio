
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DollarSign, CreditCard, AlertCircle, Send } from 'lucide-react';

export default function ProjectAdminPayments() {
  const paymentData = {
    totalBudget: 15000,
    totalPaid: 10000,
    totalPending: 5000,
    completionRate: 67
  };

  const payments = [
    {
      id: 1,
      milestone: 'Initial Payment',
      amount: 5000,
      status: 'Paid',
      dueDate: '2024-11-15',
      paidDate: '2024-11-14'
    },
    {
      id: 2,
      milestone: 'Mid-project Payment',
      amount: 5000,
      status: 'Paid',
      dueDate: '2024-12-01',
      paidDate: '2024-11-30'
    },
    {
      id: 3,
      milestone: 'Final Payment',
      amount: 5000,
      status: 'Pending',
      dueDate: '2024-12-30',
      paidDate: null
    }
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
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Send Reminder
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentData.totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentData.totalPaid.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentData.totalPending.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>Overall project payment status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Payment Completion</span>
              <span>{paymentData.completionRate}%</span>
            </div>
            <Progress value={paymentData.completionRate} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Milestones</h3>
        {payments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{payment.milestone}</CardTitle>
                  <CardDescription>
                    Due: {payment.dueDate}
                    {payment.paidDate && ` • Paid: ${payment.paidDate}`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                  <span className="text-lg font-bold">${payment.amount.toLocaleString()}</span>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
