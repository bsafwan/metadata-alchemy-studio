
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, MessageCircle, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserRegistrationModal from '@/components/UserRegistrationModal';
import { chatDB, type ChatMessage, type ChatUser } from '@/utils/indexedDBUtils';
import { supabase } from '@/integrations/supabase/client';

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRegistration, setShowRegistration] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize session on component mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Generate session ID
        const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);

        // Initialize IndexedDB
        await chatDB.init();

        // Check if user exists in this session (for page refresh)
        const existingUser = await chatDB.getUser(newSessionId);
        if (existingUser) {
          setCurrentUser(existingUser);
          setShowRegistration(false);
          
          // Load existing messages
          const existingMessages = await chatDB.getMessages(newSessionId);
          setMessages(existingMessages);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize session:', error);
        setIsInitialized(true);
      }
    };

    initializeSession();
  }, []);

  const handleUserRegistration = async (name: string, email: string) => {
    try {
      const user: ChatUser = {
        sessionId,
        name,
        email
      };

      // Save to IndexedDB
      await chatDB.saveUser(user);

      // Save to Supabase
      const { error } = await supabase
        .from('chat_users')
        .insert([{
          name,
          email,
          session_id: sessionId
        }]);

      if (error) {
        console.error('Error saving user to Supabase:', error);
      }

      setCurrentUser(user);
      setShowRegistration(false);

      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        sessionId,
        text: `Hello ${name}! Welcome to our live chat support. I'm here to help you with any questions about our services, pricing, or how we can assist your business. How can I help you today?`,
        sender: 'assistant',
        timestamp: new Date()
      };

      await chatDB.saveMessage(welcomeMessage);
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to register user:', error);
    }
  };

  const sendMessageToAPI = async (messages: ChatMessage[]): Promise<string> => {
    try {
      const response = await supabase.functions.invoke('deepseek-chat', {
        body: {
          messages: messages.slice(-10), // Send last 10 messages for context
          sessionId
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.data.message;
    } catch (error) {
      console.error('API Error:', error);
      return "I apologize, but I'm having trouble connecting to our support system right now. Please try again in a moment, or feel free to contact us directly at contact@elismet.com.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentUser) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sessionId,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Save user message
    await chatDB.saveMessage(userMessage);
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await sendMessageToAPI(updatedMessages);
      
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sessionId,
        text: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };

      // Save assistant message
      await chatDB.saveMessage(assistantMessage);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <UserRegistrationModal
        isOpen={showRegistration}
        onComplete={handleUserRegistration}
      />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Get Started
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Chat</h1>
            <p className="text-gray-600">Get instant answers to your questions about our services</p>
          </div>

          <Card className="shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                Chat with Elismet Support
                {currentUser && (
                  <div className="ml-auto flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online - {currentUser.name}
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 ml-2' 
                          : 'bg-gray-200 mr-2'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center space-x-1">
                          <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                          <p className="text-sm text-gray-500">Support is typing...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {currentUser && (
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button type="submit" disabled={isTyping || !inputMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveChat;
