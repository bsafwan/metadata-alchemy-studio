
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Clock, Users, CheckCircle, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const AutomatedFollowUps = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Automated Follow-up Systems - Elismet LTD",
      "description": "Intelligent automated follow-up systems that nurture leads and retain customers. Never miss a follow-up opportunity with smart automation.",
      "url": "https://elismet.com/automated-follow-ups",
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
      "serviceType": "Automated Follow-up Systems",
      "offers": {
        "@type": "Offer",
        "description": "Automated customer follow-up and lead nurturing systems"
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
        <title>Automated Follow-up Systems - Elismet LTD | Smart Customer Nurturing</title>
        <meta name="description" content="Intelligent automated follow-up systems that nurture leads and retain customers. Never miss a follow-up opportunity with Elismet LTD's smart automation solutions." />
        <meta name="keywords" content="automated follow-ups, customer nurturing, lead management, follow-up automation, customer retention, elismet automated systems" />
        <meta name="author" content="Elismet LTD" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elismet.com/automated-follow-ups" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elismet.com/automated-follow-ups" />
        <meta property="og:title" content="Automated Follow-up Systems - Elismet LTD | Smart Customer Nurturing" />
        <meta property="og:description" content="Intelligent automated follow-up systems that nurture leads and retain customers. Never miss a follow-up opportunity with smart automation solutions." />
        <meta property="og:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Elismet LTD" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elismet.com/automated-follow-ups" />
        <meta name="twitter:title" content="Automated Follow-up Systems - Elismet LTD | Smart Customer Nurturing" />
        <meta name="twitter:description" content="Intelligent automated follow-up systems that nurture leads and retain customers. Never miss a follow-up opportunity." />
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
        <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-pink-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full text-purple-700 mb-8">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Never Miss a Follow-up</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                Automated
                <span className="block text-purple-600">Follow-ups</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Turn every lead into a customer with intelligent, personalized follow-up sequences that work 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact-direct?source-page=Automated%20Follow-ups">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                    Start Automating
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
                Smart Follow-up Features
              </h2>
              <p className="text-xl text-gray-600">
                Intelligent automation that feels personal and gets results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Multi-Channel</h3>
                <p className="text-gray-600">Email, SMS, WhatsApp, and voice calls</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized</h3>
                <p className="text-gray-600">AI-powered personalization for each contact</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Timing</h3>
                <p className="text-gray-600">Optimal timing based on behavior patterns</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
                Proven Results
              </h2>
              
              <div className="grid md:grid-cols-3 gap-12 mb-16">
                <div>
                  <div className="text-6xl font-bold text-purple-600 mb-4">85%</div>
                  <div className="text-xl text-gray-600">Higher Response Rate</div>
                </div>
                <div>
                  <div className="text-6xl font-bold text-green-600 mb-4">3x</div>
                  <div className="text-xl text-gray-600">More Conversions</div>
                </div>
                <div>
                  <div className="text-6xl font-bold text-blue-600 mb-4">24/7</div>
                  <div className="text-xl text-gray-600">Always Working</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-purple-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Automate Your Follow-ups?
              </h2>
              <p className="text-xl text-purple-100 mb-12">
                Stop losing leads. Start converting more customers with intelligent automation.
              </p>
              
              <Link to="/contact-direct?source-page=Automated%20Follow-ups">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
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

export default AutomatedFollowUps;
