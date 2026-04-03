import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, Sparkles, Globe, Scale, Shield, Zap, Clock, BarChart3, Users, Building2, Mail, Phone, MapPin, ExternalLink, TrendingUp, Target, Lightbulb, Rocket, Code, Brain, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import docwiseLogo from '@/assets/docwise-logo.png';

const IndexLight = () => {
  const { user } = useAuth();
  const [logoAnimated, setLogoAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setLogoAnimated(true), 300);

    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.85) {
          element.classList.add('revealed', 'opacity-100', 'translate-y-0');
          element.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };
    
    // Initial setup for scroll reveal
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8'));
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafcff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />
      <ScrollToTopButton />

      {/* Hero — Elismet is Building DocWise */}
      <section className="relative pt-32 md:pt-48 pb-28 md:pb-40 overflow-hidden bg-gradient-to-b from-[#f4f7fa] via-white to-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-400/10 rounded-full filter blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-teal-400/10 rounded-full filter blur-[130px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Logo Pairing */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-14 hover:scale-[1.02] transition-transform duration-500">
              <div className={`transition-all duration-1000 ${logoAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <img
                  src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png"
                  alt="Elismet LTD"
                  className="h-14 md:h-20 drop-shadow-sm grayscale hover:grayscale-0 transition-all duration-500 opacity-90"
                />
              </div>

              <div className={`transition-all duration-1000 delay-300 ${logoAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-blue-200"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 bg-blue-50/50 px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm backdrop-blur-sm">is building</span>
                  <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-blue-200"></div>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-500 ${logoAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                <img src={docwiseLogo} alt="DocWise.pro" className="h-14 md:h-20 drop-shadow-sm" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] rounded-full text-slate-700 text-sm font-semibold mb-10 scroll-reveal hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-default">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-100">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping absolute opacity-70"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full relative z-10"></div>
              </div>
               Currently in Active Development
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 mb-8 leading-[1.08] tracking-tight scroll-reveal drop-shadow-sm">
              We're building the future of
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent relative inline-block">
                legal intelligence.
                <div className="absolute -bottom-3 left-0 right-0 h-4 bg-blue-400/20 blur-xl -z-10 rounded-full"></div>
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed scroll-reveal font-light">
              Elismet LTD is developing <strong className="text-slate-900 font-semibold">DocWise.pro</strong> — an AI-powered platform that transforms how businesses handle contracts, compliance, and legal documents. Here's our journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center scroll-reveal">
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-lg rounded-2xl shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.6)] group transition-all duration-300 hover:-translate-y-1">
                  Visit DocWise.pro
                  <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </a>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="border-slate-200 bg-white/60 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-10 py-7 text-lg rounded-2xl shadow-sm hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Elismet */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-blue-600"></span> Who We Are
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                A UK-registered technology company on a mission.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                Elismet LTD is a private limited company incorporated in London, focused on building intelligent software that solves real business problems through AI and automation.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10 font-light">
                Our flagship product, <strong className="text-slate-900 font-semibold">DocWise.pro</strong>, is being built to democratise access to legal intelligence — making contract analysis, risk detection, and document generation accessible to every business, not just those with deep legal budgets.
              </p>
              <div className="flex flex-wrap gap-3">
                {['AI-Powered', 'LegalTech', 'SaaS', 'UK Based'].map((badge, idx) => (
                  <span key={badge} className="px-5 py-2.5 bg-slate-50 border border-slate-100 shadow-sm text-slate-700 rounded-full text-sm font-semibold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[2rem] blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Building2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Company Details</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      { label: "Company Name", value: "Elismet LTD" },
                      { label: "Type", value: "Private Limited Company" },
                      { label: "Incorporated", value: "7 May 2025" },
                      { label: "Company Number", value: "16433590" },
                      { label: "Director & Founder", value: "Md Rabiullah" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center border-b border-slate-100 pb-4 last:border-0 last:pb-0 hover:bg-slate-50/50 p-2 -mx-2 rounded-lg transition-colors">
                        <span className="text-slate-500 font-medium">{item.label}</span>
                        <span className="text-slate-900 font-bold bg-slate-50 px-3 py-1 rounded-md">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                        <MapPin className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">Office 12611, 182-184 High Street North, East Ham, London, E6 2JA</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                        <Mail className="w-5 h-5 text-indigo-500" />
                      </div>
                      <a href="mailto:contact@elismet.com" className="text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">contact@elismet.com</a>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="p-2 bg-white rounded-lg shadow-sm shrink-0">
                        <Globe className="w-5 h-5 text-teal-500" />
                      </div>
                      <a href="https://elismet.com" className="text-sm font-bold text-slate-700 hover:text-teal-600 transition-colors">elismet.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What is DocWise */}
      <section className="py-24 md:py-32 bg-[#fafcff]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4 inline-flex items-center gap-2">
              The Product
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              What is DocWise.pro?
            </h2>
            <p className="text-slate-600 text-xl font-light leading-relaxed">
              An AI legal intelligence platform that lets anyone upload a contract and get instant risk analysis, AI-drafted documents, and reusable templates — across multiple jurisdictions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "Risk Detection", desc: "Identifies illegal clauses, missing provisions, and jurisdiction conflicts automatically.", color: "text-rose-500", bg: "bg-rose-50", shadow: "hover:shadow-rose-100/50", border: "hover:border-rose-200" },
              { icon: FileText, title: "AI Drafting", desc: "Generate complete legal documents clause-by-clause with jurisdiction-aware language.", color: "text-blue-500", bg: "bg-blue-50", shadow: "hover:shadow-blue-100/50", border: "hover:border-blue-200" },
              { icon: Zap, title: "Under 2 Minutes", desc: "Analyse a 20-page NDA in under two minutes — what used to take hours.", color: "text-amber-500", bg: "bg-amber-50", shadow: "hover:shadow-amber-100/50", border: "hover:border-amber-200" },
              { icon: Globe, title: "5+ Jurisdictions", desc: "Multi-jurisdiction analysis built in, with more being added every month.", color: "text-teal-500", bg: "bg-teal-50", shadow: "hover:shadow-teal-100/50", border: "hover:border-teal-200" },
              { icon: Scale, title: "Signing Risk", desc: "Understand who benefits and who's exposed before anyone signs.", color: "text-violet-500", bg: "bg-violet-50", shadow: "hover:shadow-violet-100/50", border: "hover:border-violet-200" },
              { icon: Code, title: "Smart Templates", desc: "Turn any document into a reusable questionnaire with auto-detected placeholders.", color: "text-indigo-500", bg: "bg-indigo-50", shadow: "hover:shadow-indigo-100/50", border: "hover:border-indigo-200" },
            ].map((item) => (
              <div key={item.title} className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 scroll-reveal ${item.shadow} ${item.border} group`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.bg}`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 scroll-reveal">
            <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group text-lg font-semibold">
                Explore DocWise.pro <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* How We're Using AI */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]"></div>
        <div className="absolute opacity-40 inset-0" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4">Our AI Stack</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 drop-shadow-sm">
              How we're using AI to empower legal systems
            </h2>
            <p className="text-slate-600 text-xl font-light leading-relaxed">
              Behind DocWise is a proprietary AI pipeline built to understand legal language at clause level — not just keyword matching.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
            {[
              { icon: Brain, title: "Natural Language Processing", desc: "Our models understand legal semantics — party obligations, liability scope, termination triggers — not just surface text.", step: "01" },
              { icon: Shield, title: "Clause-Level Risk Scoring", desc: "Every clause gets a risk score based on jurisdiction, industry norms, and precedent patterns. High-risk items surface instantly.", step: "02" },
              { icon: Globe, title: "Jurisdiction Mapping", desc: "Contracts are automatically analysed against the relevant jurisdiction's legal framework — UK, US, EU, and expanding.", step: "03" },
              { icon: Sparkles, title: "Generative Drafting", desc: "AI doesn't just read — it writes. Full contract drafts, clause suggestions, and amendment recommendations in seconds.", step: "04" },
            ].map((item) => (
              <div key={item.title} className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] rounded-[2.5rem] p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 scroll-reveal group relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-[-5deg]">
                      <item.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div className="text-5xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors duration-500">{item.step}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20 scroll-reveal">
            <p className="text-teal-600 font-bold text-sm uppercase tracking-widest mb-4">Target Market</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              Who we're building for
            </h2>
            <p className="text-slate-600 text-xl font-light">
              DocWise is designed for businesses that deal with contracts daily but can't afford full-time legal teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: Users, title: "Freelancers & Agencies", desc: "Stop signing contracts you don't fully understand.", stat: "2.1M+", statLabel: "UK freelancers", activeColor: "group-hover:bg-blue-600" },
              { icon: Building2, title: "SMBs & Startups", desc: "Scale operations without scaling legal costs.", stat: "5.5M+", statLabel: "UK small businesses", activeColor: "group-hover:bg-indigo-600" },
              { icon: Target, title: "HR Teams", desc: "Employment contracts at the speed of hiring.", stat: "£4.2B", statLabel: "HR tech market", activeColor: "group-hover:bg-teal-600" },
              { icon: Scale, title: "Real Estate", desc: "Never miss a clause in lease agreements.", stat: "1.8M+", statLabel: "transactions/year", activeColor: "group-hover:bg-purple-600" },
            ].map((item) => (
              <div key={item.title} className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 scroll-reveal group flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 ${item.activeColor} transition-colors duration-500`}>
                  <item.icon className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed font-light flex-grow mb-8">{item.desc}</p>
                <div className="border-t border-slate-200/60 pt-6 mt-auto">
                  <div className="text-3xl font-black text-slate-900 mb-1">{item.stat}</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{item.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-24 md:py-32 bg-[#fafcff] relative">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24 scroll-reveal">
            <p className="text-amber-600 font-bold text-sm uppercase tracking-widest mb-4">Our Journey</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              Building in public
            </h2>
            <p className="text-slate-600 text-xl font-light">
              From incorporation to product — here's how we got here.
            </p>
          </div>

          <div className="max-w-4xl mx-auto scroll-reveal">
            {[
              { date: "May 2025", title: "Elismet LTD Incorporated", desc: "Company registered in the UK as a private limited company (16433590).", icon: Building2, status: "done" },
              { date: "Jun 2025", title: "Market Research & Validation", desc: "Identified massive gap in affordable legal intelligence tools for SMBs and freelancers.", icon: Target, status: "done" },
              { date: "Jul 2025", title: "DocWise.pro Concept Finalised", desc: "Product architecture designed — AI-powered contract analysis, drafting, and templates.", icon: Lightbulb, status: "done" },
              { date: "Aug 2025", title: "Development Begins", desc: "Core AI models, clause-level NLP engine, and jurisdiction mapping pipeline under active development.", icon: Code, status: "done" },
              { date: "Q1 2026", title: "Beta Launch", desc: "Early access opened for selected businesses. Onboarding first batch of beta users.", icon: Rocket, status: "current" },
              { date: "Q3 2026", title: "Public Launch", desc: "Full product launch with multi-jurisdiction support, team features, and enterprise plans.", icon: Sparkles, status: "upcoming" },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-8 items-start group">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 z-10 ${
                    item.status === 'current'
                      ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110'
                      : item.status === 'done'
                        ? 'bg-white text-blue-600 border border-blue-100 shadow-sm'
                        : 'bg-white text-slate-400 border border-slate-200 border-dashed'
                  }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  {i < 5 && <div className={`w-[2px] h-24 my-2 rounded-full ${
                    item.status === 'upcoming' ? 'bg-slate-200 border-dashed border-l-2 border-slate-200' : 
                    item.status === 'current' ? 'bg-gradient-to-b from-blue-600 to-slate-200' : 'bg-blue-200'
                  }`}></div>}
                </div>
                <div className={`pb-12 pt-2 transition-all duration-300 ${item.status === 'current' ? 'transform translate-x-2' : ''}`}>
                  <span className={`text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3 ${
                    item.status === 'current' ? 'bg-blue-50 text-blue-700' : 
                    item.status === 'done' ? 'text-slate-500' : 'text-slate-400'
                  }`}>{item.date}</span>
                  <h3 className={`text-2xl font-bold mb-2 ${item.status === 'upcoming' ? 'text-slate-500' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-lg font-light leading-relaxed max-w-2xl ${item.status === 'upcoming' ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
                  {item.status === 'current' && (
                    <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white border border-blue-100 shadow-sm text-blue-700 rounded-full text-sm font-bold shadow-blue-100/50">
                      <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                      </div>
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
      <section className="py-24 md:py-32 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full filter blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full filter blur-[150px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16 scroll-reveal">
            <p className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4">Initial Traction</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Early signals, strong momentum.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto scroll-reveal">
            {[
              { value: "500+", label: "Documents analysed in beta" },
              { value: "92%", label: "Beta user satisfaction" },
              { value: "<2 min", label: "Average contract scan" },
              { value: "5+", label: "Jurisdictions supported" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter">{stat.value}</div>
                <div className="text-sm font-medium text-slate-300 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-8 scroll-reveal bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            {[
              { icon: TrendingUp, label: "Growing waitlist of businesses wanting early access" },
              { icon: CheckCircle, label: "Positive feedback from legal professionals on accuracy" },
              { icon: BarChart3, label: "99.2% clause detection rate in testing" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 text-slate-200">
                <div className="p-2 bg-white/10 rounded-lg shrink-0">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-base leading-relaxed font-light">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center scroll-reveal">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-sm border border-blue-100">
               <Sparkles className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-10 leading-[1.1] tracking-tight">
              Our vision: every business should have access to legal intelligence — not just the ones that can afford it.
            </h2>
            <p className="text-slate-600 text-xl md:text-2xl font-light leading-relaxed mb-12 max-w-4xl mx-auto">
              We believe AI can close the gap between businesses that have legal protection and those that don't. <strong className="text-slate-900 font-semibold">DocWise.pro</strong> is our answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-8 text-lg rounded-2xl shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] group transition-all duration-300 hover:-translate-y-1">
                  Try DocWise.pro <ExternalLink className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </a>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-10 py-8 text-lg rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  Schedule a Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer className="py-24 bg-[#f8fafc] border-t border-slate-200">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 lg:gap-16">
            <div className="md:col-span-2 scroll-reveal">
              <img
                src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png"
                alt="Elismet LTD"
                className="h-10 mb-8 grayscale hover:grayscale-0 transition-all duration-300"
              />
              <p className="text-slate-500 text-base font-light leading-relaxed mb-6 max-w-md">
                Elismet LTD is a UK-registered technology company building AI-powered solutions for the legal industry.
              </p>
              <div className="bg-white inline-block px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                <p className="text-slate-800 text-sm font-bold">
                  Company Number: <span className="font-medium text-slate-600">16433590</span>
                </p>
              </div>
            </div>

            <div className="scroll-reveal">
              <h4 className="text-slate-900 font-bold mb-6 text-lg">Quick Links</h4>
              <div className="space-y-4">
                <Link to="/about" className="block text-slate-500 hover:text-blue-600 transition-colors font-medium">About Us</Link>
                <Link to="/contact-direct" className="block text-slate-500 hover:text-blue-600 transition-colors font-medium">Contact</Link>
                <Link to="/schedule" className="block text-slate-500 hover:text-blue-600 transition-colors font-medium">Schedule a Call</Link>
                <Link to="/apply" className="block text-slate-500 hover:text-blue-600 transition-colors font-medium">Careers</Link>
                <Link to="/author" className="block text-slate-500 hover:text-blue-600 transition-colors font-medium">Team</Link>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition-colors mt-2">
                  DocWise.pro <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="scroll-reveal">
              <h4 className="text-slate-900 font-bold mb-6 text-lg">Headquarters</h4>
              <div className="space-y-5 text-slate-500 font-light">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm shrink-0 border border-slate-100">
                    <MapPin className="w-4 h-4 text-slate-700" />
                  </div>
                  <p className="pt-1">Office 12611, 182-184 High Street North, East Ham, London, E6 2JA</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm shrink-0 border border-slate-100">
                    <Mail className="w-4 h-4 text-slate-700" />
                  </div>
                  <a href="mailto:contact@elismet.com" className="hover:text-blue-600 transition-colors font-medium">contact@elismet.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm shrink-0 border border-slate-100">
                    <Globe className="w-4 h-4 text-slate-700" />
                  </div>
                  <a href="https://elismet.com" className="hover:text-blue-600 transition-colors font-medium">elismet.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} Elismet LTD. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexLight;
