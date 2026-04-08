import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Brain, Layers, Shield, FileText, Globe, Sparkles, ExternalLink } from 'lucide-react';
import docwiseLogo from '@/assets/docwise-logo.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
              Software Development · AI · SaaS
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
              We build software that{' '}
              <span className="text-primary">works.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Elismet Ltd is a UK-based software development company specialising in AI-powered products, custom platforms, and scalable SaaS solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-direct">
                <Button size="lg" className="rounded-full px-8 text-base">
                  Get in Touch
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base">
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-muted-foreground text-lg">End-to-end software solutions for modern businesses.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Code,
                title: 'Custom Software',
                desc: 'Tailored platforms, dashboards, and internal tools built to your exact requirements.',
              },
              {
                icon: Brain,
                title: 'AI Solutions',
                desc: 'Intelligent automation, NLP pipelines, and machine-learning integrations that deliver real value.',
              },
              {
                icon: Layers,
                title: 'SaaS Products',
                desc: 'We design, build, and launch subscription-based products from concept to market.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DocWise.pro — Our Product */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold mb-6">
                  <Sparkles className="w-3 h-3" /> Launched
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={docwiseLogo} alt="DocWise.pro" className="h-10 w-10 rounded-lg" />
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">DocWise.pro</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Legal intelligence, simplified. Upload any contract — get instant risk analysis, AI-drafted documents, and reusable templates across multiple jurisdictions.
                </p>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full px-6">
                    Visit DocWise.pro
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Risk Detection', desc: 'Flag risky clauses automatically' },
                  { icon: FileText, title: 'AI Drafting', desc: 'Generate documents in minutes' },
                  { icon: Layers, title: 'Smart Templates', desc: 'Reusable, auto-placeholder docs' },
                  { icon: Globe, title: 'Multi-jurisdiction', desc: '5+ jurisdictions supported' },
                ].map((f) => (
                  <div key={f.title} className="bg-muted/50 border border-border rounded-xl p-5">
                    <f.icon className="w-5 h-5 text-primary mb-3" />
                    <h4 className="font-semibold text-foreground text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground mb-8">Company Details</h2>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Registered Name</p>
                  <p className="font-semibold text-foreground">Elismet Ltd</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Company Number</p>
                  <p className="font-semibold text-foreground">16433590</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Incorporated</p>
                  <p className="font-semibold text-foreground">7 May 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Type</p>
                  <p className="font-semibold text-foreground">Private Limited Company</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground mb-1">Headquarters</p>
                  <p className="font-semibold text-foreground">
                    Office 12611, 182-184 High Street North, East Ham, London, E6 2JA
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Director & Founder</p>
                  <p className="font-semibold text-foreground">Md Rabiullah</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Contact</p>
                  <p className="font-semibold text-foreground">contact@elismet.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's build something together.
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Whether you need a custom platform, an AI integration, or want to learn more about DocWise — we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact-direct">
                <Button size="lg" className="rounded-full px-8">
                  Contact Us
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Visit DocWise.pro
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
