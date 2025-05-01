
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, Scale, Clock, CreditCard, AlertTriangle } from 'lucide-react';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen text-black bg-white">
      <Navbar />
      <ScrollToTopButton />

      {/* Header */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient hero-mask -z-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Static Text instead of AnimatedText */}
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
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Acceptance of Terms</h2>
                <p className="mb-4">By accessing or using the services provided by Elismet LTD, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                <p>These Terms of Service apply to all users of our services, including subscribers to our software products and visitors to our website.</p>
                <div className="bg-slate-50 p-4 rounded-md mt-4 flex items-start gap-3">
                  <CheckCircle className="text-elismet-blue mt-1 flex-shrink-0" />
                  <p className="text-sm text-black">By continuing to access or use our services after any revisions to these Terms become effective, you agree to be bound by the revised terms. If you do not agree to the revised terms, you must stop using our services.</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Description of Services</h2>
                <p className="mb-4">Elismet LTD provides subscription-based software services that may include but are not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>MetaCad</strong> - An advanced ads copy builder and subscription-based software that helps businesses create compelling ad copies optimized for conversion.</li>
                  <li><strong>Hook Generator Pro</strong> - A tool for generating engaging titles, meta descriptions, SEO content, and first paragraphs that hook your audience and improve conversion rates.</li>
                  <li><strong>Chemix.online</strong> - An established chemistry blog with educational content that's already earning through Google AdSense and chemistry sponsorships. Soon to be enhanced with AI capabilities.</li>
                  <li><strong>Free Visuals Pro</strong> - A nearly completed freemium image transformation tool that offers both free and subscription-based premium features.</li>
                </ul>
                <p className="mt-4">The specific features and functionality of each service are described on our website and in the relevant service documentation. We reserve the right to modify, suspend or discontinue any part of our services at any time without notice.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Subscription and Billing</h2>
                <div className="flex items-start gap-3 mb-4">
                  <CreditCard className="text-elismet-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-black">Some of our services require payment of fees on a subscription basis. By subscribing to a service, you agree to pay the applicable fees as they become due.</p>
                  </div>
                </div>
                <p className="mb-4">Subscription fees are charged in advance and are non-refundable. You may cancel your subscription at any time, but no refunds will be provided for any unused portion of your subscription term.</p>
                <p>We may change our fees and payment terms at any time, but any changes will not apply to your current subscription term. We will notify you of any fee changes before they take effect.</p>
                <p className="mt-4">For subscription services, we offer the following plans:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2 text-black">Monthly Subscription</h3>
                    <p className="text-sm text-black">Billed monthly with auto-renewal. You can cancel at any time before the next billing cycle.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2 text-black">Annual Subscription</h3>
                    <p className="text-sm text-black">Billed annually with a discount compared to monthly billing. Auto-renews after 12 months.</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-4">User Obligations</h2>
                <p className="mb-4">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                <p className="mb-4">You agree not to use our services for any illegal or unauthorized purpose, and you agree to comply with all laws, rules, and regulations applicable to your use of our services.</p>
                <p>Specifically, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use our services to transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                  <li>Attempt to gain unauthorized access to any portion of our services or any related systems or networks.</li>
                  <li>Use any automated means to access our services or collect any information from our services.</li>
                  <li>Interfere with or disrupt the integrity or performance of our services or the data contained therein.</li>
                  <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of our services without our express written permission.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Intellectual Property</h2>
                <div className="flex items-start gap-3 mb-4">
                  <Scale className="text-elismet-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-black">All content and materials available through our services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the property of Elismet LTD or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
                  </div>
                </div>
                <p className="mb-4">You may not modify, reproduce, distribute, create derivative works from, publicly display, or publicly perform any of the materials on our services without our prior written consent.</p>
                <p>Any feedback, comments, or suggestions you may provide regarding our services is entirely voluntary, and we will be free to use such feedback, comments, or suggestions without any obligation to you.</p>
              </div>

              {/* Add additional sections if needed */}

              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <Link to="/">
                    <ArrowLeft size={16} />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;
