
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import AnimatedText from '@/components/AnimatedText';
import AnimatedCounter from '@/components/AnimatedCounter';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Calendar, Image, MessageCircle, Search, Settings, Send, Star, UserRound, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const projectsData = [
    {
      title: "MetaCad",
      description: "An advanced ads copy builder and subscription-based software that helps businesses create compelling ad copies optimized for conversion.",
      status: "upcoming" as const,
      tags: ["AI", "Subscription"],
      imageUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Hook Generator Pro",
      description: "Generate engaging titles, meta descriptions, SEO content, and first paragraphs that hook your audience and improve conversion rates.",
      status: "upcoming" as const,
      tags: ["AI", "Content"],
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Chemix.online",
      description: "An established chemistry blog that's already earning through Google AdSense and chemistry sponsorships. Soon to be enhanced with AI capabilities.",
      status: "established" as const,
      tags: ["Blog", "AI Integration"],
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Free Visuals Pro",
      description: "A nearly completed freemium image transformation tool that offers both free and subscription-based premium features.",
      status: "upcoming" as const,
      tags: ["Visual", "Freemium"],
      imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074&auto=format&fit=crop",
    },
  ];

  const statsData = [
    { value: 4, label: "Software Projects", icon: <Settings className="w-6 h-6 text-elismet-blue" /> },
    { value: 15, label: "Team Members", suffix: "+", icon: <UserRound className="w-6 h-6 text-elismet-blue" /> },
    { value: 24, label: "Support Hours", suffix: "/7", icon: <Calendar className="w-6 h-6 text-elismet-blue" /> },
  ];

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
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient hero-mask -z-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <AnimatedText 
                text="Welcome to Elismet LTD" 
                className="text-lg font-semibold text-elismet-orange mb-2"
                animation="fade-in"
              />
              <AnimatedText
                text="We Build Innovative Software Solutions" 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance text-shadow"
                delay={0.1}
                animation="slide-up"
              />
              <AnimatedText
                text="Transforming ideas into powerful subscription-based software products that drive results and create value." 
                className="text-lg text-white/90 mb-8"
                delay={0.2}
                animation="slide-up"
              />
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
                <Button 
                  size="lg" 
                  className="bg-white text-elismet-blue hover:bg-slate-100 animate-zoom-in shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/#projects">Explore Projects</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 animate-zoom-in"
                >
                  <Link to="/#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative animate-float">
              <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl"></div>
              <img
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png"
                alt="Elismet LTD"
                className="w-full max-w-lg mx-auto relative z-10 animate-rotate-in"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow transform hover:-translate-y-1 hover:bg-slate-50 duration-300 scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s`, transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4 bg-white/80 w-16 h-16 mx-auto rounded-full shadow-inner flex items-center justify-center">{stat.icon}</div>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix || ''}
                  className="text-4xl font-bold text-elismet-blue mb-2"
                  startOnView={true}
                />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AnimatedText
              text="Our Innovative Projects"
              className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
              animation="slide-up"
            />
            <AnimatedText
              text="We're building the next generation of software solutions to help businesses thrive in the digital era."
              className="text-muted-foreground"
              delay={0.1}
              animation="fade-in"
            />
          </div>
          
          <div className="space-y-12">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                direction={index % 2 === 0 ? 'left' : 'right'}
                index={index}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              className="bg-elismet-blue text-white hover:bg-elismet-lightBlue animate-pulse-glow group"
            >
              View All Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 scroll-reveal">
              <AnimatedText
                text="We are preparing for the next big thing"
                className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
                animation="slide-up"
              />
              <AnimatedText
                text="At Elismet LTD, we specialize in building subscription-based software solutions that help businesses automate processes, improve efficiency, and drive growth."
                className="text-muted-foreground mb-6"
                delay={0.1}
                animation="fade-in"
              />
              <AnimatedText
                text="Our team of expert developers, designers, and marketers work together to create software that not only solves problems but also delivers an exceptional user experience."
                className="text-muted-foreground mb-6"
                delay={0.2}
                animation="fade-in"
              />
              <Link to="/author">
                <Button 
                  className="bg-elismet-blue hover:bg-elismet-lightBlue text-white animate-zoom-in group" 
                  style={{ animationDelay: '0.3s' }}
                >
                  <UserRound className="mr-2 group-hover:rotate-12 transition-transform" />
                  Meet Our Team
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 animate-float scroll-reveal">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-elismet-lightBlue/30 to-elismet-orange/30 rounded-xl blur-xl animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Elismet Team" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-hero text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AnimatedText
              text="Get In Touch"
              className="text-3xl md:text-4xl font-bold mb-4"
              animation="zoom-in"
            />
            <AnimatedText
              text="Have questions about our projects or services? Reach out to us today."
              className="text-white/80"
              delay={0.1}
              animation="fade-in"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-white/15 scroll-reveal">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-white/80 mb-2">Contact our support team</p>
              <a href="mailto:contact@elismet.com" className="text-white hover:text-elismet-orange transition-colors font-medium underline">
                contact@elismet.com
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-center transform transition-transform duration-300 hover:scale-105 hover:bg-white/15 scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-white/80 mb-2">UK Office</p>
              <a href="tel:+447380480139" className="text-white hover:text-elismet-orange transition-colors font-medium underline">
                +44 7380 480139
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-center md:col-span-2 lg:col-span-1 transform transition-transform duration-300 hover:scale-105 hover:bg-white/15 scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-white/80 mb-2">Bangladesh Office</p>
              <a href="tel:+8801326764715" className="text-white hover:text-elismet-orange transition-colors font-medium underline">
                +88 01326 764715
              </a>
            </div>
          </div>
          
          <div className="mt-16 text-center max-w-lg mx-auto">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 animate-pulse-glow w-full sm:w-auto animate-zoom-in"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" 
                alt="Elismet LTD" 
                className="h-12 mx-auto md:mx-0" 
              />
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-end">
              <Link to="/#home" className="hover:text-elismet-lightBlue transition-colors">Home</Link>
              <Link to="/#projects" className="hover:text-elismet-lightBlue transition-colors">Projects</Link>
              <Link to="/#about" className="hover:text-elismet-lightBlue transition-colors">About</Link>
              <Link to="/#contact" className="hover:text-elismet-lightBlue transition-colors">Contact</Link>
              <Link to="/author" className="hover:text-elismet-lightBlue transition-colors">Team</Link>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-slate-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} Elismet LTD. All rights reserved.
              </p>
              <div className="flex gap-6 justify-center md:justify-end">
                <a href="#" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
