import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewBoost = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.8;
        
        if (isInView) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-elismet-blue">
            Elismet
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-8 py-3 rounded-xl font-semibold">
              Get More Reviews Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 scroll-reveal">
              <span className="px-6 py-3 bg-red-500 text-white rounded-full text-sm font-bold uppercase tracking-wide">
                91% Choose High-Reviewed Businesses
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight scroll-reveal">
              Get More
              <span className="block text-elismet-blue">Google Reviews</span>
              <span className="block text-elismet-orange">Attract New Customers</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed scroll-reveal font-semibold">
              Turn every customer into a 5-star Google review automatically
            </p>

            {/* Problem Statement */}
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-12 mb-16 scroll-reveal">
              <h3 className="text-3xl font-bold text-red-700 mb-6">The Problem Is Real</h3>
              <div className="grid md:grid-cols-2 gap-8 text-xl text-red-600 mb-8">
                <div>❌ No reviews = 4.7x fewer customers</div>
                <div>❌ Competitors get chosen instead</div>
              </div>
              
              {/* Real Example */}
              <div className="bg-white rounded-2xl p-8 border-2 border-red-300">
                <h4 className="text-2xl font-bold text-red-800 mb-4">Real Example: New York City</h4>
                <p className="text-lg text-red-700 leading-relaxed">
                  Within <span className="font-bold">4,734 cleaning businesses</span> in New York City, 
                  only <span className="font-bold">27 cleaning services</span> (particularly owning more than 300+ Google reviews) 
                  alone manage and deal with <span className="font-bold text-2xl">57% of customers</span>
                </p>
                <div className="mt-4 text-red-600 font-semibold">
                  That's less than 1% of businesses capturing over half the market!
                </div>
              </div>
            </div>

            {/* Solution Preview */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 scroll-reveal">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Live Review Dashboard</h3>
              <img 
                src="/lovable-uploads/670f5355-e4e9-4986-8c1a-f8ed7e5e4f3a.png" 
                alt="Review Management Dashboard showing customer tracking and success rates" 
                className="w-full h-auto rounded-2xl shadow-lg mb-6"
              />
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">6</div>
                  <div className="text-sm text-gray-600">Total Customers</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600">2</div>
                  <div className="text-sm text-gray-600">Need Contact</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-600">Awaiting Response</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">17%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-elismet-orange to-red-600 hover:from-elismet-orange/90 hover:to-red-600/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold">
                  Get More Reviews Now
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
              <div className="text-gray-600 mt-6 text-lg font-semibold">
                <span className="text-green-600">✓ 70% Review Guarantee</span>
                <span className="mx-4 text-gray-400">•</span>
                <span className="text-green-600">✓ All Channels Automated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-16 scroll-reveal">
              Simple. Automatic. Effective.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="scroll-reveal">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Import Customers</h3>
                <p className="text-gray-600 text-lg">From Google Sheets or any system</p>
              </div>
              
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. AI Asks Reviews</h3>
                <p className="text-gray-600 text-lg">Via Email, WhatsApp, SMS, Calls</p>
              </div>
              
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Get Reviews</h3>
                <p className="text-gray-600 text-lg">1.15 reviews per customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Templates Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-16 scroll-reveal">
              AI Sends Perfect Messages
            </h2>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 scroll-reveal">
              <img 
                src="/lovable-uploads/d83fd4d3-479b-4613-aa46-4a271ce73049.png" 
                alt="Review Request Templates showing automated messages" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-elismet-blue to-purple-600 rounded-3xl p-12 text-white text-center scroll-reveal">
              <h3 className="text-3xl font-bold mb-6">Review Link Generation</h3>
              <div className="bg-white rounded-2xl p-6 mb-6">
                <img 
                  src="/lovable-uploads/1175ece9-b7b1-488c-b08d-cd3c94cac51f.png" 
                  alt="Business selection and review link generation interface" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <p className="text-xl">One-click review links for any business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-16 scroll-reveal">
              The Results
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="scroll-reveal">
                <div className="text-6xl font-bold text-green-600 mb-4">70%</div>
                <div className="text-xl text-gray-800 font-bold">Review Guarantee</div>
              </div>
              <div className="scroll-reveal">
                <div className="text-6xl font-bold text-orange-600 mb-4">4.7X</div>
                <div className="text-xl text-gray-800 font-bold">More Customers</div>
              </div>
            </div>

            {/* Customer Experience Visual */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 scroll-reveal">
              <img 
                src="/lovable-uploads/63287882-c163-4cc2-8e38-71171ee99495.png" 
                alt="Customer experience illustration showing review sharing process" 
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-elismet-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8 scroll-reveal">
              Ready to Dominate Your Market?
            </h2>
            <p className="text-2xl text-yellow-400 mb-12 scroll-reveal font-semibold">
              91% of customers choose the highest-reviewed business
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold">
                  Get More Reviews Now
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-green-400 text-lg font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>70% Review Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>All Channels Automated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Setup Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for scroll animations */}
      <style>
        {`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        `}
      </style>
    </div>
  );
};

export default ReviewBoost;
