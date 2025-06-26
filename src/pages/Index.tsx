
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, Users, Zap, Shield, Globe, Star, MessageCircle, Mail, Phone, DollarSign, TrendingUp, Calendar, MessageSquare, CreditCard, BarChart3, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

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
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Multi-Channel Support",
      problem: "Customers contact you everywhere - email, phone, social media",
      result: "73% faster response times",
      link: "/multi-channel-support"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "AI Customer Onboarding", 
      problem: "New customers get confused and leave",
      result: "89% completion rate",
      link: "/ai-customer-onboarding"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Review Boost",
      problem: "Happy customers don't leave reviews",
      result: "5x more positive reviews",
      link: "/review-boost"
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Smart Scheduling",
      problem: "Double bookings and missed appointments",
      result: "95% booking accuracy",
      link: "/smart-scheduling"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
      title: "Automated Follow-ups",
      problem: "Leads go cold without follow-up",
      result: "60% more conversions",
      link: "/automated-follow-ups"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: "Payment Solutions",
      problem: "Late payments and manual invoicing chaos",
      result: "40% faster payments",
      link: "/payment-solutions"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Cost Tracking",
      problem: "Hidden costs eating your profits",
      result: "$94K recovered annually",
      link: "/cost-tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 mb-8">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Custom Software Solutions That Actually Work</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Stop Losing Money on
              <span className="block text-blue-600">Broken Systems</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              We build custom software that solves your specific problems. No templates, no one-size-fits-all. Just solutions that work for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Your Custom Solution
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Results Preview */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <div className="text-4xl font-black text-green-600 mb-2">$94K</div>
                <div className="text-gray-700">Average profit recovered per year</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <div className="text-4xl font-black text-blue-600 mb-2">73%</div>
                <div className="text-gray-700">Faster response times</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <div className="text-4xl font-black text-purple-600 mb-2">5x</div>
                <div className="text-gray-700">More positive reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 scroll-reveal">
              Real Problems. Real Solutions.
            </h2>
            <p className="text-xl text-gray-600 scroll-reveal">
              We don't build software for the sake of it. We solve specific problems that cost you money every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {solutions.map((solution, index) => (
              <Link key={solution.title} to={solution.link}>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group scroll-reveal h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{solution.problem}</p>
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <TrendingUp className="w-4 h-4" />
                    <span>{solution.result}</span>
                  </div>
                  <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 scroll-reveal">
              We Don't Have Ready Solutions
            </h2>
            <p className="text-xl text-gray-600 scroll-reveal">
              Because your problems are unique. We build exactly what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Understand Your Problem</h3>
              <p className="text-gray-600">We dig deep into your specific challenges and pain points</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Build Custom Solution</h3>
              <p className="text-gray-600">We create software designed specifically for your needs</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Deliver Results</h3>
              <p className="text-gray-600">You get measurable improvements to your bottom line</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 scroll-reveal">
              Pricing Based on Your Needs
            </h2>
            <p className="text-xl text-gray-600 scroll-reveal">
              Every business is different. So is our pricing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 text-center scroll-reveal">
              <div className="flex items-center justify-center gap-2 mb-8">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <h3 className="text-3xl font-bold text-gray-900">Custom Solution Pricing</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-4">Simple Solutions</div>
                  <div className="text-4xl font-black text-blue-600 mb-4">$500 - $2,000</div>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• Single feature automation</li>
                    <li>• Basic integrations</li>
                    <li>• Simple workflows</li>
                    <li>• 2-4 week delivery</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-4">Complex Solutions</div>
                  <div className="text-4xl font-black text-purple-600 mb-4">$2,000 - $15,000</div>
                  <ul className="text-gray-600 space-y-2 text-left">
                    <li>• Multi-system integration</li>
                    <li>• Custom dashboards</li>
                    <li>• Advanced automation</li>
                    <li>• 1-3 month delivery</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8">
                Final price depends on complexity, integrations needed, and timeline requirements.
              </p>
              
              <Link to="/contact-direct">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Get Your Custom Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Elismet */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 scroll-reveal">
              Why Choose Elismet?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center scroll-reveal">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
              <p className="text-blue-100">Get your solution in weeks, not months. We move fast.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Problem-Focused</h3>
              <p className="text-blue-100">We solve problems, not build features. Results matter.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Proven Results</h3>
              <p className="text-blue-100">Our solutions deliver measurable improvements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 scroll-reveal">
              Ready to Stop Losing Money?
            </h2>
            <p className="text-xl text-gray-600 mb-12 scroll-reveal">
              Tell us your problem. We'll build the solution.
            </p>
            
            <div className="scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Your Custom Solution
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-12 text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Custom Quote</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to solve your problems? Let's talk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow scroll-reveal">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">Quick response guaranteed</p>
              <a href="mailto:contact@elismet.com" className="text-blue-600 hover:text-blue-700 font-medium">
                contact@elismet.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow scroll-reveal">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">UK Office</h3>
              <p className="text-gray-600 mb-4">Call us directly</p>
              <a href="tel:+447380480139" className="text-blue-600 hover:text-blue-700 font-medium">
                +44 7380 480139
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow scroll-reveal">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bangladesh Office</h3>
              <p className="text-gray-600 mb-4">Regional support</p>
              <a href="tel:+8801326764715" className="text-blue-600 hover:text-blue-700 font-medium">
                +88 01326 764715
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-6">Elismet</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Custom software solutions that solve real problems and deliver measurable results.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Solutions</h4>
              <div className="space-y-4">
                <Link to="/multi-channel-support" className="block text-gray-400 hover:text-white transition-colors">Multi-Channel Support</Link>
                <Link to="/payment-solutions" className="block text-gray-400 hover:text-white transition-colors">Payment Solutions</Link>
                <Link to="/cost-tracking" className="block text-gray-400 hover:text-white transition-colors">Cost Tracking</Link>
                <Link to="/review-boost" className="block text-gray-400 hover:text-white transition-colors">Review Boost</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Company</h4>
              <div className="space-y-4">
                <Link to="/author" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link to="/privacy-policy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Elismet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
