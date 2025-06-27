import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

const GetStarted = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Get Started - Elismet LTD",
      "description": "Start your journey with Elismet LTD. Create an account, contact us directly, or chat with our AI assistant. Professional software development services.",
      "url": "https://elismet.com/get-started",
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

  const options = [
    {
      title: "Create Account",
      description: "Join our platform and become a regular customer with full access to our services",
      icon: UserPlus,
      path: "/onboard",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      title: "Contact Us",
      description: "Send us a direct message through our professional contact system",
      icon: Mail,
      path: "/contact-direct",
      color: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      title: "Live Chat",
      description: "Get instant answers and information through our AI-powered chat system",
      icon: MessageCircle,
      path: "/live-chat",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Get Started - Elismet LTD | Professional Software Development Services</title>
        <meta name="description" content="Start your software development journey with Elismet LTD. Create an account, contact our team, or chat with our AI assistant. 50+ global software projects completed." />
        <meta name="keywords" content="get started elismet, software development services, create account, contact elismet, live chat support, business software solutions" />
        <meta name="author" content="Elismet LTD" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://elismet.com/get-started" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elismet.com/get-started" />
        <meta property="og:title" content="Get Started - Elismet LTD | Professional Software Development Services" />
        <meta property="og:description" content="Start your software development journey with Elismet LTD. Create an account, contact our team, or chat with our AI assistant. 50+ global software projects completed." />
        <meta property="og:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Elismet LTD" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://elismet.com/get-started" />
        <meta name="twitter:title" content="Get Started - Elismet LTD | Professional Software Development Services" />
        <meta name="twitter:description" content="Start your software development journey with Elismet LTD. Create an account, contact our team, or chat with our AI assistant." />
        <meta name="twitter:image" content="https://elismet.com/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png" />
        <meta name="twitter:creator" content="@Elismet" />

        {/* Additional SEO Meta Tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta http-equiv="Content-Language" content="en-gb" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started with Elismet
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose how you'd like to begin your journey with us. We're here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {options.map((option, index) => (
              <Card key={index} className={`transition-all duration-300 hover:shadow-lg ${option.color}`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <option.icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {option.description}
                  </CardDescription>
                  <Link to={option.path}>
                    <Button className="w-full group">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">
              Not sure which option is right for you?
            </p>
            <Link to="/live-chat">
              <Button variant="outline" className="hover:bg-gray-100">
                Talk to our AI assistant for guidance
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default GetStarted;
