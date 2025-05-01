
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedText from '@/components/AnimatedText';
import ScrollToTopButton from '@/components/ScrollToTop';
import { UsersRound, Book, Star, Mail } from 'lucide-react';

const Author = () => {
  const teamMembers = [
    {
      name: "MD Rabiullah",
      role: "CEO & Founder",
      bio: "Visionary leader who founded Elismet LTD with the goal of creating innovative subscription-based software solutions that solve real problems for businesses and individuals.",
      imageUrl: "/lovable-uploads/1a14858e-4552-4232-a4f6-a9a31042b5ec.png",
      isFounder: true,
      socials: {
        email: "rabiullah@elismet.com",
        linkedin: "#",
      }
    },
    {
      name: "Robiul Islam",
      role: "Assistant & Co-founder",
      bio: "Integral part of Elismet LTD, holding internal shares and helping to drive the company's vision forward with expertise in technology and business development.",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      isFounder: false,
      socials: {
        email: "robiul@elismet.com",
        linkedin: "#",
      }
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient hero-mask -z-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText 
              text="Meet Our Team" 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              animation="zoom-in"
            />
            <AnimatedText
              text="The brilliant minds behind Elismet LTD" 
              className="text-xl text-white/90 mb-8"
              delay={0.3}
              animation="fade-in"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  index % 2 === 0 ? 'animate-slide-in-right' : 'animate-slide-in-left'
                }`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-full h-80 object-cover"
                  />
                  {member.isFounder && (
                    <div className="absolute top-4 right-4 bg-elismet-orange text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse-glow">
                      Founder
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <h3 className="text-3xl font-bold mb-1">{member.name}</h3>
                    <p className="text-white/80 text-lg">{member.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-6">{member.bio}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <UsersRound size={18} className="text-elismet-blue" />
                      <span className="text-sm text-muted-foreground">Leadership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Book size={18} className="text-elismet-blue" />
                      <span className="text-sm text-muted-foreground">Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={18} className="text-elismet-blue" />
                      <span className="text-sm text-muted-foreground">Innovation</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-elismet-blue hover:bg-elismet-lightBlue text-white w-full group flex items-center justify-center gap-2"
                    onClick={() => window.location.href = `mailto:${member.socials.email}`}
                  >
                    <Mail size={18} className="transition-transform group-hover:scale-110" />
                    Connect with {member.name.split(' ')[0]}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <AnimatedText
                text="Our Vision & Mission"
                className="text-3xl font-bold mb-6 gradient-text"
                animation="slide-up"
              />
              <AnimatedText
                text="At Elismet LTD, we believe in transforming ideas into powerful software solutions that drive results and create value."
                className="text-lg text-muted-foreground mb-6"
                delay={0.1}
                animation="fade-in"
              />
              <AnimatedText
                text="Our mission is to develop innovative subscription-based software that helps businesses automate processes, improve efficiency, and drive growth in the digital era."
                className="text-lg text-muted-foreground mb-6"
                delay={0.2}
                animation="fade-in"
              />
              <Button 
                className="bg-elismet-blue hover:bg-elismet-lightBlue text-white mt-4 animate-pulse-glow" 
                style={{ animationDelay: '0.3s' }}
              >
                Join Our Journey
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-elismet-blue to-elismet-lightBlue rounded-xl opacity-30 blur-xl animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Our Vision" 
                  className="w-full h-auto rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
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
              <a href="/" className="hover:text-elismet-lightBlue transition-colors">Home</a>
              <a href="/#projects" className="hover:text-elismet-lightBlue transition-colors">Projects</a>
              <a href="/#about" className="hover:text-elismet-lightBlue transition-colors">About</a>
              <a href="/#contact" className="hover:text-elismet-lightBlue transition-colors">Contact</a>
              <a href="/author" className="hover:text-elismet-lightBlue transition-colors">Team</a>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-slate-400 text-center md:text-left">
                &copy; {new Date().getFullYear()} Elismet LTD. All rights reserved.
              </p>
              <div className="flex gap-6 justify-center md:justify-end">
                <a href="/privacy-policy" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Author;
