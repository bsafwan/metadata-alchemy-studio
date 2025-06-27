
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Users, Globe, Award, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const About = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Elismet LTD",
      "alternateName": "Elismet",
      "url": "https://elismet.com",
      "logo": "https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44 7380 480139",
        "contactType": "customer service",
        "email": "support@elismet.com",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office 12611, 182-184 High Street North",
        "addressLocality": "East Ham",
        "addressRegion": "London",
        "postalCode": "E6 2JA",
        "addressCountry": "GB"
      },
      "description": "Elismet LTD specializes in business and domestic software development. We build innovative subscription-based software solutions that drive results for businesses worldwide.",
      "foundingDate": "2025-05-07",
      "industry": "Software Development",
      "numberOfEmployees": "10-50",
      "sameAs": [
        "https://elismet.com"
      ]
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
        <title>About Elismet LTD (16433590) - London Software Development Company</title>
        <meta name="description" content="Learn about Elismet LTD, a London-based software development company founded in 2025. We specialize in custom business software solutions with 50+ global projects completed." />
        <meta name="keywords" content="elismet ltd, about elismet, london software company, software development company, business software solutions, custom software development" />
        <meta name="author" content="Elismet LTD" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elismet.com/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elismet.com/about" />
        <meta property="og:title" content="About Elismet LTD (16433590) - London Software Development Company" />
        <meta property="og:description" content="Learn about Elismet LTD, a London-based software development company founded in 2025. We specialize in custom business software solutions." />
        <meta property="og:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Elismet LTD" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elismet.com/about" />
        <meta name="twitter:title" content="About Elismet LTD (16433590) - London Software Development Company" />
        <meta name="twitter:description" content="Learn about Elismet LTD, a London-based software development company founded in 2025. Custom business software solutions." />
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
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                About
                <span className="block text-blue-600">Elismet LTD</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                We're a London-based software development company dedicated to building innovative solutions that drive real business results.
              </p>
            </div>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Founded in May 2025, Elismet LTD (Company Number: 16433590) has quickly established itself as a trusted partner for businesses seeking innovative software solutions.
                  </p>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We specialize in understanding complex business needs and translating them into powerful, user-friendly software that makes a real difference.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Established 2025</h3>
                        <p className="text-gray-600">Private Limited Company in London, UK</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">50+ Projects Completed</h3>
                        <p className="text-gray-600">Complex software solutions delivered globally</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Global Reach</h3>
                        <p className="text-gray-600">Serving businesses worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Company Name</h4>
                      <p className="text-gray-600">ELISMET LTD (16433590)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Founded</h4>
                      <p className="text-gray-600">7 May 2025</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Website Registered</h4>
                      <p className="text-gray-600">14 July 2023</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Industry</h4>
                      <p className="text-gray-600">Business & Domestic Software Development (SIC: 62012)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Contact Emails</h4>
                      <p className="text-gray-600">support@elismet.com</p>
                      <p className="text-gray-600">contact@elismet.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">Office 12611, 182-184 High Street North, East Ham, London, United Kingdom, E6 2JA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                What We Do
              </h2>
              <p className="text-xl text-gray-600">
                We build innovative subscription-based software solutions that drive results and create value for businesses worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Software Development</h3>
                <p className="text-gray-600 text-sm">Tailored solutions for unique business needs</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Channel Support Systems</h3>
                <p className="text-gray-600 text-sm">Unified communication platforms</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Customer Onboarding</h3>
                <p className="text-gray-600 text-sm">Intelligent automation solutions</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Scheduling Solutions</h3>
                <p className="text-gray-600 text-sm">Automated scheduling and management</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-blue-100 mb-12">
                Let's discuss how we can help transform your business with innovative software solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Link to="/contact-direct?source-page=About">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                    Get In Touch
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-blue-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+44 7380 480139</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>support@elismet.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
