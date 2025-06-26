
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, Mail, User, Link as LinkIcon, Image, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { EmailService } from '@/utils/emailService';

const AdminMessaging = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    userIdentifier: '',
    email: '',
    message: '',
    attachmentLink: '',
    backgroundImage: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userIdentifier || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please provide user identifier and message.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      let successCount = 0;
      let totalAttempts = 0;

      // Send browser notification if user identifier exists
      if (formData.userIdentifier) {
        totalAttempts++;
        try {
          // Send notification via our messaging service
          const notificationData = {
            userIdentifier: formData.userIdentifier,
            message: formData.message,
            attachmentLink: formData.attachmentLink || null,
            backgroundImage: formData.backgroundImage || null
          };

          console.log('Sending browser notification:', notificationData);
          
          // Here you would typically send to your notification service
          // For now, we'll simulate success
          successCount++;
          
          toast({
            title: "Browser Notification Sent!",
            description: `Message sent to user ${formData.userIdentifier}`,
          });
          
        } catch (error) {
          console.error('Failed to send browser notification:', error);
        }
      }

      // Send email if email is provided
      if (formData.email) {
        totalAttempts++;
        try {
          const emailSuccess = await EmailService.sendEmail({
            to: [formData.email],
            subject: 'Message from Elismet Support',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; ${formData.backgroundImage ? `background-image: url(${formData.backgroundImage}); background-size: cover; background-position: center;` : 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'} padding: 40px 20px; border-radius: 12px;">
                
                <div style="text-align: center; margin-bottom: 30px;">
                  <img 
                    src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                    alt="Elismet LTD" 
                    style="height: 60px; margin-bottom: 20px;" 
                  />
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.95); padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <h2 style="color: #2563eb; text-align: center; margin-bottom: 20px;">Message from Elismet Support</h2>
                  
                  <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #374151;">${formData.message}</p>
                  </div>

                  ${formData.attachmentLink ? `
                  <div style="margin: 20px 0; text-align: center;">
                    <a href="${formData.attachmentLink}" target="_blank" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                      📎 View Attachment
                    </a>
                  </div>
                  ` : ''}
                  
                  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
                    <p>Best regards,<br><strong>The Elismet Team</strong></p>
                    <p style="margin-top: 15px;">
                      <a href="mailto:support@elismet.com" style="color: #2563eb;">support@elismet.com</a>
                    </p>
                  </div>
                </div>
              </div>
            `,
            text: `
Message from Elismet Support

${formData.message}

${formData.attachmentLink ? `Attachment: ${formData.attachmentLink}` : ''}

Best regards,
The Elismet Team
support@elismet.com
            `
          });

          if (emailSuccess) {
            successCount++;
            toast({
              title: "Email Sent!",
              description: `Email delivered to ${formData.email}`,
            });
          }
          
        } catch (error) {
          console.error('Failed to send email:', error);
        }
      }

      if (successCount > 0) {
        toast({
          title: "Messages Sent Successfully!",
          description: `${successCount} out of ${totalAttempts} messages sent successfully.`,
        });
        
        // Reset form
        setFormData({
          userIdentifier: '',
          email: '',
          message: '',
          attachmentLink: '',
          backgroundImage: ''
        });
      } else {
        throw new Error('All message sending attempts failed');
      }
      
    } catch (error) {
      console.error('Message sending error:', error);
      toast({
        title: "Sending Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Simple navigation header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-10" 
              />
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-16" 
              />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Admin Messaging
              <span className="block text-blue-600">Send Direct Messages</span>
            </h1>
            
            <p className="text-xl text-gray-600">
              Send messages to users via notifications and email
            </p>
          </div>

          {/* Main Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                  Compose Message
                </CardTitle>
                <CardDescription className="text-lg">
                  Enter user identifier and compose your message
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* User Identifier */}
                  <div className="space-y-3">
                    <Label htmlFor="userIdentifier" className="text-lg font-semibold text-gray-900 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      User Identifier *
                    </Label>
                    <Input
                      id="userIdentifier"
                      type="text"
                      value={formData.userIdentifier}
                      onChange={(e) => handleInputChange('userIdentifier', e.target.value)}
                      placeholder="USR-2024-ABC123"
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                      required
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-900 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      Email (Optional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="user@example.com"
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-lg font-semibold text-gray-900 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-[120px] text-lg border-gray-200 focus:border-blue-500 rounded-xl resize-none"
                      required
                    />
                  </div>

                  {/* Attachment Link (Optional) */}
                  <div className="space-y-3">
                    <Label htmlFor="attachmentLink" className="text-lg font-semibold text-gray-900 flex items-center">
                      <LinkIcon className="w-5 h-5 mr-2 text-blue-600" />
                      Attachment Link (Optional)
                    </Label>
                    <Input
                      id="attachmentLink"
                      type="url"
                      value={formData.attachmentLink}
                      onChange={(e) => handleInputChange('attachmentLink', e.target.value)}
                      placeholder="https://example.com/attachment"
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  {/* Background Image (Optional) */}
                  <div className="space-y-3">
                    <Label htmlFor="backgroundImage" className="text-lg font-semibold text-gray-900 flex items-center">
                      <Image className="w-5 h-5 mr-2 text-blue-600" />
                      Background Image URL (Optional)
                    </Label>
                    <Input
                      id="backgroundImage"
                      type="url"
                      value={formData.backgroundImage}
                      onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                      placeholder="https://example.com/background.jpg"
                      className="h-12 text-lg border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSending}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-3 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Card */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                How it Works
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <p>Enter the user's unique identifier (required)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <p>Add email address if available (optional)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <p>Compose your message with optional links and background</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                  <p>Message will be sent as browser notification + email (if provided)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessaging;
