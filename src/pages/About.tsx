import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, Globe, Building, Mail, Target, Award, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">About Us</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
              Software that solves real problems.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Elismet Ltd is a UK-registered software development company building AI-powered products and custom platforms for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Elismet Ltd</h2>
              <p className="text-muted-foreground text-sm mb-1">Company Number: 16433590</p>
              <div className="space-y-5 mt-8">
                {[
                  { icon: MapPin, label: 'Headquarters', value: 'Office 12611, 182-184 High Street North\nEast Ham, London, E6 2JA' },
                  { icon: Phone, label: 'Phone', value: '+44 7380 480139' },
                  { icon: Mail, label: 'Email', value: 'contact@elismet.com' },
                  { icon: Globe, label: 'Website', value: 'elismet.com', link: 'https://elismet.com' },
                  { icon: Building, label: 'Type', value: 'Private Limited Company · Incorporated 7 May 2025' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-primary hover:underline text-sm font-medium">{item.value}</a>
                      ) : (
                        <p className="text-sm font-medium text-foreground whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Leadership</h3>
              <div className="bg-muted/50 rounded-xl p-6">
                <h4 className="font-bold text-foreground">Md Rabiullah</h4>
                <p className="text-sm text-muted-foreground mt-1">Director & Founder</p>
                <p className="text-xs text-muted-foreground mt-3">Appointed: 7 May 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Elismet Ltd started with a domain registration in July 2023 and a simple idea: build software people actually need. Since incorporation in May 2025, we've grown into a team delivering complex solutions for clients across the globe.
              </p>
              <p>
                Our first product, <a href="https://docwise.pro" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">DocWise.pro</a>, launched as an AI-powered legal intelligence platform — helping businesses analyse contracts, detect risks, and draft documents in minutes instead of days.
              </p>
              <p>
                We continue to expand our capabilities across custom software development, AI integrations, and SaaS products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Target, title: 'Purpose-Driven', desc: 'We solve real problems, not imaginary ones.', color: 'text-primary' },
              { icon: Award, title: 'Quality First', desc: 'Every detail matters. Every release is production-ready.', color: 'text-primary' },
              { icon: Users, title: 'Global Reach', desc: 'Clients across continents trust us with critical systems.', color: 'text-primary' },
              { icon: Heart, title: 'Confidentiality', desc: 'Discretion is non-negotiable. Your data stays yours.', color: 'text-primary' },
            ].map((v) => (
              <div key={v.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to work together?</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Tell us about your project and we'll take it from there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-direct">
                <Button size="lg" className="rounded-full px-8">
                  Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Schedule a Call
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
