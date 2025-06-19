
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, AlertTriangle, Send } from 'lucide-react';
import { useZohoMail } from '@/hooks/useZohoMail';
import type { ChatMessage, ChatUser } from '@/utils/indexedDBUtils';

interface ChatEmailActionsProps {
  messages: ChatMessage[];
  currentUser: ChatUser | null;
  sessionId: string;
}

const ChatEmailActions = ({ messages, currentUser, sessionId }: ChatEmailActionsProps) => {
  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [escalationIssue, setEscalationIssue] = useState('');
  const [escalationPriority, setEscalationPriority] = useState<'high' | 'medium'>('medium');

  const { sendChatSummary, sendSupportEscalation, isSending } = useZohoMail();

  const generateChatSummary = (messages: ChatMessage[]): string => {
    const userMessages = messages.filter(m => m.sender === 'user').length;
    const assistantMessages = messages.filter(m => m.sender === 'assistant').length;
    
    const mainTopics = messages
      .filter(m => m.sender === 'user')
      .map(m => m.text)
      .join(' ')
      .toLowerCase();
    
    let summary = `Customer had ${userMessages} interactions with our AI assistant. `;
    
    if (mainTopics.includes('pricing') || mainTopics.includes('cost')) {
      summary += 'Discussed pricing and service costs. ';
    }
    if (mainTopics.includes('service') || mainTopics.includes('help')) {
      summary += 'Inquired about our services and capabilities. ';
    }
    if (mainTopics.includes('project') || mainTopics.includes('development')) {
      summary += 'Interested in project development services. ';
    }
    
    summary += `Conversation lasted ${messages.length} total messages.`;
    
    return summary;
  };

  const handleSendSummary = async () => {
    if (!currentUser || !ownerEmail) return;
    
    const summary = generateChatSummary(messages);
    
    const success = await sendChatSummary(
      ownerEmail,
      currentUser.email,
      {
        customerName: currentUser.name,
        sessionId,
        messages,
        summary
      }
    );
    
    if (success) {
      setShowSummaryForm(false);
      setOwnerEmail('');
    }
  };

  const handleSendEscalation = async () => {
    if (!currentUser || !supportEmail || !escalationIssue) return;
    
    const success = await sendSupportEscalation(
      supportEmail,
      {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        issue: escalationIssue,
        priority: escalationPriority
      }
    );
    
    if (success) {
      setShowEscalationForm(false);
      setSupportEmail('');
      setEscalationIssue('');
    }
  };

  if (!currentUser || messages.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowSummaryForm(!showSummaryForm)}
            className="flex-1"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Chat Summary
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowEscalationForm(!showEscalationForm)}
            className="flex-1"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Escalate to Support
          </Button>
        </div>

        {showSummaryForm && (
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label htmlFor="ownerEmail">Owner Email</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="owner@elismet.com"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSendSummary}
                disabled={!ownerEmail || isSending}
                className="flex-1"
              >
                {isSending ? 'Sending...' : 'Send Summary'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSummaryForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {showEscalationForm && (
          <div className="space-y-4 p-4 border rounded-lg bg-red-50">
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                placeholder="support@elismet.com"
              />
            </div>
            <div>
              <Label htmlFor="escalationIssue">Issue Description</Label>
              <Textarea
                id="escalationIssue"
                value={escalationIssue}
                onChange={(e) => setEscalationIssue(e.target.value)}
                placeholder="Describe the issue that requires escalation..."
                rows={3}
              />
            </div>
            <div>
              <Label>Priority Level</Label>
              <Select value={escalationPriority} onValueChange={(value: 'high' | 'medium') => setEscalationPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSendEscalation}
                disabled={!supportEmail || !escalationIssue || isSending}
                className="flex-1"
                variant="destructive"
              >
                {isSending ? 'Escalating...' : 'Send Escalation'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowEscalationForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatEmailActions;
