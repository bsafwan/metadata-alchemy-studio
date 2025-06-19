
import { useEffect } from 'react';
import { useZohoMail } from '@/hooks/useZohoMail';
import type { ChatMessage, ChatUser } from '@/utils/indexedDBUtils';

interface ChatEmailActionsProps {
  messages: ChatMessage[];
  currentUser: ChatUser | null;
  sessionId: string;
}

const ChatEmailActions = ({ messages, currentUser, sessionId }: ChatEmailActionsProps) => {
  const { sendChatSummary, sendQuoteRequest, isSending } = useZohoMail();

  const COMPANY_EMAIL = 'bsafwanjamil677@gmail.com';

  const generateChatSummary = (messages: ChatMessage[]): string => {
    const userMessages = messages.filter(m => m.sender === 'user');
    const assistantMessages = messages.filter(m => m.sender === 'assistant');
    
    const conversation = messages.map(m => 
      `${m.sender === 'user' ? currentUser?.name || 'User' : 'Assistant'}: ${m.text}`
    ).join('\n\n');
    
    return `Chat session completed with ${userMessages.length} user messages and ${assistantMessages.length} assistant responses.\n\nFull Conversation:\n${conversation}`;
  };

  const handleWindowClose = async () => {
    if (!currentUser || messages.length === 0) return;
    
    console.log('Window closing, sending chat summary...');
    const summary = generateChatSummary(messages);
    
    await sendChatSummary(
      [currentUser.email, COMPANY_EMAIL],
      {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        sessionId,
        messages,
        summary
      }
    );
  };

  // Handle window close event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Send summary asynchronously
      handleWindowClose();
      
      // Show confirmation dialog
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [messages, currentUser, sessionId]);

  // Function to handle quote/request completion
  const handleQuoteRequest = async (requestDetails: string) => {
    if (!currentUser) return;
    
    console.log('Sending quote request...');
    await sendQuoteRequest(
      [currentUser.email, COMPANY_EMAIL],
      {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        requestDetails,
        messages: messages.slice(-5) // Last 5 messages for context
      }
    );
  };

  // Expose the quote request function globally so AI can call it
  useEffect(() => {
    (window as any).sendQuoteRequest = handleQuoteRequest;
    
    return () => {
      delete (window as any).sendQuoteRequest;
    };
  }, [currentUser, messages]);

  // This component doesn't render anything visible
  return null;
};

export default ChatEmailActions;
