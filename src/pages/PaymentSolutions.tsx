
import { ArrowLeft, CreditCard, Shield, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentSolutions = () => {
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
              Payment Solutions
            </h1>
            <p className="text-xl text-gray-600">
              Secure, fast, and flexible payment processing for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                  Multiple Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Accept credit cards, bank transfers, digital wallets, and more payment options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-green-600" />
                  Bank-Level Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  PCI DSS compliant with advanced encryption and fraud protection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-yellow-600" />
                  Instant Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fast payment processing with instant notifications and confirmations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
                  Detailed Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track revenue, payment patterns, and customer behavior with detailed reports.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Payment Solutions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSolutions;
