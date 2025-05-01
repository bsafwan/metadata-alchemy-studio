
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedText from '@/components/AnimatedText';
import ScrollToTopButton from '@/components/ScrollToTop';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, FileCheck } from 'lucide-react';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen text-black bg-white">
      <Navbar />
      <ScrollToTopButton />

      {/* Header */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient hero-mask -z-10" />
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
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Content */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 border border-slate-100">
            <div className="flex items-center justify-center mb-8">
              <Shield size={40} className="text-elismet-blue" />
            </div>

            <div className="space-y-12 text-base leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p>
                  At Elismet LTD, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your information when you use our website and services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Identity and Contact Data</li>
                  <li>Financial and Transaction Data</li>
                  <li>Technical and Usage Data</li>
                  <li>Marketing and Communications Data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To register and manage your account</li>
                  <li>To process payments</li>
                  <li>To improve and personalize services</li>
                  <li>To ensure security and legal compliance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <div className="bg-slate-50 p-4 rounded-md mt-4 flex items-start gap-3">
                  <Lock className="text-elismet-blue mt-1 flex-shrink-0" />
                  <p>
                    We use industry-standard encryption and best practices to keep your data secure.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-md flex items-start gap-3">
                    <FileCheck className="text-elismet-blue mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Access & Correction</h3>
                      <p className="text-sm">You can request access or updates to your data.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-md flex items-start gap-3">
                    <FileCheck className="text-elismet-blue mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Erasure & Objection</h3>
                      <p className="text-sm">You can ask us to delete your data or stop processing it.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <p className="mb-2">Email: contact@elismet.com</p>
                <p className="mb-2">Phone (UK): +44 7380 480139</p>
                <p>Phone (Bangladesh): +88 01326 764715</p>
              </div>
            </div>

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
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

