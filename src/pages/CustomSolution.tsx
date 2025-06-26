
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, MessageSquare, Users, Star, Calendar, MessageCircle, CreditCard, BarChart3, DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomSolution = () => {
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

  const solutions = [
    {
      icon: <MessageSquare className="w-12 h-12 text-blue-600" />,
      title: "Multi-Channel Support",
      problem: "You get messages from WhatsApp, Facebook, Instagram, email, and phone calls. You can't keep track of everything. Customers get angry when you miss their messages. Important messages get lost. You waste time switching between different apps to reply to customers.",
      solution: "One dashboard shows all your customer messages in one place. WhatsApp, Facebook, Instagram, email - everything together. You can reply to all messages from one screen. No more switching apps. No more missed messages.",
      result: "Reply to customers 73% faster. Never miss important messages. Customers are happy because you respond quickly. You save 3 hours every day. More happy customers means more sales.",
      link: "/multi-channel-support",
      price: "$800 - $2,500"
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: "AI Customer Helper", 
      problem: "New customers don't know how to use your service. They get confused and leave without buying anything. You lose money because people don't understand what to do. You spend too much time explaining the same things over and over to new customers.",
      solution: "Smart AI system guides new customers step by step. It shows them exactly what to do, like having a helpful person next to them. The AI answers their questions instantly. It makes everything simple and easy to understand.",
      result: "89% of new customers complete their first purchase. You don't waste time explaining basic things. More customers understand your service. More customers buy from you. You make more money with less work.",
      link: "/ai-customer-onboarding",
      price: "$1,200 - $3,500"
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-600" />,
      title: "Review Collector",
      problem: "Happy customers don't leave reviews even when they love your service. Your business looks bad online because you have few reviews. New customers don't trust you. Competitors with more reviews get the customers instead of you.",
      solution: "Automatic system asks happy customers for reviews at the perfect time. It makes leaving a review super easy - just one click. It only asks customers who are already happy. It sends the request when they're most likely to say yes.",
      result: "You get 5 times more good reviews. Your business looks trustworthy online. New customers choose you over competitors. Your Google ranking improves. More people find your business online.",
      link: "/review-boost",
      price: "$600 - $1,800"
    },
    {
      icon: <Calendar className="w-12 h-12 text-purple-600" />,
      title: "Smart Booking System",
      problem: "You accidentally book two customers at the same time. Customers show up when you're not available. You lose money from missed appointments. Customers get angry and leave bad reviews. You waste time fixing scheduling mistakes.",
      solution: "Smart calendar prevents double bookings completely. It only shows times when you're actually available. It sends automatic reminders to customers. It handles cancellations and rescheduling automatically.",
      result: "Zero double bookings ever again. 95% of customers show up on time. No more scheduling mistakes. No more angry customers. You save 2 hours every week. More appointments means more money.",
      link: "/smart-scheduling",
      price: "$900 - $2,800"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-indigo-600" />,
      title: "Follow-up System",
      problem: "Potential customers contact you once and then disappear. You forget to follow up with them. You lose sales because people forget about you. You don't know when to contact them again. Competitors get the customers because they follow up better.",
      solution: "Automatic system follows up with potential customers at the right times. It sends different messages based on what they're interested in. It keeps them thinking about your service. It tells you exactly when to call them.",
      result: "60% more customers actually buy from you. You never lose a potential customer again. People remember your business. You close more deals. You make thousands more dollars every month.",
      link: "/automated-follow-ups",
      price: "$700 - $2,200"
    },
    {
      icon: <CreditCard className="w-12 h-12 text-red-600" />,
      title: "Payment & Invoice System",
      problem: "Customers pay you late or not at all. You waste hours making invoices by hand. You lose track of who owes you money. You feel embarrassed asking for money. You don't get paid on time and your business suffers.",
      solution: "Automatic invoices are sent to customers right after the job is done. Customers can pay online with one click. System tracks who paid and who didn't. It sends polite reminders automatically. You never have to ask for money again.",
      result: "Customers pay you 40% faster. You spend zero time making invoices. You always know who owes money. You get paid on time every time. Your cash flow problems disappear.",
      link: "/payment-solutions",
      price: "$1,000 - $3,200"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-orange-600" />,
      title: "Cost Tracker",
      problem: "You don't know where your money goes. Hidden costs eat your profits without you knowing. You can't tell which jobs make money and which ones lose money. You work hard but don't make enough profit. Your business could be failing and you don't even know it.",
      solution: "Simple system tracks every single expense automatically. It shows exactly what each job costs you. It tells you which jobs are profitable and which ones lose money. You see where every dollar goes.",
      result: "You find $5,000+ in hidden costs every year. You know exactly which jobs make money. You stop doing unprofitable work. You increase your prices on expensive jobs. Your profits go up significantly.",
      link: "/cost-tracking",
      price: "$800 - $2,800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTopButton />

      <style jsx>{`
        .hand-drawn-underline {
          position: relative;
        }
        .hand-drawn-underline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 8'%3E%3Cpath d='M2 4c20-2 40 2 60-1s25 3 36 1' stroke='%23ef4444' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") repeat-x;
          background-size: 100px 8px;
        }
        .hand-drawn-circle {
          position: relative;
        }
        .hand-drawn-circle::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%233b82f6' stroke-width='2' fill='none' stroke-dasharray='2,2'/%3E%3C/svg%3E") no-repeat center;
          background-size: contain;
          opacity: 0.7;
        }
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
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 scroll-reveal">
              Stop Losing Money on
              <span className="block text-red-600 hand-drawn-underline">Business Problems</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 scroll-reveal">
              We build simple software that fixes your business problems.
              <span className="block mt-2">No complex features. Just solutions that work.</span>
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 scroll-reveal">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="hand-drawn-circle">
                  <div className="text-4xl font-bold text-green-600 mb-2">$5,000+</div>
                  <div className="text-gray-600">Average money saved per year</div>
                </div>
                <div className="hand-drawn-circle">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2-8 weeks</div>
                  <div className="text-gray-600">Time to build your solution</div>
                </div>
                <div className="hand-drawn-circle">
                  <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-gray-600">Custom built for you</div>
                </div>
              </div>
            </div>
            
            <Link to="/contact-direct">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full shadow-lg">
                Get Your Custom Solution
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems We Fix */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-reveal">
              Real Business Problems We Fix
            </h2>
            <p className="text-xl text-gray-600 scroll-reveal">
              Every solution below was built for real businesses with real problems.
            </p>
          </div>

          <div className="space-y-20">
            {solutions.map((solution, index) => (
              <div key={solution.title} className="max-w-5xl mx-auto scroll-reveal">
                {/* Icon and Title */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="hand-drawn-circle">
                    {solution.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 hand-drawn-underline">{solution.title}</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Problem */}
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <h4 className="text-lg font-bold text-red-700">Your Problem</h4>
                    </div>
                    <p className="text-red-700 leading-relaxed">{solution.problem}</p>
                  </div>
                  
                  {/* Solution */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <h4 className="text-lg font-bold text-blue-700">Our Solution</h4>
                    </div>
                    <p className="text-blue-700 leading-relaxed">{solution.solution}</p>
                  </div>
                  
                  {/* Result */}
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <h4 className="text-lg font-bold text-green-700">Your Result</h4>
                    </div>
                    <p className="text-green-700 font-semibold leading-relaxed">{solution.result}</p>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl mt-6">
                  <div>
                    <div className="text-sm text-gray-600">Typical Price Range</div>
                    <div className="text-2xl font-bold text-gray-900 hand-drawn-underline">{solution.price}</div>
                  </div>
                  <Link to={solution.link}>
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3">
                      See Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 scroll-reveal">
                We Don't Have Ready Solutions
              </h2>
              <p className="text-xl text-gray-600 scroll-reveal">
                We build exactly what your business needs. Price depends on what you need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 hand-drawn-underline">Simple Solutions</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6 hand-drawn-circle">$500 - $2,000</div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Fix one business problem</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Simple to use</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Ready in 2-4 weeks</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-600 text-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <h3 className="text-2xl font-bold mb-4">Complex Solutions</h3>
                <div className="text-4xl font-bold mb-6 hand-drawn-circle">$2,000 - $8,000</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Fix multiple problems</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Connect different systems</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Ready in 1-3 months</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center scroll-reveal">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 hand-drawn-underline">How We Price Your Project</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="hand-drawn-circle">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Time Needed</h4>
                  <p className="text-gray-600">How long it takes to build</p>
                </div>
                <div className="hand-drawn-circle">
                  <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Complexity</h4>
                  <p className="text-gray-600">How complicated your needs are</p>
                </div>
                <div className="hand-drawn-circle">
                  <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Connections</h4>
                  <p className="text-gray-600">How many systems to connect</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-8">
                Tell us your problem. We'll give you an exact price in 24 hours.
              </p>
              
              <Link to="/contact-direct">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full">
                  Get Your Free Quote
                  <ArrowRight className="ml-3 w-5 h-5" />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 scroll-reveal">
              Stop Losing Money
            </h2>
            <p className="text-xl mb-12 scroll-reveal">
              Every day you wait, your problems cost you more money.
              <span className="block mt-2">Let's fix them now.</span>
            </p>
            
            <div className="space-y-8 scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg">
                  Get Your Solution Now
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              
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
        </div>
      </section>
    </div>
  );
};

export default CustomSolution;
