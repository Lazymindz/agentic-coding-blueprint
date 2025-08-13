import React from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slidesData } from "@/data/slides";
import { ArrowRight, Clock, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const SlideCard = ({ slide, index }: { slide: any, index: number }) => (
  <Link to={`/blueprint/slide/${index + 1}`}>
    <Card className="slide-card h-full border-8 border-black bg-background shadow-brutal cursor-pointer group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="px-3 py-1 font-black uppercase text-xs border-4 border-black bg-accent text-accent-foreground">
            SLIDE {index + 1}
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
        <h3 className="font-black uppercase tracking-tight text-lg mb-3">
          {slide.title}
        </h3>
        <p className="font-mono text-xs uppercase leading-relaxed">
          {slide.description}
        </p>
      </div>
    </Card>
  </Link>
);

export default function BlueprintHome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          {/* Bauhaus geometric elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 color-accent-red border-8 border-black rotate-12" />
            <div className="absolute top-20 right-20 w-24 h-24 color-accent-blue border-8 border-black -rotate-12" />
            <div className="absolute bottom-20 left-20 w-16 h-16 color-accent-yellow border-8 border-black rotate-45" />
            <div className="absolute bottom-32 right-32 w-18 h-18 bg-black rotate-12" />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
                DEVELOPER'S GUIDE TO<br />
                <span className="color-accent-red px-4 py-2 text-white border-4 border-black shadow-brutal inline-block transform -rotate-1">
                  AGENTIC CODING
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-mono uppercase mb-8 max-w-4xl mx-auto leading-relaxed">
                MASTER AI-POWERED SOFTWARE DEVELOPMENT WITH OUR COMPREHENSIVE 
                INTERACTIVE GUIDE FROM FUNDAMENTALS TO PRODUCTION-READY PRINCIPLES.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="color-accent-blue border-4 border-black p-3">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-black uppercase text-sm">45 MIN READ</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="color-accent-yellow border-4 border-black p-3">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-black uppercase text-sm">ALL SKILL LEVELS</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="color-accent-red border-4 border-black p-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-black uppercase text-sm">PRODUCTION-READY</span>
                </div>
              </div>

              <Link to="/blueprint/slide/1">
                <button className="brutal-button bg-accent text-accent-foreground text-lg px-8 py-4">
                  START LEARNING
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Slides Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-4">
              INTERACTIVE LEARNING PATH
            </h2>
            <p className="text-center font-mono uppercase mb-12 max-w-3xl mx-auto">
              CURATED FROM THE BEST ONLINE RESOURCES ON THE TOPIC, 
              FROM FUNDAMENTAL MINDSET SHIFTS TO IMPLEMENTING PRODUCTION-READY AI SYSTEMS.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {slidesData.map((slide, index) => (
                <SlideCard key={index} slide={slide} index={index} />
              ))}
            </div>

            {/* Learning Outcomes */}
            <div className="border-8 border-black bg-background shadow-brutal p-8">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 text-center">
                WHAT YOU'LL LEARN
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-black uppercase text-lg mb-3 color-accent-blue px-2 py-1 text-black border-4 border-black">CORE CONCEPTS</h4>
                  <ul className="space-y-2 font-mono text-sm uppercase">
                    <li className="flex items-center">
                      <span className="color-accent-red w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      THE NEW MINDSET: YOU'RE THE ARCHITECT
                    </li>
                    <li className="flex items-center">
                      <span className="color-accent-red w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      CONTEXT ENGINEERING FUNDAMENTALS
                    </li>
                    <li className="flex items-center">
                      <span className="color-accent-red w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      THE ITERATIVE LOOP WORKFLOW
                    </li>
                    <li className="flex items-center">
                      <span className="color-accent-red w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      COMMON PITFALLS AND HOW TO AVOID THEM
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-black uppercase text-lg mb-3 color-accent-yellow px-2 py-1 text-black border-4 border-black">ADVANCED TOPICS</h4>
                  <ul className="space-y-2 font-mono text-sm uppercase">
                    <li className="flex items-center">
                      <span className="color-accent-blue w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      ARCHITECTURAL PATTERNS FOR AI SYSTEMS
                    </li>
                    <li className="flex items-center">
                      <span className="color-accent-blue w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      12-FACTOR AGENT PRINCIPLES
                    </li>
                    <li className="flex items-center">
                      <span className="color-accent-blue w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      PRODUCTION DEPLOYMENT STRATEGIES
                    </li>
                    <li className="flex items-center">
                      <span className="color-accent-blue w-2 h-2 border-2 border-black mr-3 flex-shrink-0"></span>
                      BEST PRACTICES AND GOLDEN RULES
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}