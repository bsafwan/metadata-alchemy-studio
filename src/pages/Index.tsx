
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, Users, Zap, Shield, Globe, Star, MessageCircle, Mail, Phone, Code, Lightbulb, Rocket, TrendingUp, Award, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-full text-muted-foreground mb-8 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 scroll-reveal">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Trusted by 50+ businesses worldwide</span>
              <Award className="w-4 h-4 text-primary" />
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-[0.9] tracking-tight scroll-reveal">
              <span className="block">Premium</span>
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Software
              </span>
              <span className="block">Solutions</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light scroll-reveal">
              We transform your business challenges into cutting-edge software solutions that drive
              <span className="font-medium text-foreground"> measurable growth</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 scroll-reveal">
              <Link to="/custom-solution">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  Explore Solutions
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg rounded-xl border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Schedule Consultation
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal group">
                <div className="text-4xl md:text-5xl font-black text-primary mb-3 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-muted-foreground font-medium">Projects Delivered</div>
                <div className="w-full h-1 bg-primary/20 rounded-full mt-4">
                  <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal group">
                <div className="text-4xl md:text-5xl font-black text-secondary mb-3 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-muted-foreground font-medium">Client Satisfaction</div>
                <div className="w-full h-1 bg-secondary/20 rounded-full mt-4">
                  <div className="w-full h-full bg-secondary rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal group">
                <div className="text-4xl md:text-5xl font-black text-accent mb-3 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-muted-foreground font-medium">Expert Support</div>
                <div className="w-full h-1 bg-accent/20 rounded-full mt-4">
                  <div className="w-full h-full bg-accent rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 scroll-reveal">
              <Code className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 scroll-reveal">
              What We Create
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed scroll-reveal">
              From concept to deployment, we build software that transforms businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 scroll-reveal">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Custom Development</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Bespoke software solutions built from the ground up, perfectly tailored to your unique business requirements and scalability needs.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
            
            <div className="group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 scroll-reveal">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Innovation & Strategy</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We don't just code - we strategize. Our team identifies opportunities and creates innovative solutions that drive competitive advantage.
              </p>
              <div className="flex items-center text-secondary font-medium group-hover:translate-x-2 transition-transform">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
            
            <div className="group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 scroll-reveal">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Rapid Deployment</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Time is money. Our agile methodology ensures faster time-to-market without compromising on quality or functionality.
              </p>
              <div className="flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform">
                Learn more <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6 scroll-reveal">
              <Star className="w-4 h-4" />
              Why Elismet
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 scroll-reveal">
              The Elismet Advantage
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed scroll-reveal">
              Experience the difference that true expertise makes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="text-center group scroll-reveal">
              <div className="bg-primary/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/10 transition-colors duration-300">
                <TrendingUp className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Proven Results</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our track record speaks for itself - measurable improvements in efficiency, revenue, and user satisfaction across all our projects.
              </p>
            </div>
            
            <div className="text-center group scroll-reveal">
              <div className="bg-secondary/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-secondary/10 transition-colors duration-300">
                <Award className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Industry Recognition</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Award-winning development team with deep expertise across multiple industries and cutting-edge technologies.
              </p>
            </div>
            
            <div className="text-center group scroll-reveal">
              <div className="bg-accent/5 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/10 transition-colors duration-300">
                <Clock className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Lifetime Partnership</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We don't just deliver and disappear. Our ongoing support and maintenance ensure your solution evolves with your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-transparent"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 scroll-reveal">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed scroll-reveal">
              Join the ranks of successful businesses that have revolutionized their operations with our solutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center scroll-reveal">
              <Link to="/custom-solution">
                <Button size="lg" variant="secondary" className="bg-card text-foreground hover:bg-card/90 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Your Project
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact-direct">
                <Button size="lg" variant="outline" className="border-2 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-black text-foreground mb-6">Elismet</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-8">
                Transforming businesses through innovative software solutions. 
                Your success is our mission.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-foreground mb-6">Solutions</h4>
              <div className="space-y-4">
                <Link to="/custom-solution" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">Custom Development</Link>
                <Link to="/schedule" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">Consultation</Link>
                <Link to="/contact-direct" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">Support</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-foreground mb-6">Company</h4>
              <div className="space-y-4">
                <Link to="/author" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">About Us</Link>
                <Link to="/contact-direct" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">Contact</Link>
                <Link to="/privacy-policy" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">Privacy</Link>
                <Link to="/terms-of-service" className="block text-muted-foreground hover:text-foreground transition-colors text-lg">Terms</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-lg">
              &copy; {new Date().getFullYear()} Elismet. Crafted with precision and passion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
