import { ArrowDown, Terminal, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToSlides = () => {
    document.getElementById('slides-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero badge */}
          <div className="inline-flex items-center rounded-full border border-border/40 bg-card/50 px-3 py-1 text-sm font-mono mb-8">
            <Terminal className="mr-2 h-3 w-3 text-primary" />
            <span className="text-muted-foreground">Software 3.0 </span>
            <span className="mx-2 text-border">•</span>
            <span className="gradient-text font-semibold">AI-Powered Development</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            A Developer's Guide to{" "}
            <span className="gradient-text">Agentic Coding</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Master the art of collaborating with AI agents to build software. 
            Learn context engineering, architectural patterns, and production principles.
          </p>

          {/* Key features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Agentic Coding</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Context Engineering</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                <Terminal className="h-4 w-4 text-accent" />
              </div>
              <span className="text-muted-foreground">12-Factor-Agents</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="glow-on-hover font-semibold"
              onClick={scrollToSlides}
            >
              Start Learning
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const footer = document.querySelector("footer");
                if (footer) {
                  footer.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View References
            </Button>
          </div>

          {/* Animated scroll indicator */}
          <div className="animate-bounce">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToSlides}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};