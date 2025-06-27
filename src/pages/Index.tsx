
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
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 mb-6 md:mb-8 text-xs md:text-sm">
              <Code className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">Professional Software Development</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-4 md:mb-8 leading-tight px-2">
              Elismet
              <span className="block text-blue-600">Software Solutions</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              We build custom software applications that solve real business problems. From web applications to automation tools, we create solutions that work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-8 md:mb-16 px-4">
              <Link to="/custom-solution">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 md:px-12 py-3 md:py-4 text-base md:text-xl rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                  View Our Solutions
                  <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link to="/contact-direct">
                <Button size="lg" variant="outline" className="px-6 sm:px-8 md:px-12 py-3 md:py-4 text-base md:text-xl rounded-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Company Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg scroll-reveal">
                <div className="text-2xl md:text-4xl font-black text-green-600 mb-1 md:mb-2">50+</div>
                <div className="text-sm md:text-base text-gray-700">Projects Delivered</div>
              </div>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg scroll-reveal">
                <div className="text-2xl md:text-4xl font-black text-blue-600 mb-1 md:mb-2">100%</div>
                <div className="text-sm md:text-base text-gray-700">Client Satisfaction</div>
              </div>
              <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg scroll-reveal">
                <div className="text-2xl md:text-4xl font-black text-purple-600 mb-1 md:mb-2">24/7</div>
                <div className="text-sm md:text-base text-gray-700">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 scroll-reveal px-2">
              What We Do
            </h2>
            <p className="text-base md:text-xl text-gray-600 scroll-reveal px-4">
              We specialize in building custom software solutions that help businesses grow and operate more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-6xl mx-auto px-4">
            <div className="text-center scroll-reveal">
              <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Code className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Custom Development</h3>
              <p className="text-sm md:text-base text-gray-600">We build software from scratch, tailored to your specific business needs and requirements.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Problem Solving</h3>
              <p className="text-sm md:text-base text-gray-600">We identify your business challenges and create innovative solutions that deliver real results.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-purple-100 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Fast Delivery</h3>
              <p className="text-sm md:text-base text-gray-600">We deliver high-quality solutions quickly, so you can start seeing results sooner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 scroll-reveal px-2">
              Why Choose Elismet?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-6xl mx-auto px-4">
            <div className="text-center scroll-reveal">
              <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Fast & Reliable</h3>
              <p className="text-sm md:text-base text-gray-600">We deliver quality software solutions on time, every time.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Proven Experience</h3>
              <p className="text-sm md:text-base text-gray-600">Years of experience building successful software for businesses of all sizes.</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-purple-100 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">Dedicated Support</h3>
              <p className="text-sm md:text-base text-gray-600">We provide ongoing support and maintenance for all our solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 scroll-reveal px-2">
              Ready to Build Your Solution?
            </h2>
            <p className="text-base md:text-xl text-blue-100 mb-8 md:mb-12 scroll-reveal px-4">
              Let's discuss your project and create something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center scroll-reveal px-4">
              <Link to="/custom-solution">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 md:px-12 py-3 md:py-4 text-base md:text-xl rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                  Explore Solutions
                  <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </Link>
              <Link to="/contact-direct">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 md:px-12 py-3 md:py-4 text-base md:text-xl rounded-full w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="col-span-1 md:col-span-2 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Elismet</h3>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                Professional software development company creating custom solutions for businesses worldwide.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Services</h4>
              <div className="space-y-2 md:space-y-4">
                <Link to="/custom-solution" className="block text-gray-400 hover:text-white transition-colors text-sm md:text-base">Custom Solutions</Link>
                <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors text-sm md:text-base">Consultation</Link>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Company</h4>
              <div className="space-y-2 md:space-y-4">
                <Link to="/author" className="block text-gray-400 hover:text-white transition-colors text-sm md:text-base">About Us</Link>
                <Link to="/contact-direct" className="block text-gray-400 hover:text-white transition-colors text-sm md:text-base">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              &copy; {new Date().getFullYear()} Elismet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
