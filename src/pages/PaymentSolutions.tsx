
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, DollarSign, Zap, Shield, BarChart3, Bell, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSolutions = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl sm:text-3xl font-black text-gray-900">
            Elismet
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-12 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div className="container mx-auto max-w-7xl text-center relative">
          <div className="scroll-reveal mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-red-50 border border-red-200 rounded-full text-red-700 font-semibold mb-6 sm:mb-8 text-sm sm:text-base">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              87% of businesses lose money on payment chaos
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
              Payment Chaos
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Solved Forever
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto font-light px-2">
              Stop chasing payments. Start collecting automatically.
            </p>
          </div>

          {/* Problem Stats */}
          <div className="scroll-reveal mb-12 sm:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-3xl sm:text-4xl font-black text-red-500 mb-2">73%</div>
                <div className="text-gray-600 text-sm sm:text-base">Waste time chasing payments</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-3xl sm:text-4xl font-black text-orange-500 mb-2">$47K</div>
                <div className="text-gray-600 text-sm sm:text-base">Average lost per year</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-3xl sm:text-4xl font-black text-green-500 mb-2">2.3x</div>
                <div className="text-gray-600 text-sm sm:text-base">Faster with automation</div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Preview */}
          <div className="scroll-reveal mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 max-w-5xl mx-auto">
              <img 
                src="/lovable-uploads/f9a562f8-3759-43c7-b3a7-b6a11c49ae92.png" 
                alt="Complete Payment Management Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="scroll-reveal px-2">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 sm:px-16 sm:py-6 text-lg sm:text-xl rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold w-full sm:w-auto">
                End Payment Chaos Now
                <ArrowRight className="ml-2 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-12 sm:py-24 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-12 sm:mb-16 scroll-reveal px-2">
              The $47,000 Problem
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="scroll-reveal text-left">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Payment Platforms Scattered</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Stripe here, PayPal there, bank transfers everywhere. No single view.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Invoices Get Lost</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Manual invoicing, forgotten follow-ups, clients "didn't receive it".</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-xs sm:text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Cash Flow Breaks</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Late payments kill growth. You're funding other people's businesses.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="scroll-reveal">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-red-200">
                  <div className="text-center">
                    <div className="text-4xl sm:text-6xl font-black text-red-500 mb-3 sm:mb-4">87%</div>
                    <div className="text-lg sm:text-xl text-gray-900 font-bold mb-2">Of businesses struggle with payment chaos</div>
                    <div className="text-gray-600 text-sm sm:text-base">Leading to delayed growth and constant stress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-4 sm:mb-6 scroll-reveal px-2">
                One Dashboard. All Payments.
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 scroll-reveal px-2">
                Connect everything. Automate everything. Get paid faster.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center mb-16 sm:mb-20">
              <div className="scroll-reveal">
                <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden border">
                  <img 
                    src="/lovable-uploads/54af61ba-4e97-4c71-8b4e-a4f82e963999.png" 
                    alt="Payment tracking and management interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              
              <div className="scroll-reveal">
                <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Never Chase Payments Again
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">Automatic payment reminders</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">Real-time payment tracking</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">One-click overdue notifications</span>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-xl sm:text-2xl font-bold text-green-700">Result: 89% faster payment collection</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
              <div className="scroll-reveal order-2 md:order-1">
                <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                  Professional Invoices in Seconds
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">Branded invoice templates</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">Automatic tax calculations</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                    <span className="text-base sm:text-lg text-gray-700">Instant email delivery</span>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-xl sm:text-2xl font-bold text-blue-700">Result: 5 minutes to 30 seconds</div>
                </div>
              </div>
              
              <div className="scroll-reveal order-1 md:order-2">
                <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden border">
                  <img 
                    src="/lovable-uploads/dc499f0a-9646-45c4-bdb6-c9b1ff9aa764.png" 
                    alt="Professional invoice generation interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-12 sm:mb-16 scroll-reveal px-2">
              Real Results, Real Fast
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <div className="scroll-reveal bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-4xl sm:text-5xl font-black text-green-500 mb-3 sm:mb-4">89%</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Faster Payments</div>
                <div className="text-gray-600 text-sm sm:text-base">Average time to payment reduced from 31 days to 3.4 days</div>
              </div>
              
              <div className="scroll-reveal bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-4xl sm:text-5xl font-black text-blue-500 mb-3 sm:mb-4">$47K</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Recovered Revenue</div>
                <div className="text-gray-600 text-sm sm:text-base">Average annual recovery from automated follow-ups</div>
              </div>
              
              <div className="scroll-reveal bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="text-4xl sm:text-5xl font-black text-purple-500 mb-3 sm:mb-4">98%</div>
                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Collection Rate</div>
                <div className="text-gray-600 text-sm sm:text-base">Client payment success rate with automated reminders</div>
              </div>
            </div>

            <div className="scroll-reveal bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-gray-200 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">Average business saves</div>
                <div className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                  $47,000
                </div>
                <div className="text-lg sm:text-xl text-gray-700">per year in recovered revenue and time savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 sm:mb-12 scroll-reveal px-2">
              Connects With Everything You Use
            </h3>
            
            <div className="flex justify-center items-center gap-8 sm:gap-16 flex-wrap opacity-60">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">Stripe</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-800">PayPal</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600">QuickBooks</div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">Xero</div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">Mailchimp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 sm:mb-8 scroll-reveal px-2">
              Stop Losing $47K Every Year
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12 scroll-reveal px-2">
              Join 5,000+ businesses that eliminated payment chaos forever
            </p>
            
            <div className="scroll-reveal mb-6 sm:mb-8 px-2">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 sm:px-16 sm:py-6 text-lg sm:text-xl rounded-full shadow-xl hover:shadow-2xl transition-all font-bold transform hover:scale-105 w-full sm:w-auto">
                  Get Started - Free Setup
                  <ArrowRight className="ml-2 sm:ml-4 w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-blue-100 text-base sm:text-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Setup in 24 Hours</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Guaranteed Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentSolutions;
