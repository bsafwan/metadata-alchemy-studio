import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Users, DollarSign, Video, Image as ImageIcon, MessageSquare, Target, Zap, CheckCircle, Play, BarChart3, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SocialEngagementsForBusinessCoach = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: "4.2x", label: "Avg. ROI on Video Content", icon: Video },
    { number: "67%", label: "Engagement to Inquiry Rate", icon: MessageSquare },
    { number: "43%", label: "Inquiry to Client Conversion", icon: Users },
    { number: "28.9%", label: "Final Engagement-to-Client Rate", icon: Target },
  ];

  const problems = [
    "Spending hours creating content that gets ignored",
    "Low engagement despite consistent posting",
    "Can't convert followers into paying clients",
    "Missing the right audience for your coaching",
    "Inconsistent content quality hurting brand",
  ];

  const solutions = [
    { 
      title: "Professional Video Edits", 
      desc: "30-sec free test edit included",
      icon: Video,
      visual: "🎬"
    },
    { 
      title: "High-Converting Flyers", 
      desc: "Designed to stop the scroll",
      icon: ImageIcon,
      visual: "🎨"
    },
    { 
      title: "Engagement Funnels", 
      desc: "Turn views into clients",
      icon: TrendingUp,
      visual: "📈"
    },
    { 
      title: "Content Strategy", 
      desc: "Post what converts, not what's popular",
      icon: Target,
      visual: "🎯"
    },
  ];

  const testimonials = [
    { name: "Sarah Mitchell", role: "Business Coach", result: "3x client base in 90 days", rating: 5 },
    { name: "James Rodriguez", role: "Leadership Trainer", result: "From 200 to 2,400 engaged followers", rating: 5 },
    { name: "Emily Chen", role: "Success Coach", result: "$47K revenue in first month", rating: 5 },
    { name: "Michael Brown", role: "Career Strategist", result: "Booked solid for 6 months", rating: 5 },
    { name: "Priya Patel", role: "Executive Coach", result: "Doubled coaching rates", rating: 5 },
    { name: "David Thompson", role: "Business Mentor", result: "15+ inquiries per week", rating: 5 },
  ];

  const funnelSteps = [
    { step: "Social Media Post", conversion: "100 Views", icon: MessageSquare },
    { step: "Engagement", conversion: "67 Engagements", icon: TrendingUp },
    { step: "Profile Visit", conversion: "45 Visits", icon: Users },
    { step: "Inquiry/DM", conversion: "19 Inquiries", icon: MessageSquare },
    { step: "Consultation Call", conversion: "12 Calls", icon: Calendar },
    { step: "Paying Client", conversion: "5-6 Clients", icon: DollarSign },
  ];

  const scaleSteps = [
    "Start with 1 high-quality video per week",
    "Add 3 story-based flyers that showcase transformation",
    "Implement our proven engagement response system",
    "Scale to daily content with our automation tools",
    "Launch your signature program with pre-sold clients",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4 scroll-reveal">
              ✨ Free 30-Second Video Edit • No Credit Card Required
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight scroll-reveal">
              Turn Social Media <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Into Paying Clients
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto scroll-reveal">
              The complete content system that converts 28.9% of social engagement into actual coaching clients
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center scroll-reveal">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => window.open('https://calendly.com/elismet', '_blank')}>
                Book Your Free Strategy Call <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                See Sample Edits <Play className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 scroll-reveal">
            The Numbers Don't Lie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 scroll-reveal border-2">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Still Struggling With <span className="text-destructive">These?</span>
              </h2>
              <div className="space-y-4">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-destructive/5">
                    <div className="text-2xl">❌</div>
                    <p className="text-lg">{problem}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center text-8xl">
                😰
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 scroll-reveal">
            Your Complete Content Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="p-8 text-center hover:scale-105 transition-all duration-300 scroll-reveal">
                  <div className="text-6xl mb-4">{solution.visual}</div>
                  <Icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Video Edits That Convert
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get your FREE 30-second test edit • See the difference in minutes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden scroll-reveal group cursor-pointer">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                  <Play className="w-20 h-20 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Sample Edit #{item}</h3>
                  <p className="text-sm text-muted-foreground">Before & After transformation</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flyer Showcase */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Scroll-Stopping Flyer Designs
            </h2>
            <p className="text-xl text-muted-foreground">
              Designed to capture attention & drive action
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden scroll-reveal group cursor-pointer hover:scale-105 transition-all">
                <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 relative flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-primary" />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel Visualization */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Proven Engagement-to-Client Funnel
            </h2>
            <p className="text-xl text-muted-foreground">
              From 100 views to 5-6 paying clients • Every. Single. Time.
            </p>
          </div>
          <div className="space-y-6">
            {funnelSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 scroll-reveal hover:shadow-lg transition-all">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-1">{step.step}</h3>
                      <div className="text-2xl font-bold text-primary">{step.conversion}</div>
                    </div>
                    {index < funnelSteps.length - 1 && (
                      <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12 scroll-reveal">
            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-3xl font-bold mb-2">28.9% Total Conversion Rate</h3>
              <p className="text-xl opacity-90">Industry average is just 2-5%</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 scroll-reveal">
            Real Coaches. Real Results.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 scroll-reveal hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-lg font-semibold mb-4 text-primary">"{testimonial.result}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scale Guide */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How to Scale From 0 to Fully Booked
            </h2>
            <p className="text-xl text-muted-foreground">
              The exact 5-step system we use with every coach
            </p>
          </div>
          <div className="space-y-6">
            {scaleSteps.map((step, index) => (
              <Card key={index} className="p-8 scroll-reveal hover:shadow-lg transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold">{step}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center scroll-reveal">
          <div className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold mb-8">
            🎁 Limited Time: Free 30-Second Video Edit + Strategy Session
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Turn Engagement Into Revenue?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free strategy call and get your 30-second video test edit. 
            See exactly how we'll transform your social media into a client-generating machine.
          </p>
          <Button size="lg" className="text-xl px-12 py-8" onClick={() => window.open('https://calendly.com/elismet', '_blank')}>
            <Calendar className="mr-2 w-6 h-6" />
            Schedule Your Free Call Now
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 30-minute call • Instant video edit
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialEngagementsForBusinessCoach;