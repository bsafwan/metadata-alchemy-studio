
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ScrollToTopButton from '@/components/ScrollToTop';
import { ArrowRight, CheckCircle, Upload, FileText, Shield, Globe, Star, Mail, Phone, Zap, Clock, BarChart3, Scale, Users, Building2, Briefcase, Home, FileCheck, AlertTriangle, Layers, BookTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import docwiseLogo from '@/assets/docwise-logo.png';

const Index = () => {
  const { user } = useAuth();

  useEffect(() => {
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

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-44 pb-24 md:pb-36 overflow-hidden bg-gradient-to-br from-[hsl(220,30%,8%)] via-[hsl(220,25%,12%)] to-[hsl(230,30%,15%)]">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(210,90%,55%)]/10 rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(250,80%,60%)]/8 rounded-full filter blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(210,80%,50%)]/5 rounded-full filter blur-[150px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-10 scroll-reveal">
              <img src={docwiseLogo} alt="DocWise.pro" className="h-20 md:h-28" />
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2 bg-[hsl(210,80%,50%)]/10 border border-[hsl(210,80%,50%)]/20 rounded-full text-[hsl(210,80%,80%)] text-sm font-medium mb-8 scroll-reveal">
              <div className="w-2 h-2 bg-[hsl(140,70%,50%)] rounded-full animate-pulse"></div>
              Now in Beta — Early Access Open
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight scroll-reveal">
              Legal intelligence,
              <br />
              <span className="bg-gradient-to-r from-[hsl(210,90%,65%)] to-[hsl(250,80%,70%)] bg-clip-text text-transparent">
                simplified.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[hsl(220,15%,65%)] mb-12 max-w-3xl mx-auto leading-relaxed scroll-reveal">
              Upload any contract. Get instant risk analysis, AI-drafted documents, and reusable templates — across multiple jurisdictions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 scroll-reveal">
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[hsl(210,80%,55%)] hover:bg-[hsl(210,80%,60%)] text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-[hsl(210,80%,55%)]/25 hover:shadow-xl transition-all duration-300 group">
                  Open Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="border-[hsl(220,20%,30%)] text-white hover:bg-[hsl(220,20%,20%)] px-8 py-4 text-lg rounded-xl">
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto scroll-reveal">
              {[
                { value: "500+", label: "Documents Analyzed" },
                { value: "<2min", label: "Average Scan Time" },
                { value: "5+", label: "Jurisdictions Covered" },
                { value: "99.2%", label: "Clause Detection Rate" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[hsl(220,20%,15%)]/60 backdrop-blur border border-[hsl(220,20%,25%)] rounded-2xl p-6">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[hsl(220,15%,55%)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-[hsl(220,20%,98%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4 scroll-reveal">How it works</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 scroll-reveal">
              Three steps. Zero complexity.
            </h2>
          </div>

          <div className="max-w-6xl mx-auto space-y-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-reveal">
              <div>
                <div className="text-6xl font-black text-[hsl(210,80%,55%)]/15 mb-4">01</div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Upload & Scan</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Drop any contract — PDF, DOCX, or plain text. Our AI scans every clause, flags risks, and maps issues to your jurisdiction in under two minutes.
                </p>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[hsl(210,80%,55%)] font-medium hover:underline">
                  Go to Scanner <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
              <div className="bg-[hsl(220,30%,10%)] rounded-2xl p-6 border border-[hsl(220,20%,20%)] shadow-2xl">
                <div className="flex items-center gap-2 text-[hsl(220,15%,50%)] text-xs mb-4 font-mono">
                  <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,50%)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[hsl(45,90%,55%)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[hsl(140,60%,45%)]"></div>
                  <span className="ml-2">analysis.docwise</span>
                </div>
                <div className="border-2 border-dashed border-[hsl(220,20%,25%)] rounded-xl p-8 text-center mb-4">
                  <Upload className="w-10 h-10 text-[hsl(210,80%,55%)] mx-auto mb-3" />
                  <p className="text-white font-medium">Drop your contract here</p>
                  <p className="text-[hsl(220,15%,45%)] text-sm">PDF, DOCX, or plain text</p>
                </div>
                <div className="bg-[hsl(220,25%,14%)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[hsl(45,90%,55%)] text-sm font-medium">Risk Assessment</span>
                    <span className="text-[hsl(0,70%,60%)] text-xs bg-[hsl(0,70%,60%)]/10 px-2 py-1 rounded">3 issues found</span>
                  </div>
                  <div className="space-y-2">
                    {["Liability §4.2", "Termination §7", "IP Rights §9"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[hsl(220,15%,60%)] text-sm">
                        <AlertTriangle className="w-3 h-3 text-[hsl(45,90%,55%)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-reveal">
              <div className="md:order-2">
                <div className="text-6xl font-black text-[hsl(210,80%,55%)]/15 mb-4">02</div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Draft with AI</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Generate complete legal documents from scratch. AI builds each clause block-by-block, with jurisdiction-aware language you can edit inline.
                </p>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[hsl(210,80%,55%)] font-medium hover:underline">
                  Go to Drafter <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
              <div className="bg-[hsl(220,30%,10%)] rounded-2xl p-6 border border-[hsl(220,20%,20%)] shadow-2xl md:order-1">
                <div className="flex items-center gap-2 text-[hsl(220,15%,50%)] text-xs mb-4 font-mono">
                  <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,50%)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[hsl(45,90%,55%)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[hsl(140,60%,45%)]"></div>
                  <span className="ml-2">draft.docwise</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-[hsl(210,80%,55%)]/10 rounded-lg p-3 border-l-2 border-[hsl(210,80%,55%)]">
                    <p className="text-white font-medium text-sm">Non-Disclosure Agreement</p>
                  </div>
                  {["1. Definitions", "2. Confidential Information", "3. Obligations"].map((item, i) => (
                    <div key={item} className="bg-[hsl(220,25%,14%)] rounded-lg p-3 flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[hsl(140,60%,45%)]' : i === 1 ? 'bg-[hsl(210,80%,55%)]' : 'bg-[hsl(220,15%,40%)]'}`}></div>
                      <span className="text-[hsl(220,15%,65%)] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center scroll-reveal">
              <div>
                <div className="text-6xl font-black text-[hsl(210,80%,55%)]/15 mb-4">03</div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Template & Reuse</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Turn any document into a smart template with auto-detected placeholders. Fill it out like a form and generate ready-to-sign documents instantly.
                </p>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[hsl(210,80%,55%)] font-medium hover:underline">
                  Browse templates <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
              <div className="bg-[hsl(220,30%,10%)] rounded-2xl p-6 border border-[hsl(220,20%,20%)] shadow-2xl">
                <div className="flex items-center gap-2 text-[hsl(220,15%,50%)] text-xs mb-4 font-mono">
                  <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,50%)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[hsl(45,90%,55%)]"></div>
                  <div className="w-3 h-3 rounded-full bg-[hsl(140,60%,45%)]"></div>
                  <span className="ml-2">template.docwise</span>
                </div>
                <p className="text-[hsl(220,15%,55%)] text-xs mb-4">Fill your template</p>
                <div className="space-y-3 mb-4">
                  <div className="bg-[hsl(220,25%,14%)] rounded-lg p-3">
                    <p className="text-[hsl(220,15%,45%)] text-xs mb-1">Company Name</p>
                    <p className="text-white text-sm">Acme Corp</p>
                  </div>
                  <div className="bg-[hsl(220,25%,14%)] rounded-lg p-3">
                    <p className="text-[hsl(220,15%,45%)] text-xs mb-1">Effective Date</p>
                    <p className="text-white text-sm">2025-03-01</p>
                  </div>
                  <div className="bg-[hsl(220,25%,14%)] rounded-lg p-3">
                    <p className="text-[hsl(220,15%,45%)] text-xs mb-1">Governing Law</p>
                    <div className="w-full h-2 bg-[hsl(220,20%,20%)] rounded-full mt-1">
                      <div className="w-3/4 h-full bg-[hsl(210,80%,55%)] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[hsl(210,80%,55%)] text-white rounded-lg py-2.5 text-sm font-medium">
                  Generate Document
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4 scroll-reveal">Workflow</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 scroll-reveal">
              From upload to export in minutes.
            </h2>
            <p className="text-muted-foreground text-lg scroll-reveal">
              Every step is designed to reduce the time you spend on contract review, so you can focus on the decisions that matter.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-0 scroll-reveal">
            {[
              { step: "01", title: "Upload any contract", desc: "PDF, DOCX, or paste plain text. No formatting requirements." },
              { step: "02", title: "AI analyses every clause", desc: "Risk scoring, jurisdiction mapping, missing provisions flagged." },
              { step: "03", title: "Get actionable output", desc: "Annotated document, signing risk report, and suggested clause edits." },
              { step: "04", title: "Export or template it", desc: "Download as PDF/DOCX or convert into a reusable smart template." },
            ].map((item, i) => (
              <div key={item.step} className="flex gap-6 items-start group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[hsl(210,80%,55%)]/10 border-2 border-[hsl(210,80%,55%)]/30 flex items-center justify-center text-[hsl(210,80%,55%)] font-bold text-sm group-hover:bg-[hsl(210,80%,55%)] group-hover:text-white transition-all duration-300">
                    {item.step}
                  </div>
                  {i < 3 && <div className="w-0.5 h-16 bg-[hsl(210,80%,55%)]/20"></div>}
                </div>
                <div className="pb-12">
                  <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 md:py-32 bg-[hsl(220,30%,8%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4 scroll-reveal">Why Docwise</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 scroll-reveal">
              Stop paying for hours.<br />Start paying for answers.
            </h2>
            <p className="text-[hsl(220,15%,55%)] text-lg scroll-reveal">
              See how Docwise compresses days of manual legal work into minutes of automated intelligence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto scroll-reveal">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[hsl(220,20%,20%)]">
                  <th className="text-left py-4 px-4 text-[hsl(220,15%,50%)] font-medium text-sm">Task</th>
                  <th className="text-left py-4 px-4 text-[hsl(220,15%,50%)] font-medium text-sm">Manual Process</th>
                  <th className="text-left py-4 px-4 text-[hsl(210,80%,55%)] font-medium text-sm">With Docwise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Review a 20-page NDA", "2–4 hours", "Under 2 minutes"],
                  ["Draft a service agreement", "1–2 days", "5 minutes"],
                  ["Create a reusable template", "Custom dev work", "One click"],
                  ["Check jurisdiction compliance", "Hire local counsel", "Built-in"],
                ].map(([task, manual, docwise]) => (
                  <tr key={task} className="border-b border-[hsl(220,20%,18%)] hover:bg-[hsl(220,25%,12%)] transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{task}</td>
                    <td className="py-4 px-4 text-[hsl(0,60%,60%)]">{manual}</td>
                    <td className="py-4 px-4 text-[hsl(140,60%,55%)] font-medium">{docwise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-32 bg-[hsl(220,20%,98%)]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4 scroll-reveal">Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground scroll-reveal">
              Built for real legal work.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: AlertTriangle, title: "Issue Detection", desc: "Detects illegal clauses, missing provisions, and jurisdiction conflicts — automatically." },
              { icon: Shield, title: "Signing Risk", desc: "Understand who benefits and who's exposed before you sign anything." },
              { icon: Layers, title: "Smart Templates", desc: "Turn any document into a reusable questionnaire with auto-placeholders." },
              { icon: Globe, title: "5+ Jurisdictions", desc: "Multi-jurisdiction analysis built in. More added every month." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 scroll-reveal group">
                <div className="w-12 h-12 bg-[hsl(210,80%,55%)]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[hsl(210,80%,55%)]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-[hsl(210,80%,55%)] font-semibold text-sm uppercase tracking-widest mb-4 scroll-reveal">Industries</p>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 scroll-reveal">
              Built for how you work.
            </h2>
            <p className="text-muted-foreground text-lg scroll-reveal">
              Every industry has its own contract pain. Here's how Docwise solves yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Briefcase,
                title: "Freelancers & Agencies",
                subtitle: "Stop signing what you don't understand.",
                points: [
                  "Scan client contracts for unfair IP assignment, payment terms, and liability traps",
                  "Draft your own service agreements, NDAs, and SOWs from jurisdiction-aware templates",
                  "Share contracts with clients via secure links for review and e-signature prep"
                ]
              },
              {
                icon: Users,
                title: "HR & People Operations",
                subtitle: "Employment contracts at the speed of hiring.",
                points: [
                  "Bulk-analyze offer letters, employment agreements, and contractor terms for compliance gaps",
                  "Generate role-specific contracts with auto-filled placeholders — salary, start date, benefits",
                  "Ensure jurisdiction compliance across states or countries for distributed teams"
                ]
              },
              {
                icon: Home,
                title: "Real Estate",
                subtitle: "Never miss a clause in a lease or purchase agreement.",
                points: [
                  "Analyze lease agreements, purchase contracts, and property management terms for hidden liabilities",
                  "Flag non-standard clauses like escalation triggers, early termination penalties, and maintenance obligations",
                  "Generate templated agreements for recurring deal types"
                ]
              },
              {
                icon: Building2,
                title: "Business Operations",
                subtitle: "Scale your contract workflow without scaling your legal team.",
                points: [
                  "Standardize vendor agreements, partnership contracts, and SaaS terms across your organization",
                  "Create a template library your ops team can fill out without legal review for routine contracts",
                  "Track signing risk across all active agreements"
                ]
              }
            ].map(({ icon: Icon, title, subtitle, points }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 scroll-reveal group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(210,80%,55%)]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[hsl(210,80%,55%)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{title}</h3>
                    <p className="text-[hsl(210,80%,55%)] text-sm font-medium">{subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {points.map((point, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground text-sm leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-[hsl(140,60%,45%)] mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[hsl(210,80%,55%)] font-medium text-sm hover:underline">
                  Open Dashboard <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-[hsl(220,30%,8%)] via-[hsl(220,25%,12%)] to-[hsl(230,30%,15%)] relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[hsl(210,90%,55%)]/8 rounded-full filter blur-[100px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img src={docwiseLogo} alt="DocWise" className="h-14 mx-auto mb-8 scroll-reveal" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 scroll-reveal">
              Ready to simplify your legal workflow?
            </h2>
            <p className="text-[hsl(220,15%,60%)] text-lg mb-10 scroll-reveal">
              Join hundreds of professionals already using Docwise to review, draft, and manage contracts faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal">
              <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[hsl(210,80%,55%)] hover:bg-[hsl(210,80%,60%)] text-white px-8 py-4 text-lg rounded-xl shadow-lg shadow-[hsl(210,80%,55%)]/25">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Link to="/schedule">
                <Button size="lg" variant="outline" className="border-[hsl(220,20%,30%)] text-white hover:bg-[hsl(220,20%,20%)] px-8 py-4 text-lg rounded-xl">
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Footer */}
      <footer className="bg-[hsl(220,30%,6%)] border-t border-[hsl(220,20%,15%)] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <Link to="/">
                  <img
                    src="/lovable-uploads/da624388-20e3-4737-b773-3851cb8290f9.png"
                    alt="Elismet LTD"
                    className="h-10 hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
              <p className="text-[hsl(220,15%,50%)] text-sm leading-relaxed mb-4 max-w-sm">
                Elismet LTD — Private Limited Company<br />
                Company Number: 16433590<br />
                Incorporated: 7 May 2025
              </p>
              <p className="text-[hsl(220,15%,40%)] text-sm">
                Office 12611, 182-184 High Street North<br />
                East Ham, London, United Kingdom, E6 2JA
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-3">
                <a href="https://docwise.pro" target="_blank" rel="noopener noreferrer" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">DocWise.pro</a>
                <Link to="/schedule" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">Book a Demo</Link>
                <Link to="/contact-direct" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-3">
                <Link to="/about" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">About</Link>
                <Link to="/author" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">Team</Link>
                <Link to="/apply" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">Careers</Link>
                <Link to="/privacy-policy" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">Privacy Policy</Link>
                <Link to="/terms-of-service" className="block text-[hsl(220,15%,50%)] hover:text-white transition-colors text-sm">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-[hsl(220,20%,15%)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[hsl(220,15%,40%)] text-sm">
              &copy; {new Date().getFullYear()} Elismet LTD. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[hsl(220,15%,40%)] text-sm">
              <a href="mailto:contact@elismet.com" className="hover:text-white transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> contact@elismet.com
              </a>
              <span>•</span>
              <span>elismet.com</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
