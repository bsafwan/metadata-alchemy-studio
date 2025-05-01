
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedText from '@/components/AnimatedText';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, FileCheck, Eye, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';

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

            <div className="space-y-8 text-black">
              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Introduction</h2>
                <p className="mb-4">At Elismet LTD, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                <p>This privacy policy applies to all users of our services, including subscribers to our software products and visitors to our website.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Information We Collect</h2>
                <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Identity Data includes first name, last name, username or similar identifier.</li>
                  <li>Contact Data includes billing address, delivery address, email address and telephone numbers.</li>
                  <li>Financial Data includes payment card details.</li>
                  <li>Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                  <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li>Usage Data includes information about how you use our website, products and services.</li>
                  <li>Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
                </ul>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">How We Use Your Information</h2>
                <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
                <p className="mt-4">Here are some specific ways we use your data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To register you as a new customer</li>
                  <li>To process and deliver your subscription or order</li>
                  <li>To manage your relationship with us</li>
                  <li>To personalize your experience and improve our services</li>
                  <li>To recommend products or services that may interest you</li>
                  <li>To administer and protect our business and this website</li>
                </ul>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Data Security</h2>
                <p className="mb-4">We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
                <p>We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.</p>
                <div className="bg-slate-50 p-4 rounded-md mt-4 flex items-start gap-3">
                  <Lock className="text-elismet-blue mt-1 flex-shrink-0" />
                  <p className="text-sm text-black">Elismet LTD employs industry-standard encryption technologies and security protocols to protect your sensitive information during transmission and storage. Our security team regularly audits our systems and practices to identify and address potential vulnerabilities.</p>
                </div>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Cookies and Tracking Technologies</h2>
                <p className="mb-4">Our website uses cookies and similar tracking technologies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
                <p>Cookies are small data files that may include an anonymous unique identifier. We use the following types of cookies:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Essential cookies:</strong> Necessary for the website to function properly.</li>
                  <li><strong>Functionality cookies:</strong> Allow us to recognize and remember your preferences.</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website.</li>
                  <li><strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
                </ul>
                <p className="mt-4">You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Your Legal Rights</h2>
                <p className="mb-4">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-50 p-4 rounded-md flex items-start gap-3">
                    <FileCheck className="text-elismet-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-black">Right of access</h3>
                      <p className="text-sm text-black">Request a copy of your personal data.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md flex items-start gap-3">
                    <FileCheck className="text-elismet-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-black">Right to rectification</h3>
                      <p className="text-sm text-black">Request correction of your personal data.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md flex items-start gap-3">
                    <FileCheck className="text-elismet-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-black">Right to erasure</h3>
                      <p className="text-sm text-black">Request deletion of your personal data.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md flex items-start gap-3">
                    <FileCheck className="text-elismet-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1 text-black">Right to object</h3>
                      <p className="text-sm text-black">Object to processing of your personal data.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">International Transfers</h2>
                <p className="mb-4">We may share your personal data within our group of companies and with trusted third-party service providers. This might involve transferring your data outside of the European Economic Area (EEA).</p>
                <p>Whenever we transfer your personal data outside of the EEA, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We will only transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data.</li>
                  <li>Where we use certain service providers, we may use specific contracts approved for use in the UK or EU which give personal data the same protection it has in the UK or EU.</li>
                </ul>
              </div>

              <div className="scroll-reveal">
                <h2 className="text-2xl font-bold text-black mb-4">Contact Us</h2>
                <p className="mb-4">If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                <div className="bg-slate-50 p-4 rounded-lg mb-4">
                  <p className="text-black"><strong>Email:</strong> contact@elismet.com</p>
                  <p className="text-black"><strong>Phone (UK):</strong> +44 7380 480139</p>
                  <p className="text-black"><strong>Phone (Bangladesh):</strong> +88 01326 764715</p>
                </div>
                <p className="mt-4 text-sm text-black">If you have a concern about our handling of your personal data, you can contact the Information Commissioner's Office (ICO) or other applicable regulatory authority.</p>
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

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
