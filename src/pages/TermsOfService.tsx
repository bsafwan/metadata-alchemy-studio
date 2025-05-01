
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedText from '@/components/AnimatedText';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
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
              text="Terms of Service" 
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
              <FileText size={40} className="text-elismet-blue" />
            </div>

            <div className="space-y-8 text-muted-foreground">
              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                <p className="mb-4">By accessing or using the services provided by Elismet LTD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                <p>These Terms of Service apply to all users of our services, including subscribers to our software products and visitors to our website.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description of Services</h2>
                <p className="mb-4">Elismet LTD provides subscription-based software services that may include but are not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>MetaCad - an advanced ads copy builder</li>
                  <li>Hook Generator Pro - a tool for generating engaging titles and content</li>
                  <li>Chemix.online - a chemistry blog with educational content</li>
                  <li>Free Visuals Pro - an image transformation tool</li>
                </ul>
                <p className="mt-4">The specific features and functionality of each service are described on our website and in the relevant service documentation.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Subscription and Billing</h2>
                <p className="mb-4">Some of our services require payment of fees on a subscription basis. By subscribing to a service, you agree to pay the applicable fees as they become due.</p>
                <p className="mb-4">Subscription fees are charged in advance and are non-refundable. You may cancel your subscription at any time, but no refunds will be provided for any unused portion of your subscription term.</p>
                <p>We may change our fees and payment terms at any time, but any changes will not apply to your current subscription term. We will notify you of any fee changes before they take effect.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">User Obligations</h2>
                <p className="mb-4">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                <p>You agree not to use our services for any illegal or unauthorized purpose, and you agree to comply with all laws, rules, and regulations applicable to your use of our services.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
                <p className="mb-4">All content and materials available through our services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the property of Elismet LTD or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
                <p>You may not modify, reproduce, distribute, create derivative works from, publicly display, or publicly perform any of the materials on our services without our prior written consent.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer of Warranties</h2>
                <p>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="mb-4">If you have any questions about these Terms of Service, please contact us at:</p>
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

export default TermsOfService;
