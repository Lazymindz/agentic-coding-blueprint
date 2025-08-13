import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Wrench, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Platform Sections */}
        <section id="platform-sections" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
                RESOURCES FOR THRIVING IN THE AI ERA
              </h2>
              <p className="text-xl font-mono uppercase max-w-3xl mx-auto">
                FROM UNDERSTANDING AI FUNDAMENTALS TO USING PRACTICAL TOOLS, 
                EVERYTHING PROFESSIONALS NEED TO EXCEL IN THE AI-DRIVEN WORLD.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
              {/* Blueprint Section */}
              <Card className="slide-card border-8 border-black bg-background shadow-brutal group">
                <CardHeader>
                  <div className="color-accent-blue border-4 border-black p-4 mb-4">
                    <BookOpen className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">BLUEPRINT</CardTitle>
                  <CardDescription className="font-mono uppercase text-xs">
                    MASTER THE FUNDAMENTALS OF AGENTIC CODING WITH OUR COMPREHENSIVE GUIDE
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm uppercase mb-6">
                    11 INTERACTIVE SLIDES COVERING EVERYTHING FROM THE NEW MINDSET TO PRODUCTION PRINCIPLES. 
                    LEARN CONTEXT ENGINEERING, ARCHITECTURAL PATTERNS, AND THE 12-FACTOR AGENT METHODOLOGY.
                  </p>
                  <Link to="/blueprint">
                    <button className="brutal-button bg-accent text-accent-foreground w-full">
                      START LEARNING
                    </button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tools Section */}
              <Card className="slide-card border-8 border-black bg-background shadow-brutal group">
                <CardHeader>
                  <div className="color-accent-red border-4 border-black p-4 mb-4">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-black uppercase tracking-tight">DAILY AI TOOLS</CardTitle>
                  <CardDescription className="font-mono uppercase text-xs">
                    PRACTICAL TOOLS TO ASSIST WITH YOUR EVERYDAY PROFESSIONAL TASKS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm uppercase mb-6">
                    TIME-SAVING AI TOOLS FOR WRITING, COMMUNICATION, AND PRODUCTIVITY. 
                    DESIGNED TO SEAMLESSLY INTEGRATE INTO YOUR DAILY WORKFLOW.
                  </p>
                  <Link to="/tools">
                    <button className="brutal-button bg-secondary text-secondary-foreground w-full">
                      TRY TOOLS
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                READY TO EXCEL IN THE AI ERA?
              </h3>
              <p className="font-mono uppercase mb-8 max-w-2xl mx-auto">
                JOIN THOUSANDS OF PROFESSIONALS WHO ARE ALREADY LEVERAGING AI TO WORK SMARTER, 
                BE MORE PRODUCTIVE, AND STAY AHEAD IN THEIR CAREERS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/blueprint">
                  <button className="brutal-button bg-accent text-accent-foreground px-8 py-4">
                    START LEARNING
                  </button>
                </Link>
                <Link to="/tools">
                  <button className="brutal-button bg-secondary text-secondary-foreground px-8 py-4">
                    TRY TOOLS
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}