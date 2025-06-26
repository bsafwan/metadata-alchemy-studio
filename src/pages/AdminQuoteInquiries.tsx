
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Calendar, Building2, User, Phone, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminMessageDialog } from '@/components/AdminMessageDialog';

interface CRMInquiry {
  id: string;
  company_name: string;
  email: string;
  phone: string;
  crm_needs: string;
  user_identifier: string | null;
  source_page: string | null;
  created_at: string;
}

export default function AdminQuoteInquiries() {
  const [selectedInquiry, setSelectedInquiry] = useState<CRMInquiry | null>(null);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const { data: inquiries, isLoading, refetch } = useQuery({
    queryKey: ['admin-crm-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crm_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CRMInquiry[];
    }
  });

  const { data: messageCounts } = useQuery({
    queryKey: ['admin-message-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_messages')
        .select('crm_inquiry_id')
        .not('crm_inquiry_id', 'is', null);
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(msg => {
        if (msg.crm_inquiry_id) {
          counts[msg.crm_inquiry_id] = (counts[msg.crm_inquiry_id] || 0) + 1;
        }
      });
      return counts;
    }
  });

  const handleSendMessage = (inquiry: CRMInquiry) => {
    setSelectedInquiry(inquiry);
    setIsMessageDialogOpen(true);
  };

  const handleMessageSent = () => {
    setIsMessageDialogOpen(false);
    setSelectedInquiry(null);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quote Inquiries</h2>
        <Badge variant="outline">{inquiries?.length || 0} Total Inquiries</Badge>
      </div>

      <div className="grid gap-4">
        {inquiries?.map((inquiry) => (
          <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{inquiry.company_name}</CardTitle>
                  {inquiry.user_identifier && (
                    <Badge variant="secondary" className="text-xs">
                      ID: {inquiry.user_identifier}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {messageCounts?.[inquiry.id] && (
                    <Badge variant="outline" className="text-xs">
                      {messageCounts[inquiry.id]} messages sent
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage(inquiry)}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </div>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </span>
                {inquiry.source_page && (
                  <span className="text-muted-foreground">
                    Source: {inquiry.source_page}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-green-600" />
                    {inquiry.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-orange-600" />
                    {inquiry.phone}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">CRM Requirements:</h4>
                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                    {inquiry.crm_needs}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {!inquiries || inquiries.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No CRM inquiries found</p>
          </div>
        )}
      </div>

      {selectedInquiry && (
        <AdminMessageDialog
          inquiry={selectedInquiry}
          isOpen={isMessageDialogOpen}
          onClose={() => setIsMessageDialogOpen(false)}
          onMessageSent={handleMessageSent}
        />
      )}
    </div>
  );
}
