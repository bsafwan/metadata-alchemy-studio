
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, DollarSign, Zap, Shield, BarChart3, Bell } from 'lucide-react';
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
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            PaymentFlow
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="scroll-reveal mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              Complete Payment Management System
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Unified Payment
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Stripe, PayPal, invoicing, and automated payment management in one powerful dashboard
            </p>
          </div>

          {/* Main Dashboard Preview */}
          <div className="scroll-reveal mb-16">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border">
              <img 
                src="/lovable-uploads/f9a562f8-3759-43c7-b3a7-b6a11c49ae92.png" 
                alt="Payment Dashboard Overview"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="scroll-reveal">
            <Link to="/contact-direct">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all">
                Start Free Trial
                <ArrowRight className="ml-4 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16 scroll-reveal">
              Everything You Need
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="scroll-reveal text-center p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Platform Integration</h3>
                <p className="text-gray-600">Stripe, PayPal, and 20+ payment gateways unified</p>
              </div>
              
              <div className="scroll-reveal text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Invoicing</h3>
                <p className="text-gray-600">Automated invoice generation and payment tracking</p>
              </div>
              
              <div className="scroll-reveal text-center p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Reminders</h3>
                <p className="text-gray-600">Automated email reminders for overdue payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invoice Management Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="scroll-reveal">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Invoice Management
                  <br />
                  <span className="text-blue-600">Made Simple</span>
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Track payments, manage dues, and send automated reminders. 
                  Never lose track of outstanding invoices again.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Real-time payment status tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Automated overdue notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">One-click reminder sending</span>
                  </div>
                </div>
              </div>
              <div className="scroll-reveal">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/54af61ba-4e97-4c71-8b4e-a4f82e963999.png" 
                    alt="Invoice Management Interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Invoicing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="scroll-reveal order-2 md:order-1">
                <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src="/lovable-uploads/dc499f0a-9646-45c4-bdb6-c9b1ff9aa764.png" 
                    alt="Professional Invoice Template"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="scroll-reveal order-1 md:order-2">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Professional
                  <br />
                  <span className="text-purple-600">Invoice Generation</span>
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Create branded, professional invoices automatically. 
                  Customize templates and send directly from the platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Custom branded templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Automatic tax calculations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">PDF export and email delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 scroll-reveal">
              Trusted by Growing Businesses
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="scroll-reveal">
                <div className="text-5xl font-black text-white mb-2">99.9%</div>
                <div className="text-blue-100">Uptime Guarantee</div>
              </div>
              <div className="scroll-reveal">
                <div className="text-5xl font-black text-white mb-2">$2M+</div>
                <div className="text-blue-100">Processed Monthly</div>
              </div>
              <div className="scroll-reveal">
                <div className="text-5xl font-black text-white mb-2">5,000+</div>
                <div className="text-blue-100">Active Businesses</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 scroll-reveal">
              Seamless Integrations
            </h2>
            
            <div className="flex justify-center items-center gap-12 flex-wrap opacity-60">
              <div className="text-4xl font-bold text-blue-600">Stripe</div>
              <div className="text-4xl font-bold text-blue-800">PayPal</div>
              <div className="text-4xl font-bold text-green-600">QuickBooks</div>
              <div className="text-4xl font-bold text-purple-600">Xero</div>
              <div className="text-4xl font-bold text-orange-600">Mailchimp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 scroll-reveal">
              Ready to Streamline Your Payments?
            </h2>
            <p className="text-gray-300 mb-12 text-lg scroll-reveal">
              Start your free trial today. No setup fees, no monthly minimums.
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-4 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all font-bold">
                  Start Free Trial
                  <ArrowRight className="ml-4 w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentSolutions;
