
import { ArrowLeft, DollarSign, BarChart3, TrendingDown, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CostTracking = () => {
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
              Cost Tracking
            </h1>
            <p className="text-xl text-gray-600">
              Monitor and optimize your business expenses with intelligent tracking
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                  Expense Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track all business expenses in real-time with automatic categorization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                  Detailed Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate comprehensive reports to understand your spending patterns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-6 h-6 mr-2 text-purple-600" />
                  Cost Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Identify opportunities to reduce costs and improve profitability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-orange-600" />
                  Budget Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Set budgets and get alerts when you're approaching spending limits.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Cost Tracking
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CostTracking;
