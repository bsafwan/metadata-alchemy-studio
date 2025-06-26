
import { ArrowLeft, MessageSquare, Phone, Mail, Share2, Clock, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactButton from '@/components/ContactButton';

const MultiChannelSupport = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex items-center text-elismet-blue hover:text-elismet-lightBlue mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="w-20 h-20 bg-elismet-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-10 h-10 text-elismet-blue" />
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slide-down">
            Multi-Channel Support System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Unify all customer communications across email, phone, social media, and live chat in one intelligent platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <MessageSquare className="w-8 h-8 text-elismet-blue" />,
              title: "Unified Inbox",
              description: "All customer messages from every channel in one place"
            },
            {
              icon: <Phone className="w-8 h-8 text-elismet-blue" />,
              title: "Call Integration",
              description: "Log and track phone conversations automatically"
            },
            {
              icon: <Mail className="w-8 h-8 text-elismet-blue" />,
              title: "Email Management",
              description: "Professional email handling with templates and automation"
            },
            {
              icon: <Share2 className="w-8 h-8 text-elismet-blue" />,
              title: "Social Media",
              description: "Monitor and respond to social media messages"
            },
            {
              icon: <Clock className="w-8 h-8 text-elismet-blue" />,
              title: "Response Tracking",
              description: "Monitor response times and set SLA alerts"
            },
            {
              icon: <Users className="w-8 h-8 text-elismet-blue" />,
              title: "Team Collaboration",
              description: "Assign conversations and collaborate on responses"
            }
          ].map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all animate-slide-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="w-12 h-12 bg-elismet-blue/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Transform Your Customer Communication
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Challenges</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Messages scattered across multiple platforms</li>
                <li>• Missed customer inquiries and complaints</li>
                <li>• Inconsistent response times</li>
                <li>• No unified customer interaction history</li>
                <li>• Team confusion about who's handling what</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Solution</h3>
              <ul className="space-y-2 text-elismet-blue">
                <li>• Centralized communication hub</li>
                <li>• Automated message routing and alerts</li>
                <li>• Fast, consistent response times</li>
                <li>• Complete customer interaction timeline</li>
                <li>• Clear team assignments and workflow</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-elismet-blue to-elismet-lightBlue rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Unify Your Customer Communications?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Stop losing customers due to missed messages. Get a custom multi-channel support system built for your business.
          </p>
          <ContactButton 
            source="multi-channel-support"
            className="bg-white text-elismet-blue hover:bg-gray-50 text-lg px-8 py-4"
          >
            Get Your Multi-Channel System
          </ContactButton>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MultiChannelSupport;
