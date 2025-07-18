import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SlideCard } from "@/components/SlideCard";
import { slidesData } from "@/data/slides";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        name="A Developer's Guide to Agentic Coding"
        description="Master AI-powered software development with comprehensive guides on agentic coding workflows, context engineering, and production-ready AI systems."
        url="https://aiproof.me"
        type="Course"
        teaches={[
          "agentic coding",
          "AI collaboration",
          "context engineering",
          "production AI systems",
          "AI workflows",
          "software architecture",
          "AI best practices"
        ]}
      />
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Slides Section */}
        <section id="slides-section" className="py-16 bg-card/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">11 Essential Slides</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Navigate through the complete guide to agentic coding. Click any slide to dive deeper 
                or expand the preview to get a quick overview.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {slidesData.map((slide) => (
                <SlideCard
                  key={slide.id}
                  slideNumber={slide.id}
                  title={slide.title}
                  description={slide.description}
                  content={slide.content}
                  tags={slide.tags}
                  route={slide.route}
                />
              ))}
            </div>

            {/* Quick Start Guide */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="bg-gradient-card border border-primary/20 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4 gradient-text">
                  Quick Start Guide
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-2">New to Agentic Coding?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Start with slides 1-4 to understand the fundamentals and mindset shift.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Ready for Production?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Jump to slides 7-9 for architectural patterns and the 12-factor-agents principles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
