
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AICustomerOnboarding = () => {
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
              Contact Us - Setup Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 scroll-reveal">
              <span className="px-6 py-3 bg-gradient-to-r from-elismet-blue to-purple-600 text-white rounded-full text-sm font-bold uppercase tracking-wide">
                AI Customer Management
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight scroll-reveal">
              Stop Using
              <span className="block text-red-500">Excel Sheets</span>
              <span className="block bg-gradient-to-r from-elismet-blue to-purple-600 bg-clip-text text-transparent">
                Start Using AI
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed scroll-reveal font-semibold">
              Onboard & manage customers with AI automation
            </p>

            {/* Dashboard Preview */}
            <div className="mb-12 scroll-reveal">
              <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-4xl mx-auto border border-gray-200">
                <img 
                  src="/lovable-uploads/4a98bb7b-4550-4bf0-8136-60316572323b.png" 
                  alt="AI Customer Management Dashboard" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-elismet-orange to-red-600 hover:from-elismet-orange/90 hover:to-red-600/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold">
                  Get This Free Now
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
              <div className="text-gray-600 mt-6 text-lg font-semibold">
                <span className="text-green-600">✓ Completely Free Setup</span>
                <span className="mx-4 text-gray-400">•</span>
                <span className="text-green-600">✓ AI Does Everything</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Problem */}
              <div className="text-center scroll-reveal">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">😵</span>
                </div>
                <h3 className="text-3xl font-bold text-red-600 mb-4">Your Current Mess</h3>
                <div className="space-y-3 text-lg text-gray-700">
                  <p>❌ Messy Excel sheets</p>
                  <p>❌ Lost customer data</p>
                  <p>❌ Manual work everywhere</p>
                  <p>❌ Zero automation</p>
                </div>
              </div>

              {/* Solution */}
              <div className="text-center scroll-reveal">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-green-600 mb-4">AI Solution</h3>
                <div className="space-y-3 text-lg text-gray-700">
                  <p>✅ Smart AI dashboard</p>
                  <p>✅ Auto customer onboarding</p>
                  <p>✅ Everything automated</p>
                  <p>✅ 3X more customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 scroll-reveal">
              Proven Results
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="scroll-reveal">
                <div className="text-6xl font-bold bg-gradient-to-r from-elismet-blue to-purple-600 bg-clip-text text-transparent mb-4">3X</div>
                <div className="text-xl text-gray-800 font-bold">More Customers</div>
              </div>
              <div className="scroll-reveal">
                <div className="text-6xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4">90%</div>
                <div className="text-xl text-gray-800 font-bold">Less Work</div>
              </div>
              <div className="scroll-reveal">
                <div className="text-6xl font-bold bg-gradient-to-r from-elismet-orange to-red-500 bg-clip-text text-transparent mb-4">24/7</div>
                <div className="text-xl text-gray-800 font-bold">AI Working</div>
              </div>
            </div>

            {/* What AI Does */}
            <div className="bg-gradient-to-br from-elismet-blue to-purple-600 rounded-3xl p-12 text-white scroll-reveal">
              <h3 className="text-3xl font-bold mb-8">What Our AI Does For You</h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">🎯 Finds Best Customers</h4>
                  <p className="text-white/90">AI identifies high-value prospects automatically</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">⚡ Onboards Them Instantly</h4>
                  <p className="text-white/90">Perfect onboarding process, every time</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">📊 Manages Everything</h4>
                  <p className="text-white/90">Complete customer lifecycle automation</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">🚀 Never Stops Working</h4>
                  <p className="text-white/90">24/7 customer management on autopilot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-elismet-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 scroll-reveal">
              Ready to Stop the Excel Madness?
            </h2>
            <p className="text-xl text-yellow-400 mb-12 scroll-reveal font-semibold">
              Get your AI customer management system setup completely free
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold">
                  Contact Us - Setup Free Now
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-green-400 text-lg font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>AI Setup Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Results Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AICustomerOnboarding;
