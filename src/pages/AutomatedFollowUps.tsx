
import { ArrowLeft, Mail, Clock, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AutomatedFollowUps = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Automated Follow-ups
            </h1>
            <p className="text-xl text-gray-600">
              Never miss a follow-up opportunity with intelligent automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-blue-600" />
                  Smart Email Sequences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Personalized email sequences that adapt based on customer behavior and engagement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-green-600" />
                  Perfect Timing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI determines the optimal time to send follow-ups for maximum engagement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
                  Increased Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automated follow-ups can increase conversion rates by up to 300%.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-orange-600" />
                  Lead Nurturing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Keep leads warm with valuable content and timely check-ins.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Automated Follow-ups
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AutomatedFollowUps;
