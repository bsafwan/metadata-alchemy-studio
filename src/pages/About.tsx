
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Heart, ArrowRight, MapPin, Phone, Globe, Building } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 mb-8">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">About Elismet</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
              Building the Future
              <span className="block text-blue-600">One Solution at a Time</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of software developers dedicated to creating innovative solutions that drive real business results.
            </p>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
                  ELISMET LTD
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Headquarters</p>
                      <p className="text-gray-600">
                        Office 12611, 182-184 High Street North<br />
                        East Ham, London, United Kingdom<br />
                        E6 2JA
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">+44 7380 480139</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Globe className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Website</p>
                      <a href="https://elismet.com" className="text-blue-600 hover:underline">elismet.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Building className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Company Details</p>
                      <p className="text-gray-600">
                        Private Limited Company<br />
                        Incorporated: 7 May 2025<br />
                        Company Number: 16433590<br />
                        SIC: 62012 - Business and domestic software development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Leadership</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-2">MD RABIULLAH</h4>
                    <p className="text-sm text-gray-600 mb-4">Director & Founder</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Born: August 1978</p>
                      <p>Nationality: Bangladeshi</p>
                      <p>Appointed: 7 May 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
              Our Journey
            </h2>
            
            <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed space-y-8">
              <p>
                Elismet Ltd began as a vision when our founder registered the domain in July 2023. What started as a dream has transformed into a reality that spans the globe, delivering complex software solutions to clients worldwide.
              </p>
              
              <p>
                Initially, we focused on local expansion, but we quickly realized that understanding our clients' needs deeply was more important than rapid growth. This philosophy shift allowed us to build stronger relationships and deliver more effective solutions.
              </p>
              
              <p>
                Today, we have expanded our reach around the world, building complex software solutions for clients who value discretion and excellence. Many of our projects remain confidential at our clients' request, testament to the sensitive and critical nature of the work we do.
              </p>
              
              <blockquote className="border-l-4 border-blue-600 pl-6 italic text-xl text-gray-700">
                "Elismet Ltd was my dream once I registered the domain. Gracefully, today we have 50+ global complex software projects. It wasn't a long time, but only several years of my and my team's hard work got us here."
                <cite className="block mt-4 text-lg font-semibold text-gray-900">- MD RABIULLAH, Founder & Director</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Purpose-Driven</h3>
              <p className="text-gray-600">We don't just build software – we solve real problems and create meaningful impact for our clients' businesses.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">Every line of code we write is crafted with attention to detail and a commitment to excellence.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Reach</h3>
              <p className="text-gray-600">From local beginnings to worldwide impact, we serve clients across the globe with dedication and expertise.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Confidentiality</h3>
              <p className="text-gray-600">We understand the sensitive nature of business software and maintain the highest standards of discretion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600">
              How we work with you to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-3xl font-black text-blue-600 mb-4">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Understand</h3>
              <p className="text-gray-600">We start by deeply understanding your business, challenges, and goals.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-3xl font-black text-green-600 mb-4">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Design</h3>
              <p className="text-gray-600">We design solutions that are both functional and user-friendly.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
              <div className="text-3xl font-black text-purple-600 mb-4">03</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Deliver</h3>
              <p className="text-gray-600">We build, test, and deliver solutions that exceed expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-blue-100 mb-12">
              Let's discuss how we can help transform your business with custom software solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/custom-solution">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl rounded-full shadow-lg hover:shadow-xl transition-all">
                  View Solutions
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact-direct">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-4 text-xl rounded-full">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
