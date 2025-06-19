
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Clock, User } from 'lucide-react';

export default function Conversations() {
  const conversations = [
    { id: 1, name: 'Sarah Johnson', message: 'Hey, how is the project going?', time: '2 min ago', unread: 3 },
    { id: 2, name: 'Mike Wilson', message: 'Can we schedule a call?', time: '1 hour ago', unread: 0 },
    { id: 3, name: 'Emma Davis', message: 'Love the new design!', time: '3 hours ago', unread: 1 },
    { id: 4, name: 'John Smith', message: 'Payment has been processed', time: '1 day ago', unread: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Conversations</h2>
        <Badge variant="outline">4 Active</Badge>
      </div>

      <div className="grid gap-4">
        {conversations.map((conv) => (
          <Card key={conv.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-blue rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{conv.name}</CardTitle>
                    <CardDescription className="text-sm">{conv.message}</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    {conv.time}
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
