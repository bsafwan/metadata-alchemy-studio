import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Schedule Your Business Consultation
            </h1>
            <p className="text-gray-600 text-lg">
              Book a professional consultation to discuss your business challenges and CRM solutions
            </p>
          </div>

          {/* Calendly Embed */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ScrollArea className="h-[80vh] min-h-[600px] max-h-[800px] w-full">
              <iframe
                src="https://calendly.com/elismet-support/discussion-of-your-business-problems?embed_domain=localhost%3A8080&embed_type=Inline"
                width="100%"
                height="800"
                frameBorder="0"
                scrolling="no"
                title="Schedule a meeting"
                className="w-full"
              ></iframe>
            </ScrollArea>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">30</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30-Minute Sessions</h3>
              <p className="text-gray-600 text-sm">Focused consultation tailored to your specific business needs</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">📅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Thursday & Friday</h3>
              <p className="text-gray-600 text-sm">Available during business hours Eastern Time (EDT)</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">💼</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Professional Support</h3>
              <p className="text-gray-600 text-sm">Direct consultation with our business solution experts</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Schedule;