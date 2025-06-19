import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, MessageCircle, User, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserRegistrationModal from '@/components/UserRegistrationModal';
import { chatDB, type ChatMessage, type ChatUser } from '@/utils/indexedDBUtils';
import { supabase } from '@/integrations/supabase/client';
import ChatEmailActions from '@/components/ChatEmailActions';

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        text: `Hello ${name}! Welcome to our live chat. I'm here to help you with any questions about our services, pricing, or how we can assist your business. How can I help you today?`,
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
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or feel free to contact us directly at contact@elismet.com.";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentUser || isLoading) return;

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
    setIsLoading(true);

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
      setIsLoading(false);
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <UserRegistrationModal
        isOpen={showRegistration}
        onComplete={handleUserRegistration}
      />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link to="/get-started" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Get Started
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Live Chat</h1>
          <p className="text-gray-600">Get instant answers to your questions about our services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Card - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg h-[calc(100vh-280px)] min-h-[500px] flex flex-col">
              <CardHeader className="border-b flex-shrink-0 p-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-lg">Chat with Elismet</span>
                  </div>
                  {currentUser && (
                    <div className="flex items-center text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="hidden sm:inline">Online - {currentUser.name}</span>
                      <span className="sm:hidden">Online</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                {/* Messages Area with Scroll */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex max-w-[85%] sm:max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.sender === 'user' 
                              ? 'bg-blue-600' 
                              : 'bg-gray-200'
                          }`}>
                            {message.sender === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <MessageCircle className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg break-words ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-tr-sm'
                              : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[75%]">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg rounded-tl-sm">
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                              <p className="text-sm text-gray-500">Processing...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                {currentUser && (
                  <div className="border-t p-4 flex-shrink-0 bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                        maxLength={500}
                      />
                      <Button 
                        type="submit" 
                        disabled={isLoading || !inputMessage.trim()}
                        className="px-4 hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Press Enter to send • {inputMessage.length}/500 characters
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Email Actions Sidebar - Takes 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <ChatEmailActions
              messages={messages}
              currentUser={currentUser}
              sessionId={sessionId}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveChat;
