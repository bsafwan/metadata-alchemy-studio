
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedText from '@/components/AnimatedText';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTopButton />

      {/* Header */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient hero-mask -z-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedText 
              text="Privacy Policy" 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              animation="zoom-in"
            />
            <AnimatedText
              text="Last updated: May 01, 2025" 
              className="text-xl text-white/90 mb-8"
              delay={0.3}
              animation="fade-in"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-slate-100">
            <div className="flex items-center justify-center mb-8">
              <Shield size={40} className="text-elismet-blue" />
            </div>

            <div className="space-y-8 text-muted-foreground">
              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p className="mb-4">At Elismet LTD, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                <p>This privacy policy applies to all users of our services, including subscribers to our software products and visitors to our website.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Identity Data includes first name, last name, username or similar identifier.</li>
                  <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                  <li>Financial Data includes payment card details.</li>
                  <li>Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                  <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                </ul>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                <p className="mb-4">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
                <p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="mb-4">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                <div className="bg-slate-50 p-4 rounded-lg mb-4">
                  <p><strong>Email:</strong> contact@elismet.com</p>
                  <p><strong>Phone (UK):</strong> +44 7380 480139</p>
                  <p><strong>Phone (Bangladesh):</strong> +88 01326 764715</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Button 
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/">
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </Button>
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
              <Link to="/" className="hover:text-elismet-lightBlue transition-colors">Home</Link>
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
                <Link to="/privacy-policy" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-slate-400 hover:text-elismet-lightBlue transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
