import { ArrowDown, Terminal, Zap, Users, BookOpen, Wrench, Square, Circle, Triangle, Brain, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const scrollToPlatform = () => {
    document.getElementById('platform-sections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Bauhaus geometric background elements - repositioned to not block content */}
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-16 h-16 color-accent-red border-4 border-black rotate-12" />
        <div className="absolute top-4 right-4 w-20 h-20 color-accent-blue border-4 border-black -rotate-12" />
        <div className="absolute bottom-4 left-4 w-12 h-12 color-accent-yellow border-4 border-black rotate-45" />
        <div className="absolute bottom-4 right-4 w-14 h-14 bg-black rotate-12" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero badge */}
          <div className="inline-flex items-center border-4 border-black bg-accent px-6 py-2 text-sm font-mono mb-8 shadow-brutal">
            <Terminal className="mr-2 h-4 w-4 text-black" />
            <span className="text-black font-black uppercase">PROFESSIONAL DEVELOPMENT • AI ERA RESOURCE</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 uppercase">
            THRIVE IN THE{" "}
            <span className="color-accent-red px-4 py-2 text-white border-4 border-black shadow-brutal inline-block transform -rotate-1">AI ERA</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-mono mb-8 max-w-3xl mx-auto leading-relaxed uppercase">
            YOUR COMPLETE RESOURCE FOR MASTERING AI TOOLS AND WORKFLOWS. 
            HELPING PROFESSIONALS ADAPT, LEARN, AND EXCEL IN THE AI-DRIVEN FUTURE.
          </p>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <div className="color-accent-blue border-8 border-black p-4 shadow-brutal">
                <Brain className="h-8 w-8 text-black" />
              </div>
              <span className="font-black text-lg uppercase tracking-tight">UNDERSTAND</span>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="color-accent-yellow border-8 border-black p-4 shadow-brutal">
                <Lightbulb className="h-8 w-8 text-black" />
              </div>
              <span className="font-black text-lg uppercase tracking-tight">INNOVATE</span>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="color-accent-red border-8 border-black p-4 shadow-brutal">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <span className="font-black text-lg uppercase tracking-tight">EXCEL</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              className="brutal-button bg-secondary text-secondary-foreground"
              onClick={scrollToPlatform}
            >
              EXPLORE PLATFORM
            </button>
            <Link to="/blueprint">
              <button className="brutal-button bg-accent text-accent-foreground">
                START LEARNING
              </button>
            </Link>
          </div>

          {/* Animated scroll indicator */}
          <div className="animate-bounce">
            <button
              onClick={scrollToPlatform}
              className="color-accent-red border-4 border-black p-3 hover:shadow-brutal transition-all duration-200"
            >
              <ArrowDown className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};