
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, Sparkles, Globe, Scale, Shield, Zap, Clock, BarChart3, Users, Building2, Mail, Phone, MapPin, ExternalLink, TrendingUp, Target, Lightbulb, Rocket, Code, Brain, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import docwiseLogo from '@/assets/docwise-logo.png';

const Index = () => {
  const { user } = useAuth();
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setLogoAnimated(true), 300);

    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          element.classList.add('revealed');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero — Elismet is Building DocWise */}
      <section className="relative pt-32 md:pt-44 pb-28 md:pb-40 overflow-hidden bg-gradient-to-br from-[hsl(220,35%,6%)] via-[hsl(225,30%,10%)] to-[hsl(230,25%,14%)]">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-[10%] w-80 h-80 bg-[hsl(210,100%,50%)]/8 rounded-full filter blur-[120px]"></div>
          <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-[hsl(260,70%,55%)]/6 rounded-full filter blur-[140px]"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[hsl(170,60%,40%)]/4 rounded-full filter blur-[160px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Logo Pairing */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12">
              <div className={`transition-all duration-1000 ${logoAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <img
                  src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png"
                  alt="Elismet LTD"
                  className="h-14 md:h-20"
                />
              </div>

              <div className={`transition-all duration-1000 delay-500 ${logoAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="flex items-center gap-2 text-[hsl(220,15%,40%)]">
                  <div className="w-8 h-0.5 bg-[hsl(210,80%,55%)]"></div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-[hsl(210,80%,65%)]">is building</span>
                  <div className="w-8 h-0.5 bg-[hsl(210,80%,55%)]"></div>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-700 ${logoAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                <img src={docwiseLogo} alt="DocWise.pro" className="h-14 md:h-20" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[hsl(140,60%,45%)]/10 border border-[hsl(140,60%,45%)]/20 rounded-full text-[hsl(140,60%,65%)] text-sm font-medium mb-8 scroll-reveal">
              <div className="w-2 h-2 bg-[hsl(140,60%,50%)] rounded-full animate-pulse"></div>
              Currently in Active Development
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight scroll-reveal">
              We're building the future of
              <br />
              <span className="bg-gradient-to-r from-[hsl(210,90%,65%)] via-[hsl(250,70%,70%)] to-[hsl(170,60%,55%)] bg-clip-text text-transparent">
                legal intelligence.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[hsl(220,15%,60%)] mb-12 max-w-3xl mx-auto leading-relaxed scroll-reveal">
              Elismet LTD is developing <strong className="text-white">DocWise.pro</strong> — an AI-powered platform that transforms how businesses handle contracts, compliance, and legal documents. Here's our journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center scroll-reveal">
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[hsl(210,80%,55%)] hover:bg-[hsl(210,80%,60%)] text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-[hsl(210,80%,55%)]/25 group">
                  Visit DocWise.pro
                  <ExternalLink className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="border-[hsl(220,20%,25%)] text-white hover:bg-[hsl(220,20%,15%)] px-8 py-4 text-lg rounded-xl">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Elismet */}
      <section className="py-24 md:py-32 bg-[hsl(220,20%,98%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">
                A UK-registered technology company on a mission.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Elismet LTD is a private limited company incorporated in London, focused on building intelligent software that solves real business problems through AI and automation.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our flagship product, <strong className="text-foreground">DocWise.pro</strong>, is being built to democratise access to legal intelligence — making contract analysis, risk detection, and document generation accessible to every business, not just those with deep legal budgets.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[hsl(210,80%,55%)]/10 text-[hsl(210,80%,55%)] rounded-full text-sm font-medium">AI-Powered</span>
                <span className="px-4 py-2 bg-[hsl(260,70%,55%)]/10 text-[hsl(260,70%,55%)] rounded-full text-sm font-medium">LegalTech</span>
                <span className="px-4 py-2 bg-[hsl(170,60%,40%)]/10 text-[hsl(170,60%,40%)] rounded-full text-sm font-medium">SaaS</span>
                <span className="px-4 py-2 bg-[hsl(35,90%,55%)]/10 text-[hsl(35,90%,55%)] rounded-full text-sm font-medium">UK Based</span>
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-[hsl(220,20%,92%)]">
                <div className="flex items-center gap-3 mb-8">
                  <Building2 className="w-6 h-6 text-[hsl(210,80%,55%)]" />
                  <h3 className="text-xl font-bold text-foreground">Company Details</h3>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "Company Name", value: "Elismet LTD" },
                    { label: "Type", value: "Private Limited Company" },
                    { label: "Incorporated", value: "7 May 2025" },
                    { label: "Company Number", value: "16433590" },
                    { label: "Director & Founder", value: "Md Rabiullah" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-start border-b border-[hsl(220,20%,94%)] pb-4 last:border-0 last:pb-0">
                      <span className="text-muted-foreground text-sm">{item.label}</span>
                      <span className="text-foreground font-semibold text-sm text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[hsl(220,20%,92%)]">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-4 h-4 text-[hsl(210,80%,55%)] mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">Office 12611, 182-184 High Street North, East Ham, London, E6 2JA</p>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-4 h-4 text-[hsl(210,80%,55%)] shrink-0" />
                    <a href="mailto:contact@elismet.com" className="text-sm text-[hsl(210,80%,55%)] hover:underline">contact@elismet.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[hsl(210,80%,55%)] shrink-0" />
                    <a href="https://elismet.com" className="text-sm text-[hsl(210,80%,55%)] hover:underline">elismet.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is DocWise */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4">The Product</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              What is DocWise.pro?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              An AI legal intelligence platform that lets anyone upload a contract and get instant risk analysis, AI-drafted documents, and reusable templates — across multiple jurisdictions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Risk Detection", desc: "Identifies illegal clauses, missing provisions, and jurisdiction conflicts automatically.", color: "hsl(0,70%,55%)" },
              { icon: FileText, title: "AI Drafting", desc: "Generate complete legal documents clause-by-clause with jurisdiction-aware language.", color: "hsl(210,80%,55%)" },
              { icon: Zap, title: "Under 2 Minutes", desc: "Analyse a 20-page NDA in under two minutes — what used to take hours.", color: "hsl(45,90%,50%)" },
              { icon: Globe, title: "5+ Jurisdictions", desc: "Multi-jurisdiction analysis built in, with more being added every month.", color: "hsl(170,60%,40%)" },
              { icon: Scale, title: "Signing Risk", desc: "Understand who benefits and who's exposed before anyone signs.", color: "hsl(260,70%,55%)" },
              { icon: Code, title: "Smart Templates", desc: "Turn any document into a reusable questionnaire with auto-detected placeholders.", color: "hsl(35,90%,55%)" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-[hsl(220,20%,92%)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 scroll-reveal">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.color}15` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 scroll-reveal">
            <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[hsl(210,80%,55%)] hover:bg-[hsl(210,80%,60%)] text-white px-8 rounded-xl group">
                Explore DocWise.pro <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How We're Using AI */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[hsl(220,35%,6%)] via-[hsl(225,30%,10%)] to-[hsl(230,25%,14%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-[hsl(210,80%,65%)] font-semibold text-sm uppercase tracking-widest mb-4">Our AI Stack</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              How we're using AI to empower legal systems
            </h2>
            <p className="text-[hsl(220,15%,55%)] text-lg">
              Behind DocWise is a proprietary AI pipeline built to understand legal language at clause level — not just keyword matching.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              { icon: Brain, title: "Natural Language Processing", desc: "Our models understand legal semantics — party obligations, liability scope, termination triggers — not just surface text.", step: "01" },
              { icon: Shield, title: "Clause-Level Risk Scoring", desc: "Every clause gets a risk score based on jurisdiction, industry norms, and precedent patterns. High-risk items surface instantly.", step: "02" },
              { icon: Globe, title: "Jurisdiction Mapping", desc: "Contracts are automatically analysed against the relevant jurisdiction's legal framework — UK, US, EU, and expanding.", step: "03" },
              { icon: Sparkles, title: "Generative Drafting", desc: "AI doesn't just read — it writes. Full contract drafts, clause suggestions, and amendment recommendations in seconds.", step: "04" },
            ].map((item) => (
              <div key={item.title} className="bg-[hsl(220,25%,12%)]/80 backdrop-blur border border-[hsl(220,20%,20%)] rounded-2xl p-8 hover:border-[hsl(210,80%,55%)]/30 transition-all duration-300 scroll-reveal">
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-3xl font-black text-[hsl(210,80%,55%)]/20">{item.step}</div>
                  <div className="w-10 h-10 rounded-lg bg-[hsl(210,80%,55%)]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[hsl(210,80%,65%)]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[hsl(220,15%,55%)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="py-24 md:py-32 bg-[hsl(220,20%,98%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4">Target Market</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Who we're building for
            </h2>
            <p className="text-muted-foreground text-lg">
              DocWise is designed for businesses that deal with contracts daily but can't afford full-time legal teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Users, title: "Freelancers & Agencies", desc: "Stop signing contracts you don't fully understand.", stat: "2.1M+", statLabel: "UK freelancers" },
              { icon: Building2, title: "SMBs & Startups", desc: "Scale operations without scaling legal costs.", stat: "5.5M+", statLabel: "UK small businesses" },
              { icon: Target, title: "HR Teams", desc: "Employment contracts at the speed of hiring.", stat: "£4.2B", statLabel: "HR tech market" },
              { icon: Scale, title: "Real Estate", desc: "Never miss a clause in lease agreements.", stat: "1.8M+", statLabel: "transactions/year" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-[hsl(220,20%,92%)] hover:shadow-xl transition-all duration-300 scroll-reveal group">
                <div className="w-12 h-12 rounded-xl bg-[hsl(210,80%,55%)]/10 flex items-center justify-center mb-5 group-hover:bg-[hsl(210,80%,55%)] group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6 text-[hsl(210,80%,55%)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{item.desc}</p>
                <div className="border-t border-[hsl(220,20%,94%)] pt-4">
                  <div className="text-2xl font-black text-foreground">{item.stat}</div>
                  <div className="text-xs text-muted-foreground">{item.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4">Our Journey</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
              Building in public
            </h2>
            <p className="text-muted-foreground text-lg">
              From incorporation to product — here's how we got here.
            </p>
          </div>

          <div className="max-w-3xl mx-auto scroll-reveal">
            {[
              { date: "May 2025", title: "Elismet LTD Incorporated", desc: "Company registered in the UK as a private limited company (16433590).", icon: Building2, status: "done" },
              { date: "Jun 2025", title: "Market Research & Validation", desc: "Identified massive gap in affordable legal intelligence tools for SMBs and freelancers.", icon: Target, status: "done" },
              { date: "Jul 2025", title: "DocWise.pro Concept Finalised", desc: "Product architecture designed — AI-powered contract analysis, drafting, and templates.", icon: Lightbulb, status: "done" },
              { date: "Aug 2025", title: "Development Begins", desc: "Core AI models, clause-level NLP engine, and jurisdiction mapping pipeline under active development.", icon: Code, status: "done" },
              { date: "Q1 2026", title: "Beta Launch", desc: "Early access opened for selected businesses. Onboarding first batch of beta users.", icon: Rocket, status: "current" },
              { date: "Q3 2026", title: "Public Launch", desc: "Full product launch with multi-jurisdiction support, team features, and enterprise plans.", icon: Sparkles, status: "upcoming" },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-6 items-start group">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                    item.status === 'current'
                      ? 'bg-[hsl(210,80%,55%)] text-white shadow-lg shadow-[hsl(210,80%,55%)]/30'
                      : item.status === 'done'
                        ? 'bg-[hsl(140,60%,45%)]/15 text-[hsl(140,60%,45%)] border-2 border-[hsl(140,60%,45%)]/30'
                        : 'bg-[hsl(220,20%,92%)] text-muted-foreground border-2 border-[hsl(220,20%,88%)]'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  {i < 5 && <div className={`w-0.5 h-16 ${item.status === 'upcoming' ? 'bg-[hsl(220,20%,88%)]' : 'bg-[hsl(210,80%,55%)]/20'}`}></div>}
                </div>
                <div className="pb-12">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    item.status === 'current' ? 'text-[hsl(210,80%,55%)]' : 'text-muted-foreground'
                  }`}>{item.date}</span>
                  <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  {item.status === 'current' && (
                    <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-[hsl(210,80%,55%)]/10 text-[hsl(210,80%,55%)] rounded-full text-xs font-semibold">
                      <div className="w-1.5 h-1.5 bg-[hsl(210,80%,55%)] rounded-full animate-pulse"></div>
                      We're Here
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[hsl(210,80%,55%)] via-[hsl(220,75%,50%)] to-[hsl(250,65%,50%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 scroll-reveal">
            <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-4">Initial Traction</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Early signals, strong momentum.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto scroll-reveal">
            {[
              { value: "500+", label: "Documents analysed in beta" },
              { value: "92%", label: "Beta user satisfaction" },
              { value: "<2 min", label: "Average contract scan" },
              { value: "5+", label: "Jurisdictions supported" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-16 grid sm:grid-cols-3 gap-6 scroll-reveal">
            {[
              { icon: TrendingUp, label: "Growing waitlist of businesses wanting early access" },
              { icon: CheckCircle, label: "Positive feedback from legal professionals on accuracy" },
              { icon: BarChart3, label: "99.2% clause detection rate in testing" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 text-white/80">
                <item.icon className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <Sparkles className="w-10 h-10 text-[hsl(210,80%,55%)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight">
              Our vision: every business should have access to legal intelligence — not just the ones that can afford it.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
              We believe AI can close the gap between businesses that have legal protection and those that don't. DocWise.pro is our answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[hsl(210,80%,55%)] hover:bg-[hsl(210,80%,60%)] text-white px-8 rounded-xl group">
                  Try DocWise.pro <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="border-[hsl(220,20%,85%)] px-8 rounded-xl">
                  Schedule a Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <section className="py-20 bg-[hsl(220,30%,8%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="scroll-reveal">
              <img
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png"
                alt="Elismet LTD"
                className="h-12 mb-6"
              />
              <p className="text-[hsl(220,15%,55%)] text-sm leading-relaxed mb-4">
                Elismet LTD is a UK-registered technology company building AI-powered solutions for the legal industry.
              </p>
              <p className="text-[hsl(220,15%,45%)] text-xs">
                Company Number: 16433590
              </p>
            </div>

            <div className="scroll-reveal">
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-[hsl(220,15%,55%)] hover:text-white transition-colors text-sm">About Us</Link>
                <Link to="/contact-direct" className="block text-[hsl(220,15%,55%)] hover:text-white transition-colors text-sm">Contact</Link>
                <Link to="/schedule" className="block text-[hsl(220,15%,55%)] hover:text-white transition-colors text-sm">Schedule a Call</Link>
                <Link to="/apply" className="block text-[hsl(220,15%,55%)] hover:text-white transition-colors text-sm">Careers</Link>
                <Link to="/author" className="block text-[hsl(220,15%,55%)] hover:text-white transition-colors text-sm">Team</Link>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="block text-[hsl(210,80%,65%)] hover:text-white transition-colors text-sm">DocWise.pro ↗</a>
              </div>
            </div>

            <div className="scroll-reveal">
              <h4 className="text-white font-bold mb-4">Headquarters</h4>
              <div className="space-y-3 text-[hsl(220,15%,55%)] text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Office 12611, 182-184 High Street North, East Ham, London, E6 2JA</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a href="mailto:contact@elismet.com" className="hover:text-white transition-colors">contact@elismet.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 shrink-0" />
                  <a href="https://elismet.com" className="hover:text-white transition-colors">elismet.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[hsl(220,20%,15%)] mt-12 pt-8 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[hsl(220,15%,40%)] text-sm">
              © {new Date().getFullYear()} Elismet LTD. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-[hsl(220,15%,40%)] hover:text-white transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-[hsl(220,15%,40%)] hover:text-white transition-colors text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
