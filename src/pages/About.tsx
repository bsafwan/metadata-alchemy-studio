
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Target, Award, Heart, ArrowRight } from 'lucide-react';

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

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 text-center">
              Our Story
            </h2>
            
            <div className="prose prose-xl max-w-none text-gray-600 leading-relaxed">
              <p className="mb-8">
                Elismet was founded with a simple yet powerful vision: to bridge the gap between complex business challenges and elegant software solutions. We believe that every business, regardless of size, deserves access to high-quality, custom software that drives growth and efficiency.
              </p>
              
              <p className="mb-8">
                Our journey began when we recognized that many businesses were struggling with off-the-shelf solutions that didn't quite fit their unique needs. We saw an opportunity to create something different – a company that would take the time to understand each client's specific requirements and build solutions that truly work.
              </p>
              
              <p>
                Today, we're proud to have helped dozens of businesses transform their operations through custom software solutions. From small startups to established enterprises, we've consistently delivered results that exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client-Centric</h3>
              <p className="text-gray-600">Your success is our success. We work closely with you to ensure our solutions align with your goals.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Passionate</h3>
              <p className="text-gray-600">We love what we do, and it shows in the enthusiasm and dedication we bring to every project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-white">
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
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <div className="text-3xl font-black text-blue-600 mb-4">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Understand</h3>
              <p className="text-gray-600">We start by deeply understanding your business, challenges, and goals.</p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8 text-center">
              <div className="text-3xl font-black text-green-600 mb-4">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Design</h3>
              <p className="text-gray-600">We design solutions that are both functional and user-friendly.</p>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
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
