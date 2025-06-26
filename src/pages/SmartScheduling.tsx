
import { ArrowLeft, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SmartScheduling = () => {
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
              Smart Scheduling
            </h1>
            <p className="text-xl text-gray-600">
              Intelligent appointment scheduling that works around your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Automated Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Customers can book appointments 24/7 without any manual intervention from your team.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-green-600" />
                  Smart Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatic reminders via SMS and email reduce no-shows by up to 75%.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-purple-600" />
                  Team Coordination
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sync with your team's calendars and automatically assign the best available person.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                  Easy Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Works with Google Calendar, Outlook, and all major calendar applications.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Smart Scheduling
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SmartScheduling;
