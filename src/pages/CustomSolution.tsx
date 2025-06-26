
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, Users, Zap, Shield, Globe, Star, MessageCircle, Mail, Phone, DollarSign, TrendingUp, Calendar, MessageSquare, CreditCard, BarChart3, Target, Clock, Building, Sparkles } from 'lucide-react';
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
      problem: "Missing customer messages across platforms",
      solution: "One dashboard for all communications",
      result: "73% faster response times",
      image: "/lovable-uploads/d8c67d8e-ae8d-4543-9375-f8ea78f91278.png",
      link: "/multi-channel-support",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: "AI Customer Onboarding", 
      problem: "New customers get confused and leave",
      solution: "Smart automated onboarding system",
      result: "89% completion rate",
      image: "/lovable-uploads/1175ece9-b7b1-488c-b08d-cd3c94cac51f.png",
      link: "/ai-customer-onboarding",
      gradient: "from-green-500 to-green-700"
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-600" />,
      title: "Review Boost",
      problem: "Happy customers don't leave reviews",
      solution: "Automated review collection system",
      result: "5x more positive reviews",
      image: "/lovable-uploads/3258e4d9-4cee-4315-80d5-9a060132facc.png",
      link: "/review-boost",
      gradient: "from-yellow-500 to-yellow-700"
    },
    {
      icon: <Calendar className="w-12 h-12 text-purple-600" />,
      title: "Smart Scheduling",
      problem: "Double bookings and missed appointments",
      solution: "Intelligent appointment management",
      result: "95% booking accuracy",
      image: "/lovable-uploads/4a98bb7b-4550-4bf0-8136-60316572323b.png",
      link: "/smart-scheduling",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      icon: <MessageCircle className="w-12 h-12 text-indigo-600" />,
      title: "Automated Follow-ups",
      problem: "Leads go cold without follow-up",
      solution: "Smart automated follow-up sequences",
      result: "60% more conversions",
      image: "/lovable-uploads/54af61ba-4e97-4c71-8b4e-a4f82e963999.png",
      link: "/automated-follow-ups",
      gradient: "from-indigo-500 to-indigo-700"
    },
    {
      icon: <CreditCard className="w-12 h-12 text-red-600" />,
      title: "Payment Solutions",
      problem: "Late payments and manual invoicing chaos",
      solution: "Automated payment and invoice system",
      result: "40% faster payments",
      image: "/lovable-uploads/63287882-c163-4cc2-8e38-71171ee99495.png",
      link: "/payment-solutions",
      gradient: "from-red-500 to-red-700"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-orange-600" />,
      title: "Cost Tracking",
      problem: "Hidden costs eating your profits",
      solution: "Complete expense tracking system",
      result: "$94K recovered annually",
      image: "/lovable-uploads/670f5355-e4e9-4986-8c1a-f8ed7e5e4f3a.png",
      link: "/cost-tracking",
      gradient: "from-orange-500 to-orange-700"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white mb-12 scroll-reveal">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">Custom Software Solutions</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight scroll-reveal">
              Stop Losing Money on
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Broken Systems
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-5xl mx-auto leading-relaxed scroll-reveal">
              We don't have ready solutions. We build exactly what your business needs. 
              <span className="block mt-4 text-blue-300">From simple fixes to complete systems.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20 scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-16 py-6 text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                  Get Your Custom Solution
                  <ArrowRight className="ml-4 w-6 h-6" />
                </Button>
              </Link>
            </div>

            {/* Results Preview */}
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto scroll-reveal">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-5xl font-black text-green-400 mb-3">$94K</div>
                <div className="text-gray-300">Average profit recovered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-5xl font-black text-blue-400 mb-3">73%</div>
                <div className="text-gray-300">Faster operations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-5xl font-black text-purple-400 mb-3">5x</div>
                <div className="text-gray-300">Better results</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-5xl font-black text-yellow-400 mb-3">95%</div>
                <div className="text-gray-300">Success rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve - Enhanced Visual Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 scroll-reveal">
              Real Problems.
              <span className="block text-blue-600">Real Solutions.</span>
            </h2>
            <p className="text-2xl text-gray-600 scroll-reveal">
              Every solution below was built for real businesses facing real problems.
            </p>
          </div>

          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <div key={solution.title} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 scroll-reveal`} style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Image Side */}
                <div className="flex-1 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} rounded-3xl blur-3xl opacity-20 transform rotate-6`}></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-8">
                  <div className={`inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r ${solution.gradient} rounded-2xl text-white`}>
                    {solution.icon}
                    <span className="text-xl font-bold">{solution.title}</span>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-2xl">
                      <h4 className="text-xl font-bold text-red-700 mb-2">The Problem</h4>
                      <p className="text-red-600 text-lg">{solution.problem}</p>
                    </div>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                      <h4 className="text-xl font-bold text-blue-700 mb-2">Our Solution</h4>
                      <p className="text-blue-600 text-lg">{solution.solution}</p>
                    </div>
                    
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-2xl">
                      <h4 className="text-xl font-bold text-green-700 mb-2">The Result</h4>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <span className="text-green-600 text-xl font-bold">{solution.result}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to={solution.link}>
                    <Button size="lg" className={`bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
                      See Full Case Study
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Pricing Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 scroll-reveal">
              Custom Pricing
              <span className="block text-blue-400">For Your Needs</span>
            </h2>
            <p className="text-2xl text-gray-300 scroll-reveal">
              Every business is different. So is our pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 scroll-reveal">
              <div className="text-center mb-8">
                <Building className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Simple Solutions</h3>
                <div className="text-5xl font-black text-blue-400 mb-6">$500 - $2,000</div>
              </div>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>Single feature fixes</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>Basic automation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>Simple integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>2-4 week delivery</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-12 border-2 border-purple-400/50 relative scroll-reveal">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">MOST POPULAR</span>
              </div>
              <div className="text-center mb-8">
                <Zap className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Complex Solutions</h3>
                <div className="text-5xl font-black text-purple-400 mb-6">$2,000 - $15,000</div>
              </div>
              <ul className="space-y-4 text-gray-300 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>Complete system builds</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>Multi-platform integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>Custom dashboards</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>1-3 month delivery</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center scroll-reveal">
            <p className="text-xl text-gray-300 mb-12">
              Final price depends on complexity, integrations needed, and timeline requirements.
            </p>
            
            <Link to="/contact-direct">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-16 py-6 text-2xl rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                Get Your Custom Quote
                <ArrowRight className="ml-4 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 scroll-reveal">
              We Don't Have
              <span className="block text-red-600">Ready Solutions</span>
            </h2>
            <p className="text-2xl text-gray-600 scroll-reveal">
              Because your problems are unique. We build exactly what you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            <div className="text-center scroll-reveal">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-3xl font-black text-white">1</span>
                </div>
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl -z-10"></div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Understand Your Problem</h3>
              <p className="text-gray-600 text-lg">We dig deep into your specific challenges and pain points. No assumptions, just facts.</p>
            </div>
            
            <div className="text-center scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-3xl font-black text-white">2</span>
                </div>
                <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-2xl -z-10"></div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Build Custom Solution</h3>
              <p className="text-gray-600 text-lg">We create software designed specifically for your needs. Every line of code serves a purpose.</p>
            </div>
            
            <div className="text-center scroll-reveal" style={{animationDelay: '0.4s'}}>
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <span className="text-3xl font-black text-white">3</span>
                </div>
                <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-2xl -z-10"></div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Deliver Results</h3>
              <p className="text-gray-600 text-lg">You get measurable improvements to your bottom line. Results you can see and count.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-8 scroll-reveal">
              Ready to Stop
              <span className="block text-red-400">Losing Money?</span>
            </h2>
            <p className="text-2xl text-gray-300 mb-16 scroll-reveal">
              Tell us your problem. We'll build the solution.
            </p>
            
            <div className="space-y-8 scroll-reveal">
              <Link to="/contact-direct">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-20 py-8 text-3xl rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                  Get Your Custom Solution
                  <ArrowRight className="ml-4 w-8 h-8" />
                </Button>
              </Link>
              
              <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 text-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Custom Quote</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span>Guaranteed Results</span>
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
