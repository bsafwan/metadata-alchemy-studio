
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, Users, Zap, Shield, Globe, Star, MessageCircle, Mail, Phone, Code, Lightbulb, Rocket } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 mb-8">
              <Code className="w-4 h-4" />
              <span className="text-sm font-medium">Professional Software Development</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Elismet
              <span className="block text-blue-600">Software Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              We build custom software applications that solve real business problems. From web applications to automation tools, we create solutions that work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/custom-solution">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  View Our Solutions
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact-direct">
                <Button size="lg" variant="outline" className="px-12 py-4 text-xl rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Company Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <div className="text-4xl font-black text-green-600 mb-2">50+</div>
                <div className="text-gray-700">Projects Delivered</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <div className="text-4xl font-black text-blue-600 mb-2">100%</div>
                <div className="text-gray-700">Client Satisfaction</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg scroll-reveal">
                <div className="text-4xl font-black text-purple-600 mb-2">24/7</div>
                <div className="text-gray-700">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 scroll-reveal">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 scroll-reveal">
              We specialize in building custom software solutions that help businesses grow and operate more efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center scroll-reveal">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Development</h3>
              <p className="text-gray-600">We build software from scratch, tailored to your specific business needs and requirements.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Problem Solving</h3>
              <p className="text-gray-600">We identify your business challenges and create innovative solutions that deliver real results.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
              <p className="text-gray-600">We deliver high-quality solutions quickly, so you can start seeing results sooner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 scroll-reveal">
              Why Choose Elismet?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center scroll-reveal">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast & Reliable</h3>
              <p className="text-gray-600">We deliver quality software solutions on time, every time.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Experience</h3>
              <p className="text-gray-600">Years of experience building successful software for businesses of all sizes.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dedicated Support</h3>
              <p className="text-gray-600">We provide ongoing support and maintenance for all our solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 scroll-reveal">
              Ready to Build Your Solution?
            </h2>
            <p className="text-xl text-blue-100 mb-12 scroll-reveal">
              Let's discuss your project and create something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center scroll-reveal">
              <Link to="/custom-solution">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  Explore Solutions
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact-direct">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-4 text-xl rounded-full">
                  Get Started
                </Button>
              </Link>
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
                Professional software development company creating custom solutions for businesses worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Services</h4>
              <div className="space-y-4">
                <Link to="/custom-solution" className="block text-gray-400 hover:text-white transition-colors">Custom Solutions</Link>
                <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors">Consultation</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Company</h4>
              <div className="space-y-4">
                <Link to="/author" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
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
