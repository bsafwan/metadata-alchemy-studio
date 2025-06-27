
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Shield, Zap, CheckCircle, DollarSign, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const PaymentSolutions = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Payment Processing Solutions - Elismet LTD",
      "description": "Secure, fast payment processing solutions for businesses. Accept payments online, in-store, and on mobile with advanced security features.",
      "url": "https://elismet.com/payment-solutions",
      "provider": {
        "@type": "Organization",
        "name": "Elismet LTD",
        "url": "https://elismet.com",
        "logo": "https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Office 12611, 182-184 High Street North",
          "addressLocality": "East Ham",
          "addressRegion": "London",
          "postalCode": "E6 2JA",
          "addressCountry": "GB"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+44 7380 480139",
          "contactType": "customer service",
          "email": "support@elismet.com"
        }
      },
      "serviceType": "Payment Processing Solutions",
      "offers": {
        "@type": "Offer",
        "description": "Secure payment processing and financial transaction solutions"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Payment Processing Solutions - Elismet LTD | Secure Financial Systems</title>
        <meta name="description" content="Secure, fast payment processing solutions for businesses. Accept payments online, in-store, and mobile with advanced security and fraud protection from Elismet LTD." />
        <meta name="keywords" content="payment processing, payment solutions, online payments, secure transactions, payment gateway, financial systems, elismet payments" />
        <meta name="author" content="Elismet LTD" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elismet.com/payment-solutions" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elismet.com/payment-solutions" />
        <meta property="og:title" content="Payment Processing Solutions - Elismet LTD | Secure Financial Systems" />
        <meta property="og:description" content="Secure, fast payment processing solutions for businesses. Accept payments online, in-store, and mobile with advanced security features." />
        <meta property="og:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Elismet LTD" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elismet.com/payment-solutions" />
        <meta name="twitter:title" content="Payment Processing Solutions - Elismet LTD | Secure Financial Systems" />
        <meta name="twitter:description" content="Secure, fast payment processing solutions for businesses. Accept payments online, in-store, and mobile with advanced security." />
        <meta name="twitter:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta name="twitter:creator" content="@Elismet" />

        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta http-equiv="Content-Language" content="en-gb" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-green-700 mb-8">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Bank-Level Security</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                Payment
                <span className="block text-green-600">Solutions</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Accept payments anywhere, anytime with secure, fast, and reliable payment processing solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact-direct?source-page=Payment%20Solutions">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                    Get Payment System
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Complete Payment Suite
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to accept and manage payments securely.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Multiple Methods</h3>
                <p className="text-gray-600">Cards, digital wallets, bank transfers, and more</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ultra Secure</h3>
                <p className="text-gray-600">PCI DSS compliant with fraud protection</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Reach</h3>
                <p className="text-gray-600">Accept payments from customers worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
                Why Choose Our Solutions?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div className="text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold">Fast Setup</h3>
                  </div>
                  <p className="text-gray-600">Get started accepting payments in minutes, not weeks</p>
                </div>
                
                <div className="text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold">Low Fees</h3>
                  </div>
                  <p className="text-gray-600">Competitive rates with transparent pricing</p>
                </div>
                
                <div className="text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold">24/7 Support</h3>
                  </div>
                  <p className="text-gray-600">Round-the-clock technical and business support</p>
                </div>
                
                <div className="text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-semibold">Advanced Analytics</h3>
                  </div>
                  <p className="text-gray-600">Real-time reporting and business insights</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-green-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Accept Payments?
              </h2>
              <p className="text-xl text-green-100 mb-12">
                Start processing payments securely today with our enterprise-grade solutions.
              </p>
              
              <Link to="/contact-direct?source-page=Payment%20Solutions">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Started Now
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PaymentSolutions;
