
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, MessageSquare, Users, Star, Calendar, MessageCircle, CreditCard, BarChart3, Phone, Mail, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomSolution = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = ()=> {
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

  const solutions = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Multi-Channel Support",
      problem: "Customers message you on WhatsApp, Facebook, email - you miss messages and lose sales",
      solution: "One dashboard shows all messages. Never miss a customer again",
      result: "Reply 73% faster. No missed sales",
      price: "$800 - $2,500",
      link: "/multi-channel-support"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "AI Customer Helper", 
      problem: "New customers get confused and leave without buying",
      solution: "AI guides customers step-by-step to complete purchases",
      result: "89% more customers complete first purchase",
      price: "$1,200 - $3,500",
      link: "/ai-customer-onboarding"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Review Collector",
      problem: "Happy customers don't leave reviews. You look bad online",
      solution: "Auto-asks happy customers for reviews at perfect timing",
      result: "5x more positive reviews online",
      price: "$600 - $1,800",
      link: "/review-boost"
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Smart Booking",
      problem: "You double-book customers. People show up when you're not there",
      solution: "Smart calendar prevents double bookings completely",
      result: "Zero scheduling mistakes. 95% show-up rate",
      price: "$900 - $2,800",
      link: "/smart-scheduling"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
      title: "Follow-up System",
      problem: "Potential customers contact you once then disappear forever",
      solution: "Auto-follows up with leads at the right times",
      result: "60% more customers actually buy",
      price: "$700 - $2,200",
      link: "/automated-follow-ups"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: "Payment System",
      problem: "Customers pay late. You chase money instead of working",
      solution: "Auto-invoices and payment reminders. One-click payments",
      result: "Get paid 40% faster",
      price: "$1,000 - $3,200",
      link: "/payment-solutions"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Cost Tracker",
      problem: "You don't know which jobs make money. Hidden costs eat profits",
      solution: "Tracks every expense. Shows which jobs are profitable",
      result: "Find $5,000+ in hidden costs yearly",
      price: "$800 - $2,800",
      link: "/cost-tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTopButton />

      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-8 scroll-reveal">
              Custom CRM Systems
            </h1>
            
            <p className="text-2xl text-gray-600 mb-12 scroll-reveal">
              We build simple software that fixes your customer problems.
              <span className="block mt-2">No complex features. Just what works.</span>
            </p>
            
            <div className="bg-white rounded-2xl p-12 shadow-lg mb-16 scroll-reveal">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">How Our CRM Works</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Collect Messages</h3>
                  <p className="text-gray-600">WhatsApp, email, phone calls - all in one place</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Track Customers</h3>
                  <p className="text-gray-600">See who bought, who's interested, who needs follow-up</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Grow Sales</h3>
                  <p className="text-gray-600">Never miss opportunities. Convert more leads to sales</p>
                </div>
              </div>

              {/* Live Example */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Live Example: Customer Journey</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Sarah Johnson - WhatsApp</div>
                      <div className="text-gray-600">"Hi, I need cleaning services for my office"</div>
                    </div>
                    <div className="text-sm text-gray-500">2 min ago</div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Auto-Response Sent</div>
                      <div className="text-gray-600">"Thanks Sarah! I'll send you a quote in 5 minutes"</div>
                    </div>
                    <div className="text-sm text-gray-500">Instant</div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Follow-up Scheduled</div>
                      <div className="text-gray-600">Call Sarah tomorrow if no response</div>
                    </div>
                    <div className="text-sm text-gray-500">Auto-set</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl rounded-full shadow-lg">
                Get Your Custom CRM
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 scroll-reveal">
                7 Business Problems We Solve
              </h2>
              <p className="text-xl text-gray-600 scroll-reveal">
                Click any solution to see exactly how it works
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Link 
                  key={solution.title} 
                  to={solution.link}
                  className="group scroll-reveal hover:shadow-xl transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 h-full hover:border-blue-200 transition-all">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                        {solution.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{solution.title}</h3>
                    </div>
                    
                    {/* Problem */}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-red-600 mb-2">PROBLEM:</div>
                      <p className="text-gray-700 text-sm leading-relaxed">{solution.problem}</p>
                    </div>
                    
                    {/* Solution */}
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-green-600 mb-2">SOLUTION:</div>
                      <p className="text-gray-700 text-sm leading-relaxed">{solution.solution}</p>
                    </div>
                    
                    {/* Result */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-blue-600 mb-2">RESULT:</div>
                      <p className="text-blue-700 text-sm font-semibold">{solution.result}</p>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-lg font-bold text-gray-900">{solution.price}</div>
                      <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
                        See Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 scroll-reveal">
                Simple Pricing
              </h2>
              <p className="text-xl text-gray-600 scroll-reveal">
                Price depends on what you need. No hidden costs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic CRM</h3>
                <div className="text-5xl font-bold text-blue-600 mb-6">$500 - $2,000</div>
                <ul className="space-y-4 text-gray-700 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Fix one main problem</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Easy to use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ready in 2-4 weeks</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <h3 className="text-2xl font-bold mb-4">Complete CRM</h3>
                <div className="text-5xl font-bold mb-6">$2,000 - $8,000</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Fix multiple problems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Connect all your tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Ready in 1-3 months</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center scroll-reveal">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get Exact Price in 24 Hours</h3>
              
              <Link to="/contact-direct">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl rounded-full">
                  Get Free Quote
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 scroll-reveal">
              Ready to Stop Losing Customers?
            </h2>
            
            <div className="scroll-reveal mb-12">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl rounded-full shadow-lg">
                  Get Your Custom CRM Now
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Exact price in 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Built specifically for you</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomSolution;
