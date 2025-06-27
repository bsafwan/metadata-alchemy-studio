
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Mail, Phone, Facebook, Instagram, Twitter, MessageCircle, Zap, Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const MultiChannelSupport = () => {
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

  const channels = [
    { icon: <Phone className="w-4 h-4 sm:w-6 sm:h-6" />, name: "Phone Calls", color: "bg-green-500", count: "127" },
    { icon: <Mail className="w-4 h-4 sm:w-6 sm:h-6" />, name: "Emails", color: "bg-blue-500", count: "89" },
    { icon: <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6" />, name: "WhatsApp", color: "bg-green-600", count: "234" },
    { icon: <Facebook className="w-4 h-4 sm:w-6 sm:h-6" />, name: "Facebook", color: "bg-blue-600", count: "156" },
    { icon: <Instagram className="w-4 h-4 sm:w-6 sm:h-6" />, name: "Instagram", color: "bg-pink-500", count: "92" },
    { icon: <Twitter className="w-4 h-4 sm:w-6 sm:h-6" />, name: "Twitter", color: "bg-sky-500", count: "67" }
  ];

  const problems = [
    { 
      problem: "Missing customer messages across 6+ platforms",
      solution: "100% message capture guarantee",
      icon: <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
    },
    { 
      problem: "Response delays causing lost sales",
      solution: "Instant automated responses",
      icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
    },
    { 
      problem: "Team overwhelmed by message volume",
      solution: "Smart routing & prioritization",
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-elismet-blue">
            Elismet
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-3 py-2 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base">
              Contact Us for Demo
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-16 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-elismet-blue/10 via-elismet-lightBlue/5 to-white"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-elismet-orange/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-8 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 bg-elismet-blue/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 sm:mb-8 scroll-reveal">
              <span className="px-3 py-2 sm:px-4 sm:py-2 bg-elismet-blue/10 text-elismet-blue rounded-full text-xs sm:text-sm font-semibold">
                🚀 Stop Losing Customers
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight scroll-reveal px-2">
              One Dashboard.
              <span className="block text-elismet-blue">Every Message.</span>
            </h1>
            
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-600 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed scroll-reveal px-4">
              Never miss another customer again. All your communication channels unified in one intelligent hub.
            </p>

            {/* Live System Preview with New Image */}
            <div className="mb-12 sm:mb-16 scroll-reveal">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 max-w-4xl mx-auto border border-gray-100">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Live Dashboard Preview</h3>
                  <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-4 sm:mb-6">
                    <img 
                      src="/lovable-uploads/d8c67d8e-ae8d-4543-9375-f8ea78f91278.png" 
                      alt="Multi-Channel Communication Hub Dashboard" 
                      className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                  {channels.map((channel, index) => (
                    <div key={channel.name} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all cursor-pointer" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className={`${channel.color} text-white p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0`}>
                        {channel.icon}
                      </div>
                      <div className="text-left min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{channel.name}</div>
                        <div className="text-lg sm:text-2xl font-bold text-elismet-blue">{channel.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-8 py-4 sm:px-16 sm:py-8 text-lg sm:text-2xl rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 w-full sm:w-auto">
                  Contact Us for Demo
                  <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-8 sm:h-8" />
                </Button>
              </Link>
              <div className="text-gray-500 mt-4 sm:mt-6 text-sm sm:text-lg">
                <span>✓ Free consultation</span>
                <span className="mx-2 sm:mx-3">•</span>
                <span>✓ Custom solution design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 scroll-reveal px-2">
                Stop the Chaos
              </h2>
              <p className="text-lg sm:text-2xl text-gray-600 scroll-reveal px-4">
                Your customers are everywhere. Now you can be too.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              {problems.map((item, index) => (
                <div key={index} className="text-center scroll-reveal" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="mb-6 sm:mb-8 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="bg-red-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-2">Problem</h3>
                    <p className="text-red-600 text-sm sm:text-base">{item.problem}</p>
                  </div>
                  <div className="bg-green-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl">
                    <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2">Solution</h3>
                    <p className="text-green-600 font-semibold text-sm sm:text-base">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-12 sm:mb-16 scroll-reveal px-2">
              The Results Speak
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-16 sm:mb-20">
              <div className="scroll-reveal">
                <div className="text-4xl sm:text-6xl font-bold text-elismet-blue mb-3 sm:mb-4">95%</div>
                <div className="text-lg sm:text-xl text-gray-600">Faster Response Time</div>
              </div>
              <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl sm:text-6xl font-bold text-elismet-orange mb-3 sm:mb-4">3x</div>
                <div className="text-lg sm:text-xl text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl sm:text-6xl font-bold text-elismet-lightBlue mb-3 sm:mb-4">$50K</div>
                <div className="text-lg sm:text-xl text-gray-600">Monthly Revenue Saved</div>
              </div>
            </div>

            {/* Live Demo Preview */}
            <div className="bg-gradient-to-br from-elismet-blue to-elismet-lightBlue rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white scroll-reveal">
              <h3 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">See It In Action</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-semibold text-sm sm:text-base">Sarah Johnson • WhatsApp</div>
                    <div className="text-white/70 text-xs sm:text-sm">2 minutes ago</div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-left mb-3 sm:mb-4">
                  <p className="text-sm sm:text-base">"Hi! I need a quote for office cleaning services. We have a 2000 sq ft office space."</p>
                </div>
                <div className="bg-elismet-blue/50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-right">
                  <p className="text-sm sm:text-base">"Hello Sarah! I'd be happy to help you with a quote. Can you tell me how often you'd like the cleaning service?"</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Auto-response sent in 0.3 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 scroll-reveal px-2">
              Ready to Transform Your Customer Communication?
            </h2>
            <p className="text-lg sm:text-2xl text-gray-300 mb-8 sm:mb-12 scroll-reveal px-4">
              Join 10,000+ businesses who never miss a customer message
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-8 py-4 sm:px-16 sm:py-8 text-lg sm:text-2xl rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 w-full sm:w-auto">
                  Contact Us for Demo
                  <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-8 sm:h-8" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-gray-400 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Custom solution design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span>Setup support included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MultiChannelSupport;
