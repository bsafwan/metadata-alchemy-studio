
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const CustomSolution = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Software Solutions - Elismet LTD",
      "description": "Bespoke software development services tailored to your unique business needs. Professional custom solutions from London-based software experts.",
      "url": "https://elismet.com/custom-solution",
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
      "serviceType": "Custom Software Development",
      "offers": {
        "@type": "Offer",
        "description": "Custom software development services"
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
        <title>Custom Software Solutions - Elismet LTD | Bespoke Development Services</title>
        <meta name="description" content="Professional custom software development services tailored to your unique business needs. Elismet LTD delivers bespoke solutions with 50+ global projects completed." />
        <meta name="keywords" content="custom software development, bespoke software solutions, tailored applications, business software, elismet custom development, london software company" />
        <meta name="author" content="Elismet LTD" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elismet.com/custom-solution" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elismet.com/custom-solution" />
        <meta property="og:title" content="Custom Software Solutions - Elismet LTD | Bespoke Development Services" />
        <meta property="og:description" content="Professional custom software development services tailored to your unique business needs. Elismet LTD delivers bespoke solutions with 50+ global projects completed." />
        <meta property="og:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Elismet LTD" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elismet.com/custom-solution" />
        <meta name="twitter:title" content="Custom Software Solutions - Elismet LTD | Bespoke Development Services" />
        <meta name="twitter:description" content="Professional custom software development services tailored to your unique business needs. Elismet LTD delivers bespoke solutions." />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 mb-8">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Tailored Solutions</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                Custom Software
                <span className="block text-blue-600">Built for You</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Every business is unique. Get software solutions designed specifically for your needs, processes, and goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact-direct?source-page=Custom%20Solution">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                    Start Your Project
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
                Why Choose Custom?
              </h2>
              <p className="text-xl text-gray-600">
                Off-the-shelf solutions can't match your unique business requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect Fit</h3>
                <p className="text-gray-600">Built exactly for your processes and workflows</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scalable</h3>
                <p className="text-gray-600">Grows with your business needs</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Control</h3>
                <p className="text-gray-600">Own your software completely</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready for Your Custom Solution?
              </h2>
              <p className="text-xl text-blue-100 mb-12">
                Let's discuss your unique requirements and build something amazing together.
              </p>
              
              <Link to="/contact-direct?source-page=Custom%20Solution">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  Get Started Today
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

export default CustomSolution;
