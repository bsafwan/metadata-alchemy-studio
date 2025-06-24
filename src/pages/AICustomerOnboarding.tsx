
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Zap, CheckCircle, TrendingUp, Bot, Database, Clock } from 'lucide-react';
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

  const problems = [
    { 
      before: "Messy Excel sheets losing customers",
      after: "AI-powered unified dashboard",
      icon: <Database className="w-12 h-12 text-red-500" />
    },
    { 
      before: "Manual onboarding taking weeks",
      after: "Automated process in minutes",
      icon: <Clock className="w-12 h-12 text-orange-500" />
    },
    { 
      before: "Zero visibility into customer journey",
      after: "Complete automation & insights",
      icon: <Bot className="w-12 h-12 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-elismet-blue">
            Elismet
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-8 py-3 rounded-xl font-semibold">
              Contact Us to Setup Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-elismet-blue/5 via-purple-50 to-elismet-lightBlue/5"></div>
        
        {/* Floating AI elements */}
        <div className="absolute top-32 left-10 w-24 h-24 bg-elismet-blue/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-48 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 scroll-reveal">
              <span className="px-6 py-3 bg-gradient-to-r from-elismet-blue to-purple-600 text-white rounded-full text-sm font-bold uppercase tracking-wide">
                🤖 STOP LOSING CUSTOMERS
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight scroll-reveal">
              From Excel Sheets to
              <span className="block bg-gradient-to-r from-elismet-blue via-purple-600 to-elismet-lightBlue bg-clip-text text-transparent">
                AI-Powered Growth
              </span>
            </h1>
            
            <p className="text-3xl md:text-4xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed scroll-reveal font-bold">
              Get 3X more customers with AI automation
            </p>

            {/* Live Dashboard Preview */}
            <div className="mb-12 scroll-reveal">
              <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-5xl mx-auto border border-gray-200">
                <div className="bg-gradient-to-r from-elismet-blue to-purple-600 rounded-t-2xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Your New AI Dashboard</h3>
                  <p className="text-white/90 font-semibold">Real customers, Real results, Real time</p>
                </div>
                
                {/* Dashboard Stats Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-elismet-blue">626</div>
                    <div className="text-sm text-gray-600 font-semibold">Active Customers</div>
                    <div className="text-xs text-green-600 font-bold">+300% Growth</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-green-600">519</div>
                    <div className="text-sm text-gray-600 font-semibold">Auto-Converted</div>
                    <div className="text-xs text-green-600 font-bold">AI Success Rate</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-600">$2.4M</div>
                    <div className="text-sm text-gray-600 font-semibold">Revenue Generated</div>
                    <div className="text-xs text-blue-600 font-bold">This Quarter</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600 font-semibold">AI Working</div>
                    <div className="text-xs text-purple-600 font-bold">Never Sleeps</div>
                  </div>
                </div>

                {/* Customer Database Preview */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <img 
                    src="/lovable-uploads/4a98bb7b-4550-4bf0-8136-60316572323b.png" 
                    alt="AI Customer Management System" 
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-elismet-orange to-red-600 hover:from-elismet-orange/90 hover:to-red-600/90 text-white px-20 py-10 text-3xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold border-4 border-white">
                  GET THIS FOR FREE NOW
                  <ArrowRight className="ml-6 w-10 h-10" />
                </Button>
              </Link>
              <div className="text-gray-800 mt-8 text-xl font-bold">
                <span className="text-green-600">✓ COMPLETELY FREE SETUP</span>
                <span className="mx-6 text-gray-400">•</span>
                <span className="text-green-600">✓ AI DOES EVERYTHING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 scroll-reveal">
                STOP This Nightmare
              </h2>
              <p className="text-2xl text-red-400 scroll-reveal font-bold">
                Your current system is KILLING your business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((item, index) => (
                <div key={index} className="text-center scroll-reveal" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="mb-8 flex justify-center">
                    {item.icon}
                  </div>
                  
                  <div className="bg-red-900/50 border border-red-500 p-8 rounded-2xl mb-6">
                    <div className="text-2xl font-bold text-red-300 mb-4">❌ Your Problem</div>
                    <p className="text-red-200 text-lg font-semibold">{item.before}</p>
                  </div>
                  
                  <div className="bg-green-900/50 border border-green-500 p-8 rounded-2xl">
                    <div className="text-2xl font-bold text-green-300 mb-4">✅ AI Solution</div>
                    <p className="text-green-200 font-bold text-lg">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-16 scroll-reveal">
              PROVEN RESULTS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="scroll-reveal">
                <div className="text-8xl font-bold bg-gradient-to-r from-elismet-blue to-purple-600 bg-clip-text text-transparent mb-4">3X</div>
                <div className="text-2xl text-gray-800 font-bold">MORE CUSTOMERS</div>
                <div className="text-lg text-gray-600 font-semibold">Guaranteed Results</div>
              </div>
              <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
                <div className="text-8xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4">90%</div>
                <div className="text-2xl text-gray-800 font-bold">LESS WORK</div>
                <div className="text-lg text-gray-600 font-semibold">AI Does Everything</div>
              </div>
              <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
                <div className="text-8xl font-bold bg-gradient-to-r from-elismet-orange to-red-500 bg-clip-text text-transparent mb-4">24/7</div>
                <div className="text-2xl text-gray-800 font-bold">AI WORKING</div>
                <div className="text-lg text-gray-600 font-semibold">Never Stops</div>
              </div>
            </div>

            {/* AI Power Showcase */}
            <div className="bg-gradient-to-br from-elismet-blue via-purple-600 to-elismet-lightBlue rounded-3xl p-12 text-white scroll-reveal">
              <div className="flex items-center justify-center mb-8">
                <Bot className="w-20 h-20 text-white mr-6" />
                <h3 className="text-5xl font-bold">AI RUNS YOUR BUSINESS</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="text-2xl font-bold mb-4">🎯 FINDS BEST CUSTOMERS</h4>
                  <p className="text-white/90 text-lg font-semibold">AI identifies high-value prospects instantly</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="text-2xl font-bold mb-4">⚡ CONVERTS AUTOMATICALLY</h4>
                  <p className="text-white/90 text-lg font-semibold">Perfect timing, every time</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="text-2xl font-bold mb-4">📈 PREDICTS REVENUE</h4>
                  <p className="text-white/90 text-lg font-semibold">See your future income today</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                  <h4 className="text-2xl font-bold mb-4">🚀 ZERO MANUAL WORK</h4>
                  <p className="text-white/90 text-lg font-semibold">Completely hands-free operation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-elismet-blue to-purple-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 scroll-reveal">
              GET THIS NOW
            </h2>
            <p className="text-3xl text-yellow-400 mb-12 scroll-reveal font-bold">
              FREE SETUP • GUARANTEED RESULTS • AI DOES EVERYTHING
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-20 py-10 text-3xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold border-4 border-white">
                  CONTACT US - SETUP FREE NOW
                  <ArrowRight className="ml-6 w-10 h-10" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-green-400 text-xl font-bold">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <span>100% FREE</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <span>RESULTS GUARANTEED</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8" />
                <span>AI SETUP INCLUDED</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AICustomerOnboarding;
