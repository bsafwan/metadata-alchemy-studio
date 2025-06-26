
import { ArrowLeft, Star, TrendingUp, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewBoost = () => {
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
              Review Boost
            </h1>
            <p className="text-xl text-gray-600">
              Increase your online reviews and build trust with customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  More Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatically request reviews from satisfied customers at the perfect moment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Higher Ratings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Smart timing and messaging increase the likelihood of positive reviews.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                  Review Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor and respond to reviews across all platforms from one dashboard.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Boosting Reviews
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReviewBoost;
