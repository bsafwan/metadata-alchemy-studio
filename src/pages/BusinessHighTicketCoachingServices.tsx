import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Zap, 
  Target, 
  Calendar, 
  MessageSquare, 
  BarChart3,
  Workflow,
  CheckCircle,
  Star,
  ArrowRight,
  PlayCircle,
  Sparkles
} from 'lucide-react';

const BusinessHighTicketCoachingServices = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const automationFeatures = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Client Onboarding",
      description: "Automated intake forms, assessments, and welcome sequences",
      value: "90% Time Saved"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Smart Scheduling",
      description: "AI-powered calendar management and meeting automation",
      value: "Zero Back & Forth"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "Client Communication",
      description: "Automated follow-ups, check-ins, and progress updates",
      value: "24/7 Engagement"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Progress Tracking",
      description: "Automated reporting and milestone celebrations",
      value: "Real-Time Insights"
    },
    {
      icon: <Workflow className="w-8 h-8 text-primary" />,
      title: "Payment Processing",
      description: "Automated invoicing, reminders, and collections",
      value: "100% Automated"
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Goal Management",
      description: "Automated goal setting, tracking, and adjustments",
      value: "Higher Success Rate"
    }
  ];

  const transformationStats = [
    { number: "500%", label: "Revenue Increase", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "80%", label: "Time Saved", icon: <Clock className="w-6 h-6" /> },
    { number: "10X", label: "Client Capacity", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Elismet
            </Link>
            <Link to="/contact-direct">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center scroll-reveal">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Revolutionary Coaching Automation</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Scale Your Coaching
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Without the Overwhelm
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Automate everything except the coaching. Our AI-powered system handles client onboarding, 
              scheduling, payments, and follow-ups so you can focus on what you do best.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact-direct">
                <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                  <PlayCircle className="w-6 h-6 mr-2" />
                  See Live Demo
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Zap className="w-6 h-6 mr-2" />
                Free Setup Included
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 scroll-reveal">
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="bg-background rounded-xl p-6 shadow-lg border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Client Onboarded</p>
                          <p className="text-sm text-muted-foreground">Automatically</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-6 shadow-lg border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Sessions Scheduled</p>
                          <p className="text-sm text-muted-foreground">No back & forth</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-background rounded-xl p-6 shadow-lg border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Progress Tracked</p>
                          <p className="text-sm text-muted-foreground">Real-time insights</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-6 shadow-lg border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Follow-ups Sent</p>
                          <p className="text-sm text-muted-foreground">24/7 engagement</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-background rounded-xl p-6 shadow-lg border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Workflow className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Payments Processed</p>
                          <p className="text-sm text-muted-foreground">100% automated</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-6 shadow-lg border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Target className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Goals Achieved</p>
                          <p className="text-sm text-muted-foreground">Higher success rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Proven Results for High-Ticket Coaches
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join hundreds of coaches who've transformed their practice with our automation platform
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 scroll-reveal">
            {transformationStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Every Coaching Task
              <span className="block text-primary">Automated Perfectly</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Focus on coaching while our AI handles everything else
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {automationFeatures.map((feature, index) => (
              <div key={index} className="scroll-reveal group">
                <div className="bg-background rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-primary/10 rounded-xl p-3">
                      {feature.icon}
                    </div>
                    <div className="bg-primary/5 px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-primary">{feature.value}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="bg-destructive/5 border-l-4 border-destructive p-8 rounded-r-xl">
                <h3 className="text-2xl font-bold mb-6 text-destructive">Without Automation</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-destructive text-sm">✗</span>
                    </div>
                    <span>Spending 60% of time on admin tasks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-destructive text-sm">✗</span>
                    </div>
                    <span>Manual scheduling back-and-forth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-destructive text-sm">✗</span>
                    </div>
                    <span>Chasing clients for payments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-destructive text-sm">✗</span>
                    </div>
                    <span>Limited to 10-15 clients maximum</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-destructive text-sm">✗</span>
                    </div>
                    <span>Inconsistent follow-up and engagement</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="scroll-reveal">
              <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-r-xl">
                <h3 className="text-2xl font-bold mb-6 text-primary">With Our Automation</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>90% more time for actual coaching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>Instant, intelligent scheduling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>Automated payment processing & reminders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>Scale to 100+ clients effortlessly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span>24/7 client engagement & support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
            Ready to 10X Your
            <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Coaching Business?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the automation revolution. Setup is completely free, results are guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link to="/contact-direct">
              <Button size="lg" className="text-xl px-12 py-8 bg-primary hover:bg-primary/90">
                <Sparkles className="w-6 h-6 mr-3" />
                Get Your Free Setup
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-semibold text-lg">100% Free Setup</p>
              <p className="text-muted-foreground">No hidden costs</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-semibold text-lg">AI Setup Included</p>
              <p className="text-muted-foreground">Ready in 24 hours</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-semibold text-lg">Results Guaranteed</p>
              <p className="text-muted-foreground">Or money back</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessHighTicketCoachingServices;