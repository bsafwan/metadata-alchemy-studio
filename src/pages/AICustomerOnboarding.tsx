
import { ArrowLeft, Bot, Users, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AICustomerOnboarding = () => {
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
              AI Customer Onboarding
            </h1>
            <p className="text-xl text-gray-600">
              Streamline your customer onboarding with intelligent automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-6 h-6 mr-2 text-blue-600" />
                  Smart Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI automatically guides new customers through your onboarding process, reducing manual work by 80%.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-6 h-6 mr-2 text-green-600" />
                  Personalized Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Each customer gets a tailored onboarding journey based on their specific needs and preferences.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Learn More About AI Onboarding
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AICustomerOnboarding;
