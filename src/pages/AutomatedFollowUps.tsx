
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MessageSquare, Bell, Target, TrendingUp, Users, CheckCircle, Zap, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const AutomatedFollowUps = () => {
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
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-xl z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold gradient-text-professional">
            Elismet
          </Link>
          <Link to="/contact-direct">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 sm:px-8 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base">
              Get Automated Follow-ups
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8 scroll-reveal">
              <span className="px-4 py-2 sm:px-8 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-lg">
                79% of businesses lose recurring revenue
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-black mb-6 sm:mb-8 leading-tight scroll-reveal px-2">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Automated
              </span>
              <br />
              <span className="text-white">Follow-ups</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                & Reminders
              </span>
            </h1>
            
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed scroll-reveal font-light px-4">
              Turn forgotten customers into recurring revenue automatically
            </p>

            {/* Problem Highlight */}
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 mb-12 sm:mb-16 scroll-reveal backdrop-blur-sm mx-2 sm:mx-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
                <div>
                  <div className="text-4xl sm:text-6xl font-black text-red-400 mb-2 sm:mb-4">71%</div>
                  <div className="text-lg sm:text-xl text-gray-300">Return when personally contacted</div>
                </div>
                <div>
                  <div className="text-4xl sm:text-6xl font-black text-orange-400 mb-2 sm:mb-4">79%</div>
                  <div className="text-lg sm:text-xl text-gray-300">Face inconsistent clients</div>
                </div>
                <div>
                  <div className="text-4xl sm:text-6xl font-black text-yellow-400 mb-2 sm:mb-4">$</div>
                  <div className="text-lg sm:text-xl text-gray-300">Recurring = Stable profit</div>
                </div>
              </div>
            </div>

            <div className="scroll-reveal px-2 sm:px-0">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white px-8 py-4 sm:px-20 sm:py-10 text-lg sm:text-3xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold w-full sm:w-auto">
                  Automate Follow-ups Now
                  <ArrowRight className="ml-2 sm:ml-6 w-6 h-6 sm:w-10 sm:h-10" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Channel Examples */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-gray-800 to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-6xl font-black mb-12 sm:mb-16 scroll-reveal px-2">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                How We Reach
              </span>
              <br />
              <span className="text-white">Your Lost Customers</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 mb-12 sm:mb-16">
              <div className="scroll-reveal bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all">
                <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4 sm:mb-6 float-animation" />
                <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Email Follow-up</div>
                <div className="text-gray-300 text-base sm:text-lg mb-3 sm:mb-4">"Hi Sarah, it's been 3 months since your last cleaning. Ready to schedule your next deep clean?"</div>
                <div className="text-blue-400 font-bold text-lg sm:text-xl">43% open rate, 18% conversion</div>
              </div>
              
              <div className="scroll-reveal bg-gradient-to-br from-green-600/20 to-green-800/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-green-500/30 backdrop-blur-sm hover:scale-105 transition-all">
                <Phone className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto mb-4 sm:mb-6 float-animation" />
                <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Personal Call</div>
                <div className="text-gray-300 text-base sm:text-lg mb-3 sm:mb-4">"Mr. Johnson, your HVAC is due for seasonal maintenance. Any issues we should know about?"</div>
                <div className="text-green-400 font-bold text-lg sm:text-xl">71% answer rate, 52% booking</div>
              </div>
              
              <div className="scroll-reveal bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all">
                <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto mb-4 sm:mb-6 float-animation" />
                <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">WhatsApp Reminder</div>
                <div className="text-gray-300 text-base sm:text-lg mb-3 sm:mb-4">"Hi! Time for your monthly lawn care. Same time next week works? 🌱"</div>
                <div className="text-purple-400 font-bold text-lg sm:text-xl">89% read rate, 34% response</div>
              </div>
              
              <div className="scroll-reveal bg-gradient-to-br from-pink-600/20 to-pink-800/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-pink-500/30 backdrop-blur-sm hover:scale-105 transition-all">
                <Target className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 mx-auto mb-4 sm:mb-6 float-animation" />
                <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Social Media DM</div>
                <div className="text-gray-300 text-base sm:text-lg mb-3 sm:mb-4">"Saw your post about spring cleaning! We're offering 20% off this month 😊"</div>
                <div className="text-pink-400 font-bold text-lg sm:text-xl">67% seen rate, 28% engagement</div>
              </div>
            </div>

            <div className="scroll-reveal bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-12 backdrop-blur-sm mx-2 sm:mx-0">
              <div className="text-2xl sm:text-4xl font-black text-orange-400 mb-2 sm:mb-4">The Result?</div>
              <div className="text-lg sm:text-2xl text-gray-300 mb-3 sm:mb-4">Instead of losing 79% of customers forever...</div>
              <div className="text-4xl sm:text-6xl font-black text-white">71% Come Back</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Examples */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-6xl font-black text-center mb-12 sm:mb-16 scroll-reveal px-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Industry
              </span>
              <span className="text-white"> Examples</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="scroll-reveal bg-gradient-to-br from-cyan-600/10 to-blue-600/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-cyan-500/20 backdrop-blur-sm">
                <div className="text-2xl sm:text-4xl font-black text-cyan-400 mb-3 sm:mb-4">Cleaning</div>
                <div className="text-gray-300 mb-3 sm:mb-4">Quarterly reminders</div>
                <div className="text-xl sm:text-2xl font-bold text-white">+300% retention</div>
              </div>
              
              <div className="scroll-reveal bg-gradient-to-br from-purple-600/10 to-pink-600/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/20 backdrop-blur-sm">
                <div className="text-2xl sm:text-4xl font-black text-purple-400 mb-3 sm:mb-4">HVAC</div>
                <div className="text-gray-300 mb-3 sm:mb-4">Seasonal maintenance</div>
                <div className="text-xl sm:text-2xl font-bold text-white">+250% bookings</div>
              </div>
              
              <div className="scroll-reveal bg-gradient-to-br from-orange-600/10 to-red-600/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-orange-500/20 backdrop-blur-sm">
                <div className="text-2xl sm:text-4xl font-black text-orange-400 mb-3 sm:mb-4">Lawn Care</div>
                <div className="text-gray-300 mb-3 sm:mb-4">Monthly follow-ups</div>
                <div className="text-xl sm:text-2xl font-bold text-white">+400% revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-6xl font-black mb-12 sm:mb-16 scroll-reveal px-2">
              <span className="text-white">How It</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              <div className="scroll-reveal">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                  <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Track Timing</h3>
                <p className="text-gray-300 text-base sm:text-lg">Industry standard retention periods</p>
              </div>
              
              <div className="scroll-reveal">
                <div className="bg-gradient-to-br from-cyan-600 to-blue-600 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                  <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Auto Trigger</h3>
                <p className="text-gray-300 text-base sm:text-lg">Multi-channel outreach sequence</p>
              </div>
              
              <div className="scroll-reveal">
                <div className="bg-gradient-to-br from-orange-600 to-red-600 w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                  <TrendingUp className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Convert Back</h3>
                <p className="text-gray-300 text-base sm:text-lg">71% return rate guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-6xl font-black mb-12 sm:mb-16 scroll-reveal px-2">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Guaranteed Results
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <div className="scroll-reveal bg-gradient-to-br from-green-600/20 to-cyan-600/20 p-8 sm:p-12 rounded-2xl sm:rounded-3xl border border-green-500/30 backdrop-blur-sm">
                <div className="text-6xl sm:text-8xl font-black text-green-400 mb-3 sm:mb-4">71%</div>
                <div className="text-xl sm:text-2xl text-white font-bold">Customer Return Rate</div>
              </div>
              <div className="scroll-reveal bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 sm:p-12 rounded-2xl sm:rounded-3xl border border-purple-500/30 backdrop-blur-sm">
                <div className="text-6xl sm:text-8xl font-black text-purple-400 mb-3 sm:mb-4">3X</div>
                <div className="text-xl sm:text-2xl text-white font-bold">Revenue Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-6xl font-black mb-6 sm:mb-8 scroll-reveal px-2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Stop Losing
              </span>
              <br />
              <span className="text-white">Recurring Revenue</span>
            </h2>
            
            <div className="scroll-reveal px-2 sm:px-0">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white px-8 py-4 sm:px-20 sm:py-10 text-lg sm:text-3xl rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 font-bold pulse-professional w-full sm:w-auto">
                  Get Automated Follow-ups
                  <ArrowRight className="ml-2 sm:ml-6 w-6 h-6 sm:w-10 sm:h-10" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-green-400 text-base sm:text-xl font-bold">
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Multi-Channel</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>71% Return Rate</span>
              </div>  
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Setup Included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutomatedFollowUps;
