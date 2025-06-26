
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
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "Multi-Channel Support",
      problem: "You miss customer messages from WhatsApp, email, and social media. Customers get angry because you don't reply fast.",
      solution: "One simple dashboard shows all your messages in one place. Reply to everything from one screen.",
      result: "Reply 73% faster. Happy customers. More sales.",
      image: "/lovable-uploads/d8c67d8e-ae8d-4543-9375-f8ea78f91278.png",
      link: "/multi-channel-support",
      price: "$800 - $2,500"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "AI Customer Helper", 
      problem: "New customers don't know how to use your service. They get confused and leave without buying.",
      solution: "Smart system that guides new customers step by step. Shows them exactly what to do.",
      result: "89% of new customers complete setup. More paying customers.",
      image: "/lovable-uploads/1175ece9-b7b1-488c-b08d-cd3c94cac51f.png",
      link: "/ai-customer-onboarding",
      price: "$1,200 - $3,500"
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Review Collector",
      problem: "Happy customers don't leave reviews. Your business looks bad online. New customers don't trust you.",
      solution: "Automatic system asks happy customers for reviews at the right time. Makes it super easy for them.",
      result: "5x more good reviews. Better online reputation. More new customers.",
      image: "/lovable-uploads/3258e4d9-4cee-4315-80d5-9a060132facc.png",
      link: "/review-boost",
      price: "$600 - $1,800"
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Smart Booking System",
      problem: "Double bookings happen. Customers show up when you're busy. You lose money from missed appointments.",
      solution: "Smart calendar that prevents double bookings. Sends reminders automatically. Shows your real availability.",
      result: "95% accurate bookings. No more double bookings. Less missed appointments.",
      image: "/lovable-uploads/4a98bb7b-4550-4bf0-8136-60316572323b.png",
      link: "/smart-scheduling",
      price: "$900 - $2,800"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
      title: "Follow-up System",
      problem: "Potential customers contact you once, then disappear. You forget to follow up. You lose sales.",
      solution: "Automatic system follows up with potential customers at the right times. Keeps them interested.",
      result: "60% more customers buy. Less lost sales. More money.",
      image: "/lovable-uploads/54af61ba-4e97-4c71-8b4e-a4f82e963999.png",
      link: "/automated-follow-ups",
      price: "$700 - $2,200"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-red-600" />,
      title: "Payment & Invoice System",
      problem: "Customers pay late. You waste time making invoices by hand. You lose track of who owes money.",
      solution: "Automatic invoices sent to customers. Easy online payment. Tracks who paid and who didn't.",
      result: "Get paid 40% faster. Less time on paperwork. Know exactly who owes money.",
      image: "/lovable-uploads/63287882-c163-4cc2-8e38-71171ee99495.png",
      link: "/payment-solutions",
      price: "$1,000 - $3,200"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      title: "Cost Tracker",
      problem: "You don't know where your money goes. Hidden costs eat your profits. You can't tell if jobs are profitable.",
      solution: "Simple system tracks every expense. Shows exactly what each job costs. Tells you which jobs make money.",
      result: "Find $5,000+ in hidden costs per year. Know which jobs are profitable. Make more money.",
      image: "/lovable-uploads/670f5355-e4e9-4986-8c1a-f8ed7e5e4f3a.png",
      link: "/cost-tracking",
      price: "$800 - $2,800"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 scroll-reveal">
              Stop Losing Money on
              <span className="block text-red-600">Business Problems</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 scroll-reveal">
              We build simple software that fixes your business problems.
              <span className="block mt-2">No complex features. Just solutions that work.</span>
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 scroll-reveal">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-green-600 mb-2">$5,000+</div>
                  <div className="text-gray-600">Average money saved per year</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">2-8 weeks</div>
                  <div className="text-gray-600">Time to build your solution</div>
                </div>
                <div>
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
              <div key={solution.title} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 scroll-reveal`}>
                {/* Image */}
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    {solution.icon}
                    <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                  </div>
                  
                  {/* Problem */}
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-bold text-red-700 mb-2">Your Problem</h4>
                        <p className="text-red-700">{solution.problem}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Solution */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-bold text-blue-700 mb-2">Our Solution</h4>
                        <p className="text-blue-700">{solution.solution}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Result */}
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-lg font-bold text-green-700 mb-2">Your Result</h4>
                        <p className="text-green-700 font-semibold">{solution.result}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between bg-gray-50 p-6 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-600">Typical Price Range</div>
                      <div className="text-2xl font-bold text-gray-900">{solution.price}</div>
                    </div>
                    <Link to={solution.link}>
                      <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3">
                        See Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Simple Solutions</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">$500 - $2,000</div>
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
                <div className="text-4xl font-bold mb-6">$2,000 - $8,000</div>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How We Price Your Project</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Time Needed</h4>
                  <p className="text-gray-600">How long it takes to build</p>
                </div>
                <div>
                  <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Complexity</h4>
                  <p className="text-gray-600">How complicated your needs are</p>
                </div>
                <div>
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
