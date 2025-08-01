
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, TrendingDown, AlertTriangle, CheckCircle, BarChart3, Target, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const CostTracking = () => {
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
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900">
            Elismet
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="scroll-reveal mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 mb-6 sm:mb-8">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">78% of businesses don't know their real costs</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
              Know Where Your
              <span className="block text-blue-600">Money Goes</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Track expenses, monitor margins, and make smarter growth decisions
            </p>
          </div>

          {/* Problem Example */}
          <div className="scroll-reveal mb-12 sm:mb-16">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">Sarah's Cleaning Service Problem</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
                <div className="bg-white rounded-lg p-4 sm:p-6 border-l-4 border-red-500">
                  <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">$47K</div>
                  <div className="text-gray-700 text-sm sm:text-base">Lost profit last year</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-2">Didn't track supply costs</div>
                </div>
                <div className="bg-white rounded-lg p-4 sm:p-6 border-l-4 border-orange-500">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">23%</div>
                  <div className="text-gray-700 text-sm sm:text-base">Margin on $200 jobs</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-2">Should be 45%+</div>
                </div>
                <div className="bg-white rounded-lg p-4 sm:p-6 border-l-4 border-yellow-500">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">0</div>
                  <div className="text-gray-700 text-sm sm:text-base">Cost tracking system</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-2">Pure guesswork</div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-reveal">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                Fix My Costs Now
                <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 sm:mb-6 scroll-reveal px-2">
              The $47,000 Problem
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 scroll-reveal px-4">
              Most businesses are bleeding money and don't even know it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="scroll-reveal bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Hidden Costs Everywhere</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Supply costs, gas, equipment wear - it all adds up</p>
              <div className="text-xl sm:text-2xl font-bold text-red-600">-$1,200/month</div>
            </div>
            
            <div className="scroll-reveal bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Wrong Pricing</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Pricing blindly without knowing real costs</p>
              <div className="text-xl sm:text-2xl font-bold text-orange-600">23% margins</div>
            </div>
            
            <div className="scroll-reveal bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">No Growth Plan</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Can't scale without knowing what's profitable</p>
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">Stuck</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 sm:mb-6 scroll-reveal px-2">
              Track Everything. Know Everything.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 scroll-reveal px-4">
              Simple expense tracking that actually works
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="scroll-reveal order-2 md:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                Sarah's Results After 3 Months
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">Found $47K in hidden costs</div>
                    <div className="text-gray-600 text-sm sm:text-base">Supplies, gas, equipment depreciation</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">Raised prices by 35%</div>
                    <div className="text-gray-600 text-sm sm:text-base">Customers still happy, margins healthy</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">Margins jumped to 52%</div>
                    <div className="text-gray-600 text-sm sm:text-base">From 23% to 52% in 90 days</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="text-xl sm:text-2xl font-bold text-green-700">+$94K extra profit per year</div>
              </div>
            </div>
            
            <div className="scroll-reveal order-1 md:order-2">
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-lg">
                    <span className="text-gray-700 text-sm sm:text-base">Cleaning Supplies</span>
                    <span className="font-bold text-red-600 text-sm sm:text-base">-$340</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-lg">
                    <span className="text-gray-700 text-sm sm:text-base">Gas & Travel</span>
                    <span className="font-bold text-red-600 text-sm sm:text-base">-$280</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white rounded-lg">
                    <span className="text-gray-700 text-sm sm:text-base">Equipment</span>
                    <span className="font-bold text-red-600 text-sm sm:text-base">-$150</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">Net Profit</span>
                    <span className="font-bold text-green-600 text-sm sm:text-base">+$1,230</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-20 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 sm:mb-16 scroll-reveal px-2">
            Real Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="scroll-reveal bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-4xl sm:text-5xl font-black text-green-500 mb-3 sm:mb-4">52%</div>
              <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Average Margin</div>
              <div className="text-gray-600 text-sm sm:text-base">Up from 23% industry average</div>
            </div>
            
            <div className="scroll-reveal bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-4xl sm:text-5xl font-black text-blue-500 mb-3 sm:mb-4">$94K</div>
              <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Extra Profit</div>
              <div className="text-gray-600 text-sm sm:text-base">Per year from better pricing</div>
            </div>
            
            <div className="scroll-reveal bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="text-4xl sm:text-5xl font-black text-purple-500 mb-3 sm:mb-4">90</div>
              <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Days to Results</div>
              <div className="text-gray-600 text-sm sm:text-base">See real improvements fast</div>
            </div>
          </div>

          <div className="scroll-reveal bg-white rounded-2xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">Average business recovers</div>
              <div className="text-4xl sm:text-6xl font-black text-green-600 mb-3 sm:mb-4">$94,000</div>
              <div className="text-lg sm:text-xl text-gray-700">in the first year alone</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 sm:mb-6 scroll-reveal px-2">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 scroll-reveal px-4">
              Three simple steps to know your real costs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="scroll-reveal text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Track Everything</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">Record every expense - supplies, gas, equipment, labor</p>
            </div>
            
            <div className="scroll-reveal text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">See Real Margins</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">Know exactly what each job actually costs you</p>
            </div>
            
            <div className="scroll-reveal text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Price Smarter</h3>
              <p className="text-gray-600 text-sm sm:text-base px-2">Set prices that guarantee healthy profits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 sm:mb-8 scroll-reveal px-2">
              Stop Losing $94K Every Year
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 scroll-reveal px-4">
              Start tracking your real costs today
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl rounded-full shadow-lg hover:shadow-xl transition-all font-bold mb-6 sm:mb-8">
                  Get Started Now
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Results in 90 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">No Monthly Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostTracking;
