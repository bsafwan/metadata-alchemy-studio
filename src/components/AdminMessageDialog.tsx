
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Link as LinkIcon, Image, Loader2, Plus, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

interface AdminMessageDialogProps {
  inquiry: CRMInquiry;
  isOpen: boolean;
  onClose: () => void;
  onMessageSent: () => void;
}

interface LinkItem {
  text: string;
  url: string;
}

interface ImageItem {
  alt: string;
  url: string;
}

export function AdminMessageDialog({ inquiry, isOpen, onClose, onMessageSent }: AdminMessageDialogProps) {
  const [title, setTitle] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isSending, setIsSending] = useState(false);

  const addLink = () => {
    setLinks([...links, { text: '', url: '' }]);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: 'text' | 'url', value: string) => {
    const updated = links.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    );
    setLinks(updated);
  };

  const addImage = () => {
    setImages([...images, { alt: '', url: '' }]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, field: 'alt' | 'url', value: string) => {
    const updated = images.map((image, i) => 
      i === index ? { ...image, [field]: value } : image
    );
    setImages(updated);
  };

  const handleSendMessage = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!emailContent.trim() && !notificationContent.trim()) {
      toast.error('Please provide either email content or notification content');
      return;
    }

    setIsSending(true);

    try {
      // Filter and convert to plain objects for JSON storage
      const filteredLinks = links.filter(link => link.text && link.url);
      const filteredImages = images.filter(image => image.alt && image.url);

      // Save message to database - converting arrays to JSON
      const messageData = {
        crm_inquiry_id: inquiry.id,
        title: title.trim(),
        email_content: emailContent.trim() || null,
        notification_content: notificationContent.trim() || null,
        links: filteredLinks as any, // Convert to Json type
        images: filteredImages as any, // Convert to Json type
      };

      const { error: dbError } = await supabase
        .from('admin_messages')
        .insert(messageData);

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      // Send message via edge function
      const { error: sendError } = await supabase.functions.invoke('send-admin-message', {
        body: {
          inquiry,
          title: title.trim(),
          emailContent: emailContent.trim() || null,
          notificationContent: notificationContent.trim() || null,
          links: filteredLinks,
          images: filteredImages,
        }
      });

      if (sendError) {
        console.error('Send error:', sendError);
        throw sendError;
      }

      toast.success('Message sent successfully!');
      onMessageSent();
      
      // Reset form
      setTitle('');
      setEmailContent('');
      setNotificationContent('');
      setLinks([]);
      setImages([]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send Message to {inquiry.company_name}</DialogTitle>
          <DialogDescription>
            Send a direct message via email and/or notification to this CRM inquiry
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiry Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Inquiry Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <Label className="font-semibold">Company:</Label>
                <p>{inquiry.company_name}</p>
              </div>
              <div>
                <Label className="font-semibold">Email:</Label>
                <p>{inquiry.email}</p>
              </div>
              <div>
                <Label className="font-semibold">Phone:</Label>
                <p>{inquiry.phone}</p>
              </div>
              {inquiry.user_identifier && (
                <div>
                  <Label className="font-semibold">User ID:</Label>
                  <Badge variant="secondary" className="text-xs">
                    {inquiry.user_identifier}
                  </Badge>
                </div>
              )}
              <div>
                <Label className="font-semibold">Date:</Label>
                <p>{new Date(inquiry.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Message Form */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Label htmlFor="title">Message Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter message title..."
                className="mt-1"
              />
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList>
                <TabsTrigger value="email">Email Content</TabsTrigger>
                <TabsTrigger value="notification">Notification Content</TabsTrigger>
                <TabsTrigger value="attachments">Links & Images</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div>
                  <Label htmlFor="emailContent">Email Message</Label>
                  <Textarea
                    id="emailContent"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Enter email content (can be different from notification)..."
                    rows={8}
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="notification" className="space-y-4">
                <div>
                  <Label htmlFor="notificationContent">Notification Message</Label>
                  <Textarea
                    id="notificationContent"
                    value={notificationContent}
                    onChange={(e) => setNotificationContent(e.target.value)}
                    placeholder="Enter notification content (can be different from email)..."
                    rows={8}
                    className="mt-1"
                  />
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-4">
                {/* Links Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Links</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addLink}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Link
                    </Button>
                  </div>
                  {links.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder="Link text"
                        value={link.text}
                        onChange={(e) => updateLink(index, 'text', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeLink(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Images Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Images</Label>
                    <Button type="button" size="sm" variant="outline" onClick={addImage}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Image
                    </Button>
                  </div>
                  {images.map((image, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder="Alt text"
                        value={image.alt}
                        onChange={(e) => updateImage(index, 'alt', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Image URL"
                        value={image.url}
                        onChange={(e) => updateImage(index, 'url', e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage} disabled={isSending}>
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
