
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Play, Code, Zap, Rocket, X, ExternalLink } from 'lucide-react';

const Demo = () => {
  const [selectedDemo, setSelectedDemo] = useState<any>(null);

  const demoSolutions = [
    {
      id: 'review-management',
      title: 'Review Management System',
      category: 'Customer Feedback',
      description: 'Automated review collection and management dashboard for service businesses',
      image: '/lovable-uploads/148a1735-3e9c-406a-bcdb-0f63554df826.png',
      screenshots: [
        '/lovable-uploads/8b11a4bb-ccb7-4752-a5b5-6715ad944294.png',
        '/lovable-uploads/232ed886-bd34-4893-b84c-9e252036bbc5.png',
        '/lovable-uploads/35fec644-ad3d-4ffd-8495-d928388878b2.png'
      ],
      features: ['Customer review tracking', 'Automated follow-ups', 'Review templates', 'Business selection tool']
    },
    {
      id: 'smart-scheduling',
      title: 'Smart Scheduling System',
      category: 'Appointment Management', 
      description: 'Intelligent scheduling dashboard with conflict detection and staff management',
      image: '/lovable-uploads/be668d83-02e9-48bb-ae06-b56c61210725.png',
      screenshots: [
        '/lovable-uploads/5be2be4b-7543-4d94-80ad-04a590ce28fd.png',
        '/lovable-uploads/4d57d22c-1fe6-463f-858e-3428439fe0d8.png'
      ],
      features: ['Calendar integration', 'Conflict detection', 'Staff scheduling', 'Appointment tracking']
    },
    {
      id: 'payment-system',
      title: 'Payment & Invoice Management',
      category: 'Financial Management',
      description: 'Comprehensive payment tracking and invoice management system',
      image: '/lovable-uploads/bde2b2df-2ec8-47d4-9811-774de152fe16.png',
      screenshots: [
        '/lovable-uploads/a29fc300-a99b-48f5-8f23-74618992b174.png',
        '/lovable-uploads/bc3e02cb-6839-4fd0-a0e7-e4c2f7cee5e8.png'
      ],
      features: ['Payment tracking', 'Invoice generation', 'Due date management', 'Multiple payment methods']
    }
  ];

  const openDemo = (demo: any) => {
    setSelectedDemo(demo);
  };

  const closeDemo = () => {
    setSelectedDemo(null);
  };

  return (
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

      {/* Live Demo Gallery */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Interactive Demo Gallery
              </h2>
              <p className="text-xl text-gray-600">
                Click on any demo to explore our real business solutions in detail.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demoSolutions.map((demo) => (
                <div
                  key={demo.id}
                  onClick={() => openDemo(demo)}
                  className="group cursor-pointer bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="aspect-video bg-gray-50 overflow-hidden">
                    <img 
                      src={demo.image} 
                      alt={demo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                      {demo.category}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {demo.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {demo.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {demo.screenshots.length + 1} screenshots
                      </div>
                      <div className="flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700">
                        View Demo
                        <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Categories */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              More Demo Categories
            </h2>
            <p className="text-xl text-gray-600">
              Additional types of solutions we've built for our clients.
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
                More demos coming soon
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Automation Tools</h3>
              <p className="text-gray-600 mb-6">Business process automation and workflow solutions.</p>
              <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
                More demos coming soon
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
              <p className="text-gray-600 mb-6">Tailored software solutions for specific business needs.</p>
              <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-500">
                More demos coming soon
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

      {/* Demo Modal */}
      {selectedDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedDemo.title}</h2>
                <p className="text-gray-600">{selectedDemo.category}</p>
              </div>
              <button 
                onClick={closeDemo}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-8">
                <img 
                  src={selectedDemo.image} 
                  alt={selectedDemo.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedDemo.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {selectedDemo.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedDemo.screenshots.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Screenshots</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedDemo.screenshots.map((screenshot: string, index: number) => (
                      <img 
                        key={index}
                        src={screenshot} 
                        alt={`${selectedDemo.title} screenshot ${index + 1}`}
                        className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <Link to="/contact-direct">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
                    Request Similar Solution
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Demo;
