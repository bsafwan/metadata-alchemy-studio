
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Star, Users, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CustomSolution = () => {
  const solutions = [
    {
      title: "Starter CRM",
      price: "$299/month",
      features: ["Lead Management", "Contact Database", "Basic Reporting", "Email Integration"],
      popular: false
    },
    {
      title: "Professional CRM",
      price: "$599/month",
      features: ["Advanced Analytics", "Automation", "Multi-Channel Support", "Custom Fields", "API Access"],
      popular: true
    },
    {
      title: "Enterprise CRM",
      price: "Custom Pricing",
      features: ["Unlimited Users", "Advanced Security", "Custom Integrations", "Dedicated Support", "White-label Options"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Custom CRM Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect CRM solution for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className={`relative ${solution.popular ? 'border-blue-500 shadow-lg' : ''}`}>
                {solution.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{solution.title}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{solution.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact-direct">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomSolution;
