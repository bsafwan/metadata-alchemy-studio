
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
                🤖 AI Revolution
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight scroll-reveal">
              Stop Losing Customers.
              <span className="block bg-gradient-to-r from-elismet-blue via-purple-600 to-elismet-lightBlue bg-clip-text text-transparent">
                Start Growing.
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed scroll-reveal font-medium">
              AI-powered customer onboarding that converts 3x more leads
            </p>

            {/* Live Dashboard Preview */}
            <div className="mb-12 scroll-reveal">
              <div className="bg-white rounded-3xl shadow-2xl p-4 max-w-5xl mx-auto border border-gray-200">
                <div className="bg-gradient-to-r from-elismet-blue to-purple-600 rounded-t-2xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Live AI Dashboard</h3>
                  <p className="text-white/90">Real customer data, real results</p>
                </div>
                
                {/* Dashboard Stats Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-elismet-blue">626</div>
                    <div className="text-sm text-gray-600">Total Customers</div>
                    <div className="text-xs text-green-600 font-semibold">+12% this month</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-green-600">519</div>
                    <div className="text-sm text-gray-600">Completed</div>
                    <div className="text-xs text-green-600 font-semibold">82.9% success</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-blue-600">71</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                    <div className="text-xs text-blue-600 font-semibold">Active now</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl text-center">
                    <div className="text-3xl font-bold text-orange-600">36</div>
                    <div className="text-sm text-gray-600">Pending</div>
                    <div className="text-xs text-orange-600 font-semibold">Need attention</div>
                  </div>
                </div>

                {/* Customer Database Preview */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <img 
                    src="/lovable-uploads/4a98bb7b-4550-4bf0-8136-60316572323b.png" 
                    alt="AI Customer Database Dashboard" 
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-elismet-blue to-purple-600 hover:from-elismet-blue/90 hover:to-purple-600/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold">
                  Contact Us to Setup Free
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
              <div className="text-gray-600 mt-6 text-lg">
                <span className="font-semibold">✓ Free setup & consultation</span>
                <span className="mx-4">•</span>
                <span className="font-semibold">✓ AI implementation included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before vs After Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 scroll-reveal">
                Before vs After
              </h2>
              <p className="text-2xl text-gray-300 scroll-reveal">
                See the transformation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((item, index) => (
                <div key={index} className="text-center scroll-reveal" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="mb-8 flex justify-center">
                    {item.icon}
                  </div>
                  
                  <div className="bg-red-900/30 border border-red-500/30 p-6 rounded-2xl mb-6">
                    <div className="text-lg font-bold text-red-300 mb-2">❌ Before</div>
                    <p className="text-red-200">{item.before}</p>
                  </div>
                  
                  <div className="bg-green-900/30 border border-green-500/30 p-6 rounded-2xl">
                    <div className="text-lg font-bold text-green-300 mb-2">✅ After</div>
                    <p className="text-green-200 font-semibold">{item.after}</p>
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
              The Numbers Don't Lie
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="scroll-reveal">
                <div className="text-7xl font-bold bg-gradient-to-r from-elismet-blue to-purple-600 bg-clip-text text-transparent mb-4">3x</div>
                <div className="text-xl text-gray-600 font-semibold">More Customer Conversions</div>
              </div>
              <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
                <div className="text-7xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4">90%</div>
                <div className="text-xl text-gray-600 font-semibold">Less Manual Work</div>
              </div>
              <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
                <div className="text-7xl font-bold bg-gradient-to-r from-elismet-orange to-red-500 bg-clip-text text-transparent mb-4">24/7</div>
                <div className="text-xl text-gray-600 font-semibold">AI-Powered Automation</div>
              </div>
            </div>

            {/* AI Power Showcase */}
            <div className="bg-gradient-to-br from-elismet-blue via-purple-600 to-elismet-lightBlue rounded-3xl p-12 text-white scroll-reveal">
              <div className="flex items-center justify-center mb-8">
                <Bot className="w-16 h-16 text-white mr-4" />
                <h3 className="text-4xl font-bold">AI Does Everything</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">✅ Automated Lead Scoring</h4>
                  <p className="text-white/90">AI identifies your best prospects instantly</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">✅ Smart Follow-ups</h4>
                  <p className="text-white/90">Never lose a customer to poor timing</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">✅ Predictive Analytics</h4>
                  <p className="text-white/90">See future revenue before it happens</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">✅ Zero Manual Data Entry</h4>
                  <p className="text-white/90">AI handles everything automatically</p>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-8 scroll-reveal">
              Ready to 3x Your Customer Growth?
            </h2>
            <p className="text-2xl text-gray-200 mb-12 scroll-reveal">
              Join 1000+ businesses using AI to dominate their market
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 font-bold">
                  Contact Us to Setup Free
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold">Free AI setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold">Personal onboarding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold">Results guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AICustomerOnboarding;
