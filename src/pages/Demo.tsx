import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, Code, Zap, Rocket } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Demo = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Demo - Elismet LTD Software Solutions",
      "description": "Experience our software solutions firsthand with interactive demos and live previews. See how Elismet LTD builds complex software for businesses worldwide.",
      "url": "https://elismet.com/demo",
      "provider": {
        "@type": "Organization",
        "name": "Elismet LTD",
        "url": "https://elismet.com",
        "logo": "https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+44 7380 480139",
          "contactType": "customer service",
          "email": "support@elismet.com"
        }
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
        <title>Demo - Elismet LTD | Interactive Software Solutions Preview</title>
        <meta name="description" content="Experience Elismet LTD's innovative software solutions firsthand. Interactive demos of web applications, automation tools, and custom business solutions. See our work in action." />
        <meta name="keywords" content="software demo, elismet demo, interactive preview, web applications, automation tools, custom software solutions, business software, elismet ltd" />
        <meta name="author" content="Elismet LTD" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elismet.com/demo" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elismet.com/demo" />
        <meta property="og:title" content="Demo - Elismet LTD | Interactive Software Solutions Preview" />
        <meta property="og:description" content="Experience Elismet LTD's innovative software solutions firsthand. Interactive demos of web applications, automation tools, and custom business solutions." />
        <meta property="og:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Elismet LTD" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elismet.com/demo" />
        <meta name="twitter:title" content="Demo - Elismet LTD | Interactive Software Solutions Preview" />
        <meta name="twitter:description" content="Experience Elismet LTD's innovative software solutions firsthand. Interactive demos of web applications, automation tools, and custom business solutions." />
        <meta name="twitter:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta name="twitter:creator" content="@Elismet" />

        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta http-equiv="Content-Language" content="en-gb" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://elismet.com" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 mb-8">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Live Demo Experience</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                See Our Work
                <span className="block text-blue-600">In Action</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience our software solutions firsthand with interactive demos and live previews of our work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/contact-direct">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                    Request Live Demo
                    <Play className="ml-3 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Categories */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Demo Categories
              </h2>
              <p className="text-xl text-gray-600">
                Explore different types of solutions we've built for our clients.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Applications</h3>
                <p className="text-gray-600 mb-6">Interactive web apps built with modern technologies.</p>
                <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
                  Demo coming soon
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Automation Tools</h3>
                <p className="text-gray-600 mb-6">Business process automation and workflow solutions.</p>
                <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
                  Demo coming soon
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
                <p className="text-gray-600 mb-6">Tailored software solutions for specific business needs.</p>
                <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
                  Demo coming soon
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Want a Personalized Demo?
              </h2>
              <p className="text-xl text-blue-100 mb-12">
                Schedule a one-on-one demonstration tailored to your specific needs.
              </p>
              
              <Link to="/contact-direct">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  Schedule Demo
                  <Play className="ml-3 w-5 h-5" />
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

export default Demo;
