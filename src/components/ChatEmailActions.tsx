
import { useEffect, useRef } from 'react';
import { useZohoMail } from '@/hooks/useZohoMail';
import type { ChatMessage, ChatUser } from '@/utils/indexedDBUtils';

interface ChatEmailActionsProps {
  messages: ChatMessage[];
  currentUser: ChatUser | null;
  sessionId: string;
}

const ChatEmailActions = ({ messages, currentUser, sessionId }: ChatEmailActionsProps) => {
  const { sendChatSummary, sendQuoteRequest, isSending } = useZohoMail();
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const emailSentRef = useRef(false);

  const COMPANY_EMAIL = 'bsafwanjamil677@gmail.com';
  const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

  const generateChatSummary = (messages: ChatMessage[]): string => {
    const userMessages = messages.filter(m => m.sender === 'user');
    const assistantMessages = messages.filter(m => m.sender === 'assistant');
    
    const conversation = messages.map(m => 
      `${m.sender === 'user' ? currentUser?.name || 'User' : 'Assistant'}: ${m.text}`
    ).join('\n\n');
    
    return `Chat session completed with ${userMessages.length} user messages and ${assistantMessages.length} assistant responses.\n\nFull Conversation:\n${conversation}`;
  };

  const sendEmailsOnEnd = async () => {
    if (!currentUser || messages.length === 0 || emailSentRef.current) return;
    
    console.log('Sending end-of-conversation emails...');
    emailSentRef.current = true;
    
    const summary = generateChatSummary(messages);
    
    // Send simple acknowledgment to user
    await sendChatSummary(
      [currentUser.email],
      {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        sessionId,
        messages: [], // Empty for user email
        summary: `Thank you for contacting us! We have received your messages and will get back to you soon.`
      }
    );

    // Send full transcript to company
    await sendChatSummary(
      [COMPANY_EMAIL],
      {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        sessionId,
        messages,
        summary
      }
    );
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(() => {
      console.log('User inactive for 10 minutes, sending emails...');
      sendEmailsOnEnd();
    }, INACTIVITY_TIMEOUT);
  };

  // Handle window close event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!emailSentRef.current) {
        sendEmailsOnEnd();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [messages, currentUser, sessionId]);

  // Handle user activity tracking
  useEffect(() => {
    if (!currentUser || messages.length === 0) return;

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Start the initial timer
    resetInactivityTimer();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [currentUser, messages]);

  // Function to handle quote/request completion
  const handleQuoteRequest = async (requestDetails: string) => {
    if (!currentUser) return;
    
    console.log('Sending quote request...');
    
    // Send acknowledgment to user
    await sendQuoteRequest(
      [currentUser.email],
      {
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        requestDetails: 'Thank you for your request! We will prepare a detailed quote and send it to you shortly.',
        messages: [] // Empty for user email
      }
    );

    // Send full details to company
    await sendQuoteRequest(
      [COMPANY_EMAIL],
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
