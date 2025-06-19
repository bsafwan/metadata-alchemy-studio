
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

export default function PaymentsAndDues() {
  const payments = [
    { project: 'Website Redesign', amount: 1200, status: 'Paid', date: 'Nov 15' },
    { project: 'Mobile App', amount: 800, status: 'Pending', date: 'Nov 20' },
    { project: 'Brand Identity', amount: 600, status: 'Overdue', date: 'Nov 10' },
    { project: 'Logo Design', amount: 400, status: 'Paid', date: 'Oct 28' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'default';
      case 'Pending': return 'secondary';
      case 'Overdue': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <DollarSign className="w-4 h-4" />;
      case 'Overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payments & Dues</h2>
        <Badge variant="outline">$3,000 Total</Badge>
      </div>

      <div className="grid gap-4">
        {payments.map((payment, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{payment.project}</CardTitle>
                  <CardDescription>Due {payment.date}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold mb-1">${payment.amount}</div>
                  <Badge variant={getStatusColor(payment.status)} className="gap-1">
                    {getStatusIcon(payment.status)}
                    {payment.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
