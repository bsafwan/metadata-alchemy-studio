
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GetStarted = () => {
  const options = [
    {
      title: "Create Account",
      description: "Join our platform and become a regular customer with full access to our services",
      icon: UserPlus,
      path: "/onboard",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      title: "Contact Us",
      description: "Send us a direct message through our professional contact system",
      icon: Mail,
      path: "/contact-direct",
      color: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      title: "Live Chat",
      description: "Get instant answers and information through our AI-powered chat system",
      icon: MessageCircle,
      path: "/live-chat",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started with Elismet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to begin your journey with us. We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <Card key={index} className={`transition-all duration-300 hover:shadow-lg ${option.color}`}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <option.icon className="w-8 h-8 text-gray-700" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {option.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                  {option.description}
                </CardDescription>
                <Link to={option.path}>
                  <Button className="w-full group">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Not sure which option is right for you?
          </p>
          <Link to="/live-chat">
            <Button variant="outline" className="hover:bg-gray-100">
              Talk to our AI assistant for guidance
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;
