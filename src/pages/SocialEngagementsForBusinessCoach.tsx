import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, TrendingUp, Users, DollarSign, Video, Image as ImageIcon, MessageSquare, Target, Zap, CheckCircle, Play, BarChart3, Calendar, Mail, Heart, Share2, Bookmark, ThumbsUp, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import flyerImage1 from '@/assets/coaching-flyer-1.jpg';
import flyerImage2 from '@/assets/coaching-flyer-2.jpg';
import flyerImage3 from '@/assets/coaching-flyer-3.jpg';
import flyerImage4 from '@/assets/coaching-flyer-4.jpg';
import socialPost1 from '@/assets/social-post-1.jpg';
import socialPost2 from '@/assets/social-post-2.jpg';

const SocialEngagementsForBusinessCoach = () => {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "Social Media to Clients System for Business Coaches | 28.9% Conversion Rate";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transform social media engagement into paying coaching clients with our proven 28.9% conversion system. Professional video edits, high-converting flyers, and engagement funnels for business coaches. Free 30-second video test edit included.');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Turn Social Media Into Paying Coaching Clients | 28.9% Conversion');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Complete content system that converts social engagement into coaching clients. Professional video edits, flyers, and proven funnel for business coaches.');
    }

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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = "Elismet LTD - Innovative Software Solutions";
    };
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
    { name: "Alfred Coaching", role: "Business Coach", result: "3x client base in 90 days", rating: 5 },
    { name: "Peak Performance Institute", role: "Leadership Training", result: "From 200 to 2,400 engaged followers", rating: 5 },
    { name: "Success Dynamics Coaching", role: "Success Coach", result: "$47K revenue in first month", rating: 5 },
    { name: "Career Elevation Co", role: "Career Strategy", result: "Booked solid for 6 months", rating: 5 },
    { name: "Executive Edge Coaching", role: "Executive Coach", result: "Doubled coaching rates", rating: 5 },
    { name: "Business Breakthrough Mentors", role: "Business Mentorship", result: "15+ inquiries per week", rating: 5 },
  ];

  const socialProgressionSteps = [
    {
      stage: "Week 1-2: Foundation",
      posts: 3,
      avgLikes: 45,
      avgComments: 8,
      profileVisits: 120,
      dms: 5,
      content: "🎯 5 Common Mistakes Holding Your Business Back"
    },
    {
      stage: "Month 1: Consistency",
      posts: 12,
      avgLikes: 156,
      avgComments: 28,
      profileVisits: 450,
      dms: 22,
      content: "💡 The 3-Step System That Doubled My Revenue"
    },
    {
      stage: "Month 2: Growth (47% ↑)",
      posts: 15,
      avgLikes: 389,
      avgComments: 67,
      profileVisits: 1240,
      dms: 89,
      content: "🚀 Client Transformation: From Stuck to 6-Figures"
    },
    {
      stage: "Month 6: Authority",
      posts: 18,
      avgLikes: 1247,
      avgComments: 234,
      profileVisits: 4580,
      dms: 340,
      content: "👑 My Signature Framework That Changed Everything"
    },
  ];

  const hotLeadIndicators = [
    { icon: Heart, label: "Saves Your Posts", heat: "🔥🔥🔥", meaning: "High Intent" },
    { icon: MessageSquare, label: "Comments Frequently", heat: "🔥🔥🔥", meaning: "Engaged" },
    { icon: Share2, label: "Shares Content", heat: "🔥🔥", meaning: "Advocate" },
    { icon: Mail, label: "Responds to DMs", heat: "🔥🔥🔥🔥", meaning: "Ready to Buy" },
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
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => window.open('https://calendly.com/elismet-support/discussion-of-your-business-problems', '_blank')}>
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
            <Card className="overflow-hidden scroll-reveal group">
              <div className="aspect-[9/16] bg-black relative">
                <iframe
                  src="https://www.instagram.com/p/DO3t25sDu7N/embed"
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Instagram Reel Edit</h3>
                <p className="text-sm text-muted-foreground">Professional transformation</p>
              </div>
            </Card>
            
            <Card className="overflow-hidden scroll-reveal group">
              <div className="aspect-[9/16] bg-black relative">
                <iframe
                  src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/h64s1gdpyh8vkapvphi2"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Coaching Promo Video</h3>
                <p className="text-sm text-muted-foreground">High-quality commercial edit</p>
              </div>
            </Card>

            <Card className="overflow-hidden scroll-reveal group">
              <div className="aspect-[9/16] bg-black relative">
                <iframe
                  src="https://www.canva.com/design/DAGuG-wgoZI/ZdF6WYLjax7zfVlsS4OqYg/watch?embed"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Business Growth Presentation</h3>
                <p className="text-sm text-muted-foreground">Engaging visual storytelling</p>
              </div>
            </Card>
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
            {[
              { img: flyerImage1, title: "Transform Your Business" },
              { img: flyerImage2, title: "Scale Your Revenue" },
              { img: flyerImage3, title: "Unlock Your Potential" },
              { img: flyerImage4, title: "Break Through Limits" }
            ].map((flyer, index) => (
              <Card key={index} className="overflow-hidden scroll-reveal group cursor-pointer hover:scale-105 transition-all">
                <div className="aspect-square relative">
                  <img 
                    src={flyer.img} 
                    alt={flyer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    NEW
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white font-bold">{flyer.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Progression */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Social Media Growth Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              From zero to fully booked • Real metrics, real results
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {socialProgressionSteps.map((step, index) => (
              <Card key={index} className="p-8 scroll-reveal hover:shadow-2xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10">
                  <div className="text-sm font-bold text-primary mb-4">{step.stage}</div>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Posts</span>
                      <span className="font-bold">{step.posts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Likes</span>
                      </div>
                      <span className="font-bold">{step.avgLikes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Comments</span>
                      </div>
                      <span className="font-bold">{step.avgComments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Visits</span>
                      </div>
                      <span className="font-bold">{step.profileVisits}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Send className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">DMs</span>
                      </div>
                      <span className="font-bold text-primary">{step.dms}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-semibold">{step.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme Hot Leads Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <div className="inline-block px-6 py-2 bg-orange-500 text-white rounded-full font-bold mb-6">
              🔥 EXTREME HOT LEADS STAGE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How to Identify Your Hottest Prospects
            </h2>
            <p className="text-xl text-muted-foreground">
              These engagement signals mean they're ready to buy • The other side is your teaching capability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {hotLeadIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <Card key={index} className="p-6 text-center scroll-reveal hover:scale-105 transition-all">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-lg mb-2">{indicator.label}</h3>
                  <div className="text-2xl mb-2">{indicator.heat}</div>
                  <div className="text-sm font-semibold text-orange-600">{indicator.meaning}</div>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 md:p-12 scroll-reveal bg-gradient-to-br from-background to-muted/30">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">The Two-Sided Success Formula</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Our Marketing System</h4>
                      <p className="text-muted-foreground">We bring extreme hot leads to your door • Ready to buy • Pre-qualified • Eager to start</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Your Coaching Excellence</h4>
                      <p className="text-muted-foreground">Your teaching, coaching capability & performance closes the deal • Deliver transformation • Build authority</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h4 className="text-2xl font-bold mb-4">Perfect Match</h4>
                <p className="text-lg">Our leads + Your expertise = Unstoppable growth</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Messaging & Email Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multi-Channel Engagement System
            </h2>
            <p className="text-xl text-muted-foreground">
              Social → DMs → Email → Call • Every touchpoint optimized
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 scroll-reveal">
              <MessageSquare className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-6">DM Conversation Flow</h3>
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg rounded-tl-none">
                  <p className="text-sm font-semibold mb-1">Prospect:</p>
                  <p>"I loved your post about scaling revenue! Can you tell me more?"</p>
                </div>
                <div className="bg-muted p-4 rounded-lg rounded-tr-none ml-8">
                  <p className="text-sm font-semibold mb-1">You:</p>
                  <p>"Thanks! I'd love to share my framework. What specific challenge are you facing?"</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg rounded-tl-none">
                  <p className="text-sm font-semibold mb-1">Prospect:</p>
                  <p>"I'm stuck at $10K/month and can't break through..."</p>
                </div>
                <div className="bg-muted p-4 rounded-lg rounded-tr-none ml-8">
                  <p className="text-sm font-semibold mb-1">You:</p>
                  <p>"Perfect! Let's hop on a quick 15-min call. Here's my calendar: [link]"</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-500/10 rounded-lg border-2 border-green-500">
                <p className="font-bold text-green-700 dark:text-green-400">✅ BOOKED • Extreme Hot Lead Secured</p>
              </div>
            </Card>

            <Card className="p-8 scroll-reveal">
              <Mail className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-6">Email Nurture Sequence</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-bold mb-1">Day 1: Welcome & Value</p>
                  <p className="text-sm text-muted-foreground">"Here's the framework I promised..."</p>
                </div>
                <div className="border-l-4 border-primary/70 pl-4 py-2">
                  <p className="font-bold mb-1">Day 3: Case Study</p>
                  <p className="text-sm text-muted-foreground">"How Sarah went from $5K to $50K/mo..."</p>
                </div>
                <div className="border-l-4 border-primary/50 pl-4 py-2">
                  <p className="font-bold mb-1">Day 5: Soft CTA</p>
                  <p className="text-sm text-muted-foreground">"Want to see how this works for you?"</p>
                </div>
                <div className="border-l-4 border-primary/30 pl-4 py-2">
                  <p className="font-bold mb-1">Day 7: Direct Offer</p>
                  <p className="text-sm text-muted-foreground">"Limited spots for 1-on-1 coaching..."</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">43%</div>
                <p className="text-sm text-muted-foreground">Email-to-call booking rate</p>
              </div>
            </Card>
          </div>

          <Card className="mt-8 p-8 scroll-reveal bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">What Do You Teach? Tell Me More!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                These are the questions your hot leads are asking. Our system makes them eager to learn from YOU specifically.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">💬</div>
                  <p className="text-sm font-semibold">67% Reply Rate</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">📞</div>
                  <p className="text-sm font-semibold">34% Book Calls</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">💰</div>
                  <p className="text-sm font-semibold">43% Convert</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-sm font-semibold">28.9% Total ROI</p>
                </div>
              </div>
            </div>
          </Card>
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
          <Button size="lg" className="text-xl px-12 py-8" onClick={() => window.open('https://calendly.com/elismet-support/discussion-of-your-business-problems', '_blank')}>
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