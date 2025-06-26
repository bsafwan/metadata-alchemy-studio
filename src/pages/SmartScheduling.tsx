
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Users, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartScheduling = () => {
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
              Get Smart Scheduling
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 scroll-reveal">
              <span className="px-6 py-3 bg-red-500 text-white rounded-full text-sm font-bold uppercase tracking-wide">
                Stop Manual Scheduling Chaos
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight scroll-reveal">
              Smart Scheduling
              <span className="block text-elismet-blue">&</span>
              <span className="block text-elismet-orange">Staff Management</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed scroll-reveal font-semibold">
              Automated reminders, conflict detection, and powerful scheduling dashboard
            </p>

            {/* Problem Statement */}
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-12 mb-16 scroll-reveal">
              <h3 className="text-3xl font-bold text-red-700 mb-6">Everyone Uses Scheduling Tools</h3>
              <p className="text-xl text-red-600 mb-8">But they're still manual, chaotic, and cause burnout</p>
              <div className="grid md:grid-cols-3 gap-6 text-lg text-red-600">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  Overbooking chaos
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6" />
                  Daily scheduling effort
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  Staff burnout & conflicts
                </div>
              </div>
            </div>

            {/* Solution Preview */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 scroll-reveal">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Automated Scheduling Dashboard</h3>
              <img 
                src="/lovable-uploads/3258e4d9-4cee-4315-80d5-9a060132facc.png" 
                alt="Smart Scheduling Dashboard showing automated staff management" 
                className="w-full h-auto rounded-2xl shadow-lg mb-6"
              />
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Total Today</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">1</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600">1</div>
                  <div className="text-sm text-gray-600">Upcoming</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <div className="text-3xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Conflicts</div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-elismet-orange to-purple-600 hover:from-elismet-orange/90 hover:to-purple-600/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold">
                  Get Smart Scheduling
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Scheduling View */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 text-center mb-16 scroll-reveal">
              Real-Time Schedule Management
            </h2>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 scroll-reveal mb-12">
              <img 
                src="/lovable-uploads/00c32e93-4cf4-44af-be7b-472b9242110d.png" 
                alt="Live scheduling view with appointments and staff assignments" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Conflict Detection */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-12 text-white text-center scroll-reveal">
              <img 
                src="/lovable-uploads/c446f04f-125e-46dc-ba2d-44c7b134bc6a.png" 
                alt="Scheduling conflict detection and auto-resolution" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg mb-8"
              />
              <h3 className="text-3xl font-bold mb-4">Instant Conflict Detection</h3>
              <p className="text-xl">Auto-resolve or manual review - your choice</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-16 scroll-reveal">
              Automated. Powerful. Simple.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="scroll-reveal">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Scheduling</h3>
                <p className="text-gray-600 text-lg">AI assigns staff automatically</p>
              </div>
              
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-100">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Automated Reminders</h3>
                <p className="text-gray-600 text-lg">SMS, email, push notifications</p>
              </div>
              
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Conflict Prevention</h3>
                <p className="text-gray-600 text-lg">Zero overlaps, zero stress</p>
              </div>
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
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="scroll-reveal">
                <div className="text-6xl font-bold text-green-600 mb-4">95%</div>
                <div className="text-xl text-gray-800 font-bold">Less Scheduling Time</div>
              </div>
              <div className="scroll-reveal">
                <div className="text-6xl font-bold text-purple-600 mb-4">Zero</div>
                <div className="text-xl text-gray-800 font-bold">Double Bookings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-elismet-blue text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-8 scroll-reveal">
              Ready for Automated Scheduling?
            </h2>
            <p className="text-2xl text-yellow-400 mb-12 scroll-reveal font-semibold">
              Stop manual chaos. Start smart automation.
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-elismet-orange hover:bg-elismet-orange/90 text-white px-16 py-8 text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold">
                  Get Smart Scheduling
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-green-400 text-lg font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Automated Reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Conflict Detection</span>
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

export default SmartScheduling;
