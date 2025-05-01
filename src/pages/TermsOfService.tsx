
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Scale, Clock, CreditCard, AlertTriangle } from 'lucide-react';
import Footer from '@/components/Footer';

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-xl text-white/90 mb-8">Last updated: May 01, 2025</p>
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

            <div className="space-y-8 text-black">
              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Acceptance of Terms</h2>
                <p className="mb-4">By accessing or using the services provided by Elismet LTD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                <p>These Terms of Service apply to all users of our services, including subscribers to our software products and visitors to our website.</p>
                <div className="bg-slate-50 p-4 rounded-md mt-4 flex items-start gap-3">
                  <CheckCircle className="text-elismet-blue mt-1 flex-shrink-0" />
                  <p className="text-sm text-black">By continuing to access or use our services after any revisions to these Terms become effective, you agree to be bound by the revised terms. If you do not agree to the revised terms, you must stop using our services.</p>
                </div>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Description of Services</h2>
                <p className="mb-4">Elismet LTD provides subscription-based software services that may include but are not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-black">
                  <li><strong>MetaCad</strong> - An advanced ads copy builder and subscription-based software that helps businesses create compelling ad copies optimized for conversion.</li>
                  <li><strong>Hook Generator Pro</strong> - A tool for generating engaging titles, meta descriptions, SEO content, and first paragraphs that hook your audience and improve conversion rates.</li>
                  <li><strong>Chemix.online</strong> - An established chemistry blog with educational content that's already earning through Google AdSense and chemistry sponsorships. Soon to be enhanced with AI capabilities.</li>
                  <li><strong>Free Visuals Pro</strong> - A nearly completed freemium image transformation tool that offers both free and subscription-based premium features.</li>
                </ul>
                <p className="mt-4 text-black">The specific features and functionality of each service are described on our website and in the relevant service documentation. We reserve the right to modify, suspend or discontinue any part of our services at any time without notice.</p>
              </div>

              {/* Additional Sections */}
              {/* Example of changing the text color on a dark background */}
              <div className="scroll-reveal bg-dark text-white">
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <div className="flex items-start gap-3 mb-4">
                  <Scale className="text-elismet-blue mt-1 flex-shrink-0" />
                  <div>
                    <p>All content and materials available through our services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the property of Elismet LTD or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
                  </div>
                </div>
                <p>Any feedback, comments, or suggestions you may provide regarding our services is entirely voluntary, and we will be free to use such feedback, comments, or suggestions without any obligation to you.</p>
              </div>

              {/* Example of using text-white on dark backgrounds */}
              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Term and Termination</h2>
                <p className="mb-4">These Terms will remain in effect until terminated by you or by us. We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms.</p>
                <p>Upon termination, your right to use our services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
              </div>

              {/* Continue other sections similarly... */}
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

      <Footer />
    </div>
  );
};

export default TermsOfService;
