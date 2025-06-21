
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, Users, Zap, Shield, Globe, Star, MessageCircle, Mail, Phone } from 'lucide-react';
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

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-elismet-orange" />,
      title: "Lightning Fast Development",
      description: "Get your software built in weeks, not months. Our streamlined process delivers results quickly."
    },
    {
      icon: <Shield className="w-8 h-8 text-elismet-blue" />,
      title: "Enterprise Security",
      description: "Bank-grade security built into every application. Your data and users are always protected."
    },
    {
      icon: <Globe className="w-8 h-8 text-elismet-lightBlue" />,
      title: "Global Scale",
      description: "Built to handle millions of users worldwide. Scalable architecture from day one."
    }
  ];

  const projects = [
    {
      title: "MetaCad",
      description: "AI-powered ads copy builder with subscription management",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Hook Generator Pro",
      description: "Generate engaging content that converts visitors to customers",
      status: "Coming Soon", 
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Chemix.online",
      description: "Established chemistry platform with AI integration",
      status: "Live",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11234d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elismet-blue/5 to-elismet-lightBlue/5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Build Software That 
              <span className="block text-elismet-blue">Actually Works</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We create subscription-based software solutions that drive real results for businesses worldwide. From concept to launch in record time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-elismet-blue hover:bg-elismet-lightBlue text-white px-8 py-4 text-lg">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/get-started">
                  <Button size="lg" className="bg-elismet-blue hover:bg-elismet-lightBlue text-white px-8 py-4 text-lg">
                    Get Started Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Link to="#projects">
                <Button size="lg" variant="outline" className="border-2 border-elismet-blue text-elismet-blue hover:bg-elismet-blue hover:text-white px-8 py-4 text-lg">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Elismet?
            </h2>
            <p className="text-xl text-gray-600">
              We combine cutting-edge technology with proven business strategies to deliver software that exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center scroll-reveal" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Latest Projects
            </h2>
            <p className="text-xl text-gray-600">
              Real software solutions that are changing how businesses operate and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div key={project.title} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 scroll-reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Live' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-elismet-blue/10 text-elismet-blue'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-elismet-blue text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 max-w-5xl mx-auto text-center">
            <div className="scroll-reveal">
              <div className="text-5xl font-bold mb-4">4+</div>
              <div className="text-xl opacity-90">Active Projects</div>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold mb-4">15+</div>
              <div className="text-xl opacity-90">Team Members</div>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-4">24/7</div>
              <div className="text-xl opacity-90">Support Available</div>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-bold mb-4">100%</div>
              <div className="text-xl opacity-90">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-elismet-blue to-elismet-lightBlue rounded-3xl p-16 text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
              Join hundreds of businesses who trust Elismet to deliver software that drives real results. Let's discuss your project today.
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-elismet-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Access Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/get-started">
                <Button size="lg" className="bg-white text-elismet-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
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
              Have questions? We're here to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow scroll-reveal">
              <div className="bg-elismet-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-elismet-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">Get support from our team</p>
              <a href="mailto:contact@elismet.com" className="text-elismet-blue hover:text-elismet-lightBlue font-medium">
                contact@elismet.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <div className="bg-elismet-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-elismet-orange" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">UK Office</h3>
              <p className="text-gray-600 mb-4">Call us directly</p>
              <a href="tel:+447380480139" className="text-elismet-blue hover:text-elismet-lightBlue font-medium">
                +44 7380 480139
              </a>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="bg-elismet-lightBlue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-elismet-lightBlue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bangladesh Office</h3>
              <p className="text-gray-600 mb-4">Regional support</p>
              <a href="tel:+8801326764715" className="text-elismet-blue hover:text-elismet-lightBlue font-medium">
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
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-12 mb-6" 
              />
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Building the future of software, one solution at a time. Trusted by businesses worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Company</h4>
              <div className="space-y-4">
                <Link to="/author" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="#projects" className="block text-gray-400 hover:text-white transition-colors">Projects</Link>
                <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Legal</h4>
              <div className="space-y-4">
                <Link to="/privacy-policy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Elismet LTD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
